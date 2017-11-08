import path from 'path';

const config = require('../../config.js');

// GET THIS INFO FROM THE GITHUB API IF YOU GETTING SOME ERRORS
const id = config.id;
const secret = config.secret;
const params = `?client_id=${id}&client_secret=${secret}`;

async function getProfile(username){
  const response = await fetch(`https://api.github.com/users/${username}`)
  return response.json();
}

async function getRepos(username){
  const response = await fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
  return response.json();
}

function getStarCount(repos){
  return repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0);
}

function calculateScore({ followers }, repos){
  return (followers * 3) + getStarCount(repos);
}

function handleError(error){
  console.warn(error);
  return null;
}

async function getUserData(player){
  const [profile, repos ] = await Promise.all([
    getProfile(player),
    getRepos(player)])

  return {
    profile,
    score: calculateScore(profile, repos)
  }
}

function sortPLayer(players){
  return players.sort((a, b) => b.score - a.score);
}

module.exports = {
  async battle (players) {
    const results = await Promise.all(players.map(getUserData))
      .catch(handleError);
    return results === null 
    ? results
    : sortPLayer(results);
  },
  async fetchPopularRepos (language) {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&types=Repositories`)
    const response = await fetch(encodedURI)
      .catch(handleError);
    const repos = await response.json();
    return repos.items;
  }
}
