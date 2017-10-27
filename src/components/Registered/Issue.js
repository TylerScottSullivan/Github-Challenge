import React, { Component } from 'react';

class Issue extends Component {

  render() {
    return (
    	<div className='list-item'> 
    		<input className='reorder-input' data-tag={this.props.index} value={this.props.issue.priorityIndex} onChange={this.props.onChangePriority}/>
    		<h4 className='issue-title'> {this.props.issue.title} </h4> 
    	</div>
    );
  }
}

export default Issue;