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
    const { text, speed } = this.props;
    const stopper = `${text}...`;

    this.interval = window.setInterval(() => {
      this.state.text === stopper ? this.setState({text}) : this.setState((prevState) => ({text: `${prevState.text}.`}))
    }, speed);
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
