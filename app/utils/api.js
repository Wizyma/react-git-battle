import axios from 'axios';
import path from 'path';

const config = require('../../config.js');

// GET THIS INFO FROM THE GITHUB API IF YOU GETTING SOME ERRORS
let id = config.id;
let secret = config.secret;
let params = `?client_id=${id}&client_secret=${secret}`;

function getProfile(username){
  return axios.get(`https://api.github.com/users/${username}`)
    .then((user) => {
      return user.data;
    });
}

function getRepos(username){
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
}

function getStarCount(repos){
  return repos.data.reduce((count, repo) => { return count + repo.stargazers_count}, 0);
}

function calculateScore(profile, repos){
  let followers = profile.followers;
  let totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError(error){
  console.warn(error);
  return null;
}

function getUserData(player){
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data) => {
    let profile = data[0];
    let repos = data[1];
    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

function sortPLayer(players){
  return players.sort((a, b) => {
    return b.score - a.score;
  });
}

module.exports = {
  battle: (players) => {
    return axios.all(players.map(getUserData))
      .then(sortPLayer)
      .catch(handleError);
  },
  fetchPopularRepos: (language) => {
    let encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&types=Repositories`)
    return axios.get(encodedURI)
      .then((response) => {
        return response.data.items;
      });
  }
}
