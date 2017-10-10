import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from 'react-router-dom'
import {
  Col,
  Grid,
  PageHeader,
  Row
} from 'react-bootstrap'
import {connect} from 'react-redux'

import Cats from './pages/Cats'
import Profile from './pages/Profile'
import NewCat from './pages/NewCat'
import Login from './pages/Login'
import Signup from './pages/Signup'

import { checkLogin } from './actions/UserActions'

const mapComponentToProps = (store) =>{
  return {
    user: store.user.currentUser,
    userError: store.user.error
  }
}

export default connect(mapComponentToProps)(
  class App extends Component {
      constructor(props){
          super(props)

          this.state = {
            apiUrl: "http://localhost:3000",
            cats: [],
            newCatSuccess: false,
            user: null,
            newUserSuccess: false,
            loginUserSuccess: false,
            errors: null
          }
      }


      handleUserLogin(params){
        fetch(`${this.state.apiUrl}/login`,
            {
                body: JSON.stringify(params),
                headers: {
                  'Content-Type': 'application/json'
                },
                method: "POST"
            }
        )
        .then((rawResponse)=>{
          return rawResponse.json()
        })
        .then((parsedResponse) =>{
            if(parsedResponse.errors){
                this.setState({errors: parsedResponse.errors})
            }else{
              localStorage.setItem('userEmail', parsedResponse.user.email);
                this.setState({
                  user: parsedResponse.user,
                  errors: null,
                  loginUserSuccess: true
                })
            }
        })
      }

      handleNewUser(params){
        fetch(`${this.state.apiUrl}/signup`,
            {
                body: JSON.stringify(params),
                headers: {
                  'Content-Type': 'application/json'
                },
                method: "POST"
            }
        )
        .then((rawResponse)=>{
          return rawResponse.json()
        })
        .then((parsedResponse) =>{
            if(parsedResponse.errors){
                this.setState({errors: parsedResponse.errors})
            }else{
                this.setState({
                  user: parsedResponse.user,
                  errors: null,
                  newUserSuccess: true
                })
            }
        })
      }

      handleNewcat(params){
          fetch(`${this.state.apiUrl}/cats`,
              {
                  body: JSON.stringify(params),
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  method: "POST"
              }
          )
          .then((rawResponse)=>{
            return rawResponse.json()
          })
          .then((parsedResponse) =>{
              if(parsedResponse.errors){
                  this.setState({errors: parsedResponse.errors})
              }else{
                  const cats = Object.assign([], this.state.cats)
                  cats.push(parsedResponse.cat)
                  this.setState({
                    cats: cats,
                    errors: null,
                    newCatSuccess: true
                  })
              }
          })
      }

      componentWillMount(){
        this.props.dispatch(checkLogin(this.state.apiUrl))
          fetch(`${this.state.apiUrl}/cats`)
          .then((rawResponse) =>{
            return rawResponse.json()
          })
          .then((parsedResponse)=>{
            this.setState({cats: parsedResponse.cats})
          })
      }

      render() {
        if(this.state.user){
          var userName = this.state.user.name
        } else {
          var userName = ""
        }
      return (
        <Router>
          <div>
            <div>{userName}</div>
            <Route exact path="/login" render={props => (
              <Grid>
                <Login onSubmit={this.handleUserLogin.bind(this)} />
                {this.state.loginUserSuccess &&
                  <Redirect to="/cats" />
                }
              </Grid>
            )} />
              <Route exact path="/signup" render={props => (
                <Grid>
                  <Signup onSubmit={this.handleNewUser.bind(this)} />
                  {this.state.newUserSuccess &&
                    <Redirect to="/cats/new" />
                  }
                </Grid>
              )} />

              <Route exact path="/cats/new" render={props => (
              <Grid>
                <NewCat
                  onSubmit={this.handleNewcat.bind(this)}
                  errors={this.state.errors && this.state.errors.validations}
                />
                {this.state.newCatSuccess &&
                  <Redirect to="/" />
                }
                {!this.state.user && <Redirect to="/login" />}
              </Grid>
              )} />

              <Route exact path="/" render={props => (<Cats cats={this.state.cats} />
                  // {!this.state.newCatSuccess && <Redirect to="/" /> }
              )} />
              <Route path="/cat/:id" component={Profile} />

          </div>
        </Router>
      );
    }
  }
)
