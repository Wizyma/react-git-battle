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
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ username: value })
  }

  handleSubmit = (event) =>{
    event.preventDefault(); // to not submit to a server

    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render() {
    const { username } = this.state;
    const { label } = this.props;
    return(
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {label}
        </label>
        <input
          id='username'
          placeholder='github username'
          autoComplete='off'
          type='text'
          value={username}
          onChange={this.handleChange} />

          <button
            className='button'
            type='submit'
            style={username ? {cursor: 'pointer'} : null}
            disabled={!username}>
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
  }

  handleSubmit = (id, username) => {
    this.setState(() => ({
      [`${id}Name`]: username,
      [`${id}Image`]: `https://github.com/${username}.png?size=200`
    }))
  }

  handleReset = (id) => {
    let newState = {};
    this.setState(() => ({
      [`${id}Name`]: '',
      [`${id}Image`]: null
    }))
  }

  render(){
    const { match } = this.props;
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage }  = this.state;

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
                onClick={() => this.handleReset('playerOne')}>
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
                onClick={() => this.handleReset('playerTwo')}>
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
