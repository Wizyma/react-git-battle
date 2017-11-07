import React from 'react';
const Link = require('react-router-dom').Link;

class Home extends React.Component {
  render(){
    return(
      <div className='home-container'>
        <h1>
          Launch the Battle
        </h1>
        <span>Compare repos to see wich one is the most followed.</span>
        <Link className='button' to='/battle'>
          Battle
        </Link>
      </div>
    )
  }
}

export default Home;
