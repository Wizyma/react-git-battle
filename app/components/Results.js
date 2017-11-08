import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import api from '../utils/api';
const Link = require('react-router-dom').Link;
import PLayerPreview from './PLayerPreview';
import Loading from './Loading';

function Profile({ info }){
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

function Player({ label, score, profile }){
  return(
    <div>
      <h1 className='header'>{label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {score}</h3>
      <Profile info={profile}/>
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

  async componentDidMount(){
    const {playerOneName, playerTwoName } = queryString.parse(this.props.location.search);;
    const players = await api.battle([
      playerOneName,
      playerTwoName
    ]);

    !players ? this.setState({ error: 'Looks like there was an error. Check that both users exists on GitHub', loading: false }) :
    this.setState({ error: null, winner: players[0], loser: players[1], loading: false });

  }

  render(){
    const { error, winner, loser, loading } = this.state;
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

    return(
      <div>
        {loading && <Loading />}
        {error &&  <div>
          <div className='row'>
            {error}
          </div>
          <hr style={{borderColor: 'transparent'}} />
          <Link className='reset' to='/battle'>Reset</Link>
        </div>}
        {!loading && !error && <div>
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
      </div>}
      </div>
    )
  }
}

export default Results;
