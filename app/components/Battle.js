import React from 'react';
import PropTypes from 'prop-types';
const Link = require('react-router-dom').Link;
import PLayerPreview from './PLayerPreview';

class PlayerInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    let value = event.target.value;

    this.setState(() => {
      return {
        username: value
      }
    })
  }

  handleSubmit(event){
    event.preventDefault(); //to not submit to a server

    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render(){
    return(
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          autoComplete='off'
          type='text'
          value={this.state.username}
          onChange={this.handleChange} />

          <button
            className='button'
            type='submit'
            style={this.state.username ? {cursor: 'pointer'} : null}
            disabled={!this.state.username}>
            Submit
          </button>
      </form>
    )
  }
}

PlayerInput.PropTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username){
    let newState = {};
    this.setState(() => {
      newState[`${id}Name`] = username;
      newState[`${id}Image`] = `https://github.com/${username}.png?size=200`;
      return newState;
    })
  }

  handleReset(id){
    let newState = {};
    this.setState(() => {
      newState[`${id}Name`] = '';
      newState[`${id}Image`] = null;
      return newState;
    })
  }

  render(){
    let match = this.props.match;
    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;
    let playerOneImage = this.state.playerOneImage;
    let playerTwoImage = this.state.playerTwoImage;

    return(
      <div>
        <div className='row'>
          {!playerOneName &&
            <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit} />}

          {playerOneImage !== null &&
            <PLayerPreview
              avatar={playerOneImage}
              username={playerOneName}
              onReset={this.handleReset}
              id='playerOne'
            >
              <button
                className='reset'
                onClick={this.handleReset.bind(null, 'playerOne')}>
                Reset
              </button>
            </PLayerPreview>}

          {!playerTwoName &&
            <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit} />}

          {playerTwoImage !== null &&
            <PLayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
              id='playerTwo'
            >
              <button
                className='reset'
                onClick={this.handleReset.bind(null, 'playerTwo')}>
                Reset
              </button>
            </PLayerPreview>}
        </div>
        {playerOneImage && playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}>
            Battle
          </Link>}
      </div>
    )
  }
}

export default Battle;
