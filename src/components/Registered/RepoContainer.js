import React, { Component } from 'react';
import Repo from './Repo';

class RepoContainer extends Component {

  render() {
    return (
    	<div className={'list-container ' + this.props.classNames}> 
    		<h2> Repos </h2>
    		{this.props.repos.map((repo, index) => <Repo key={repo.id} repo={repo} selectedRepo={this.props.selectedRepo} onSelectRepo={this.props.onSelectRepo}/>)}
    	</div>
    );
  }
}

export default RepoContainer;