import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import IntroPage from './components/Intro/IntroPage';
import RegisteredPage from './components/Registered/RegisteredPage'
import Loader from './components/Loader/Loader'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: '',
      repos: [],
      registered: false,
      loading: true
    }

    this.onChangeToken = this.onChangeToken.bind(this)
    this.onSubmitToken = this.onSubmitToken.bind(this);
    this.fetchRepos = this.fetchRepos.bind(this);
  }

  componentWillMount() {
    // window.sessionStorage.clear();
    let token = window.sessionStorage.getItem("token");

    if (token) {
      this.fetchRepos(token);
    } else {
      this.setState({
        loading: false
      })
    }
  }

  onChangeToken(e) {
    var newToken = e.target.value;
    this.setState({
      token: newToken
    })
  }

  onSubmitToken(e) {
    e.preventDefault();

    this.setState({
      loading: true
    })

    let token = this.state.token;
    this.fetchRepos(token)
    window.sessionStorage.setItem('token', token)
  }

  fetchRepos(token) {
    let repos = JSON.parse(window.sessionStorage.getItem('repos'));

    if (repos){
      this.setState({
        repos: repos,
        registered: true,
        loading: false
      })
    } else {
      fetch('https://api.github.com/user/repos?access_token=' + token)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          repos: data,
          registered: true,
          loading: false
        })
        window.sessionStorage.setItem('repos', JSON.stringify(data))
      }) 
    }
  }


  render() {

    if (this.state.loading) {
      return <Loader/>
    } else {

      let introPage = <IntroPage onChangeToken={this.onChangeToken} onSubmitToken={this.onSubmitToken} token={this.token}/>
      let registeredPage = <RegisteredPage repos={this.state.repos}/> 

      let page  = this.state.registered ? registeredPage : introPage;
      return (
        <div className="App">
          {page}
        </div>
      );
    }
  }
}

export default App;
