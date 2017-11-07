import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import api from '../utils/api';
const Link = require('react-router-dom').Link;
import PLayerPreview from './PLayerPreview';
import Loading from './Loading';

function Profile(props){
  let info = props.info;
  return(
    <PLayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className='space-list-items'>
        {info.name && <li>Name: {info.name}</li>}
        {info.location && <li>Location: {info.location}</li>}
        {info.company && <li>Company: {info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PLayerPreview>
  )
}

function Player(props){
  return(
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
      <Profile info={props.profile}/>
    </div>
  );
}

Player.PropTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class Results extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount(){
    let players = queryString.parse(this.props.location.search);
    // Instead of the variable self you can use the function bind()
    // just a question of preference ^^
    let self = this;
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then((results) => {
      if(results === null){
        self.setState(() => {
          return{
            error: 'Looks like there was an error. Check that both users exists on GitHub',
            loading: false
          }
        });
      }

      self.setState(() => {
        return{
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      });
    });
  }

  render(){
    let error = this.state.error;
    let winner = this.state.winner
    let loser = this.state.loser;
    let loading = this.state.loading;
    let styles = {
      content: {
        backgroundColor: '#0a0a0a',
        color: '#e6e6e6',
        width: '150px',
        padding: '7px 0px',
        margin: '0 auto',
        borderRadius: '3px'
      }
    }

    if(loading){
      return (
        <Loading />
      );
    }

    if(error){
      return (
        <div>
          <div className='row'>
            {error}
          </div>
          <hr style={{borderColor: 'transparent'}} />
          <Link className='reset' to='/battle'>Reset</Link>
        </div>
      );
    }
    return(
      <div>
        <div className='row'>
          <Player
            label='Winner'
            score={winner.score}
            profile={winner.profile}
          />

          <Player
            label='Loser'
            score={loser.score}
            profile={loser.profile}
          />
        </div>
        <Link style={styles.content} className='reset' to='/battle'>New Battle</Link>
      </div>
    )
  }
}

export default Results;
