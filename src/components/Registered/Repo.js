import React, { Component } from 'react';

class Repo extends Component {

  render() {
    return (
    	<div className={'list-item repo-item' + (this.props.repo.full_name === this.props.selectedRepo ? ' selected' : '')} onClick={()=> this.props.onSelectRepo(this.props.repo.full_name)}> 
    		<h3> {this.props.repo.name} </h3> 
    		<span>{this.props.repo.full_name}</span>
    	</div>
    )
  }
}

export default Repo