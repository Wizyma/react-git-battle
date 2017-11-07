import React from 'react';
import PropTypes from 'prop-types';

function PLayerPreview(props){
  return(
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={`Avatar for ${props.username}`} />
        <h2 className='username'>
          @{props.username}
        </h2>
        {props.children}
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
