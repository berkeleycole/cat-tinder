import React, { Component } from 'react';
import {
  Button,
  Col,
  ControlLabel,
  FormGroup,
  FormControl,
  Row
} from 'react-bootstrap'

class NewCat extends Component {
  constructor(props){
    super(props)
    this.state = {
      form:{
        name: '',
        age: '',
        enjoys: ''
      }
    }
  }

  handleChange(event){
    const formState = Object.assign({}, this.state.form)
    formState[event.target.name] = event.target.value
    this.setState({form: formState})
  }

  handleSubmit(){
    this.props.onSubmit(this.state.form)
  }

  render() {
    return (
      <form>
        <Row>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel id="name">Name</ControlLabel>
              <FormControl
                type="text"
                name="name"
                value={this.state.form.name}
                onChange={this.handleChange.bind(this)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel id="age">Age</ControlLabel>
              <FormControl
                type="number"
                name="age"
                value={this.state.form.age}
                onChange={this.handleChange.bind(this)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup>
              <ControlLabel id="enjoys">Enjoys</ControlLabel>
              <FormControl
                componentClass='textarea'
                name="enjoys"
                value={this.state.form.enjoys}
                onChange={this.handleChange.bind(this)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <Button
              onClick={this.handleSubmit.bind(this)}
            id="submit">Create Cat Profile</Button>
          </Col>
        </Row>

      </form>
    )
  }
}

export default NewCat
