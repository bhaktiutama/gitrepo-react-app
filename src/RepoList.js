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
                    username:
                    <input type="text" name="name" onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                </form>
                <ul>
                    { this.state.repos.map(repo => <li>{repo.name}</li>)}
                </ul>
            </div>
        )
    } 
}