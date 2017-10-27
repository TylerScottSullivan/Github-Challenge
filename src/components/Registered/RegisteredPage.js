import React, { Component } from 'react';

import ReposContainer from './RepoContainer';
import IssuesContainer from './IssuesContainer';


class RegisteredPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedRepo: '',
      selectedIssues: [],
      loading: false
    }

    this.onSelectRepo = this.onSelectRepo.bind(this);
    this.fetchIssues = this.fetchIssues.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onReorderList = this.onReorderList.bind(this);
  }

  onSelectRepo(repo) {
  	let selectedRepo = repo;

  	this.setState({
  		selectedRepo: selectedRepo
  	})

  	this.fetchIssues(selectedRepo)
  }

  fetchIssues(selectedRepo) {
  	let selectedIssues = JSON.parse(window.sessionStorage.getItem(selectedRepo));

  	if (selectedIssues) {
  		this.setState({
  			selectedIssues: selectedIssues
  		})
  	} else {
  		this.setState({
  			loading: true
  		})
  		let token = window.sessionStorage.getItem('token');
  		fetch('https://api.github.com/repos/' + selectedRepo + '/issues?access_token=' + token)
  		.then((response) => response.json())
      .then((data) => {
      	for (var i = 0; i < data.length; i++) {
      		data[i].priorityIndex = '';
      	}
        this.setState({
          selectedIssues: data,
          loading: false
        })
      	window.sessionStorage.setItem(selectedRepo, JSON.stringify(data))
      }) 
  	}
  }

  onChangePriority(e) {
  	let newPriority = e.target.value;
  	let index = e.target.dataset.tag;

  	let state = {...this.state}
  	state.selectedIssues[index].priorityIndex = newPriority;
  	this.setState({
  		selectedIssues: state.selectedIssues
  	})

  }

  onReorderList(e) {
  	e.preventDefault();
  	console.log('clicking')
  	let state = {...this.state}
  	let issues = state.selectedIssues;
  	let length = issues.length;
  	let newIssuesOrder = [];
  	for (var i = 0; i < length; i++) {
  		newIssuesOrder[i] = null;
  	}

  	let hash = {};
  	for (var i = 0; i < length; i++) {
  		let newIssueNumber = (issues[i].priorityIndex === '') ? null : Number(issues[i].priorityIndex);
  		if (newIssueNumber && newIssueNumber <= issues.length && !hash[newIssueNumber] ) {
  			hash[newIssueNumber] = true;
  			newIssuesOrder[Number(issues[i].priorityIndex)-1] = issues[i];
  			newIssuesOrder[Number(issues[i].priorityIndex) -1].priorityIndex = ''
  			issues[i] = null;
  		}
  	}

  	let count = 0;
  	for (var i = 0; i < length; i++) {
  		while (newIssuesOrder[count]) {
  			count++
  		}

  		let item = issues.shift();
  		if (item) {
  			newIssuesOrder[count] = item;
  			newIssuesOrder[count].priorityIndex = '';
  		}
  	}


    window.sessionStorage.setItem(this.state.selectedRepo, JSON.stringify(newIssuesOrder))
  	this.setState({
  		selectedIssues: newIssuesOrder
  	})

  }

  render() {
    return (
    	<div className="container-fluid">
	    	<div className='row'>
	    		<ReposContainer 
	    			classNames={this.state.selectedRepo ? 'col-md-6' : ''} 
	    			repos={this.props.repos} 
	    			onSelectRepo={this.onSelectRepo} 
	    			selectedRepo={this.state.selectedRepo}
    			/>
	    		{this.state.selectedRepo ? 
    				<IssuesContainer 
    					issues={this.state.selectedIssues} 
    					loading={this.state.loading} 
    					onChangePriority={this.onChangePriority} 
    					onReorderList={this.onReorderList}
  					/> 
					: null }
	    	</div>
    	</div>
    );
  }
}

export default RegisteredPage;