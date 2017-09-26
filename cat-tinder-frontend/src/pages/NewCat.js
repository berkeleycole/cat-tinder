import React, { Component } from 'react';
import {
  Alert,
  Button,
  Col,
  ControlLabel,
  FormGroup,
  FormControl,
  HelpBlock,
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

  errorsFor(attribute){
    var errorString = ""
    if(this.props.errors){
      const errors = this.props.errors.filter(error => error.param === attribute )
      if(errors){
        errorString = errors.map(error => error.msg ).join(", ")
      }
    }
    return errorString === "" ? null : errorString
  }

  render() {
    return (
      <form>
        <Row>
          <Col xs={6}>
            {this.props.errors &&
              <Alert bsStyle="danger">
                Please check the form and try again
              </Alert>
            }
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <FormGroup
              id="name-form-group"
              validationState={this.errorsFor('name') && 'error'}>
              <ControlLabel id="name">Name</ControlLabel>
              <FormControl
                type="text"
                name="name"
                value={this.state.form.name}
                onChange={this.handleChange.bind(this)}
              />
              {this.errorsFor('name') &&
                <HelpBlock id="name-help-block">{this.errorsFor('name')}</HelpBlock>
              }
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup
              id="age-form-group"
              validationState={this.errorsFor('age') && 'error'}>
              <ControlLabel id="age">Age</ControlLabel>
              <FormControl
                type="number"
                name="age"
                value={this.state.form.age}
                onChange={this.handleChange.bind(this)}
              />

              {this.errorsFor('age') &&
                <HelpBlock id="age-help-block">{this.errorsFor('age')}</HelpBlock>
              }
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup
              id="enjoys-form-group"
              validationState={this.errorsFor('enjoys') && 'error'}>
              <ControlLabel id="enjoys">Enjoys</ControlLabel>
              <FormControl
                componentClass='textarea'
                name="enjoys"
                value={this.state.form.enjoys}
                onChange={this.handleChange.bind(this)}
              />
              {this.errorsFor('enjoys') &&
                <HelpBlock id="enjoys-help-block">{this.errorsFor('enjoys')}</HelpBlock>
              }
            </FormGroup>
          </Col>
        </Row>

        <Row>
            <Button
              onClick={this.handleSubmit.bind(this)}
              id="submit">Create Cat Profile
            </Button>
        </Row>

      </form>
    )
  }
}

export default NewCat
