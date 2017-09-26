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
import Cats from './pages/Cats'
import NewCat from './pages/NewCat'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiUrl: "http://localhost:3000",
      cats: [],
      newCatSuccess: false,
      errors: null
    }
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
    fetch(`${this.state.apiUrl}/cats`)
    .then((rawResponse) =>{
      return rawResponse.json()
    })
    .then((parsedResponse)=>{
      this.setState({cats: parsedResponse.cats})
    })
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={props => (
            <Grid>
              <PageHeader>
                <Row>
                  <Col xs={8}>
                    Cat Tinder
                    <small className='subtitle'>Add a Cat</small>
                  </Col>
                </Row>
              </PageHeader>
              <NewCat
                onSubmit={this.handleNewcat.bind(this)}
                errors={this.state.errors && this.state.errors.validations}
              />
              {this.state.newCatSuccess &&
                <Redirect to="/cats" />
              }

            </Grid>
          )} />

          <Route exact path="/cats" render={props => (
            <Grid>
              <PageHeader>
                <Row>
                  <Col xs={8}>
                    Cat Tinder
                    <small className='subtitle'>All the Cats</small>
                  </Col>
                </Row>
              </PageHeader>
              <Cats cats={this.state.cats} />

              {!this.state.newCatSuccess &&
                <Redirect to="/" />
              }
            </Grid>
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
