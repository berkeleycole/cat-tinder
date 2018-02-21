import React, { Component } from 'react';

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            apiUrl: "http://localhost:3000/api",
            id: this.props.location.pathname,
        }
    console.log(this.state)
    }

    componentWillMount(){
        fetch(`${this.state.apiUrl}/${this.state.id}`)
        .then((rawResponse) =>{
          return rawResponse.json()
        })
        .then((jsonresp)=>{
            console.log(jsonresp.cat)
            this.setState(
                {
                    name: jsonresp[0].name,
                    age: jsonresp[0].age
                }
            )
        })
    }

    render() {
        return (
            <div>
                <p>Name: {this.state.name}</p>
                <p>Age: {this.state.age}</p>
            </div>
        )
    }
}

export default Profile;
