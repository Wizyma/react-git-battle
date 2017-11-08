import React from 'react';
import PropTypes from 'prop-types';

function PLayerPreview({ avatar, username, children }){
  return(
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={avatar}
          alt={`Avatar for ${username}`} />
        <h2 className='username'>
          @{username}
        </h2>
        {children}
      </div>
    </div>
  )
}

PLayerPreview.PropTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onReset: PropTypes.func
}


module.exports = PLayerPreview;
