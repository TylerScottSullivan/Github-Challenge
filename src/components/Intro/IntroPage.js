import React, { Component } from 'react';

class IntroPage extends Component {

  render() {
    return (
      <div>
        <h1> Welcome! Please input your Github API access token.</h1>
        <input onChange={this.props.onChangeToken} value={this.props.token}/>
        <button onClick={this.props.onSubmitToken}> Submit </button>
      </div>
    );
  }
}

export default IntroPage;
