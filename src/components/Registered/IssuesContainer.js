import React, { Component } from 'react';

import Issue from './Issue';
import Loader from '../Loader/Loader'

class IssuesContainer extends Component {

  render() {
  	if (this.props.loading) {
  		return <Loader/>
  	} else {
	  	let isEmpty = this.props.issues.length===0;
	  	let issuesList;

	  	if (isEmpty) {
	  		issuesList = <div> None. </div>
	  	} else {
	  		issuesList = this.props.issues.map((issue, index) => <Issue key={issue.id} index={index} issue={issue} onChangePriority={this.props.onChangePriority}/>)
	  	}
	    return (
	    	<div className='col-md-6 list-container'> 
	    		<div> 
		    		<h2 className='issues-header'> Issues </h2>
		    		<button className='reorder-btn' onClick={this.props.onReorderList}> Reorder</button>
	    		</div> 
	    		{issuesList}
	    	</div>
	    );
  	}
  }
}

export default IssuesContainer;