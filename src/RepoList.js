import React from 'react'

import axios from 'axios'

export default class RepoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            repos: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    
    }

    handleChange = event => {
        this.setState({ username: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault();

        const username = this.state.username

        axios.get("https://api.github.com/users/"+username+"/repos").then(res => {
            const repos = res.data
            this.setState({ repos })
        }) 
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" name="name" onChange={this.handleChange} placeholder="Username"/>
                </label>
                <input type="submit" value="Submit" />
                <p></p>
                </form>
                { this.state.repos.map(repo => 
                    <p>
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">{repo.name}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{repo.created_at}</h6>
                                <p class="card-text">{repo.description}</p>
                                <a href={repo.html_url} class="card-link">View On Github</a>
                                <a href={repo.git_url} class="card-link">Git Url</a>                                
                            </div>
                        </div>
                    </p>
                )}
            </div>
        )
    } 
}