import React, { Component } from 'react';
import {BrowserRouter as Router, Redirect, Route, Link} from 'react-router-dom'
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
    componentWillMount(){
  fetch(`${this.state.apiUrl}/cats`)
  .then((rawResponse) =>{
    return rawResponse.json()
  })
  .then((parsedResponse)=>{
    this.setState({cats: parsedResponse.cats})
  })
}
handleNewcat(params){
    fetch(`${this.state.apiUrl}/cats`,
      {
        body: JSON.stringify(params),  // <- we need to stringify the json for fetch
        headers: {  // <- We specify that we're sending JSON, and expect JSON back
          'Content-Type': 'application/json'
        },
        method: "POST"  // <- Here's our verb, so the correct endpoint is invoked on the server
      }
    )
    .then((rawResponse)=>{
      return rawResponse.json()
    })
    .then((parsedResponse) =>{
      if(parsedResponse.errors){ // <- Check for any server side errors
        this.setState({errors: parsedResponse.errors})
      }else{
        const cats = Object.assign([], this.state.cats)
        cats.push(parsedResponse.cat) // <- Add the new cat to our list of cats
        this.setState({
          cats: cats,  // <- Update cats in state
          errors: null, // <- Clear out any errors if they exist
          newCatSuccess: true
        })
      }
    })
  }
  render() {
    return (
        <Router>
            <div>
                <Route exact path="/" render={props => (
                  
                    <NewCat
                    onSubmit={this.handleNewcat.bind(this)}
                    errors={this.state.errors && this.state.errors.validations}
                    />
                     <Col xs={12}>
                       <small>
                         <Link to='/cats' id='cats-link'>Show me the Cats</Link>
                       </small>
                     </Col>
                     {this.state.newCatSuccess &&
                         <Redirect to="/cats" />
                     }
                  </Grid>
                )} />

                <Route exact path="/cats" render={props => (
                    <Grid>
                      <PageHeader>
                        <Row>
                        <Col xs={12}>
                          <h1>Cat Tinder</h1>
                        </Col>

                        </Row>
                      </PageHeader>
                      <Cats cats={this.state.cats} />
                      <Col xs={12}>
                        <small>
                          <Link to='/' id='cats-link'>Add a Cat</Link>
                        </small>
                      </Col>
                    </Grid>
                  )} />
        </div>
      </Router>
    );
  }
}

export default App;
