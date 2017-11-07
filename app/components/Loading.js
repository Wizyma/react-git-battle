import React from 'react';
import PropTypes from 'prop-types';

let styles = {
  content:{
    textAlign: 'center',
    fontSize: '35px'
  }
}

class Loading extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      text: props.text
    };
  }

  componentDidMount(){
    let self = this;
    let stopper = `${this.props.text}...`;

    this.interval = window.setInterval(() => {
      if(this.state.text === stopper){
        self.setState(() => {
          text: this.props.text
        });
      }else{
        self.setState((prevState) => {
          return {
            text: `${prevState.text}.`
          }
        });
      }
    }, this.props.speed);
  }

  componentWillUnmount(){
    window.clearInterval(this.interval);
  }

  render(){
    return(
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}

Loading.PropTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}

export default Loading;
