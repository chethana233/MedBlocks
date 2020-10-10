import React, { Component } from "react";
import { Form, Button, Label, Input } from 'semantic-ui-react';
import web3 from "../ethereum/web3";
import medBlocks from '../ethereum/medBlocks';

class Login extends Component {
  state = {
    username: "",
    aadharNumber: "",
    passCode: ""
  };

  // handleChange = (e) => {
  //   const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
  //   this.setState({ fields: newFields });
  // };

  handleLoginSubmit = async (event) => {
    event.preventDefault();
    // whatever you want to do when user submits a form
    const { username, aadharNumber, passCode } = this.state;
    const accounts = await web3.eth.getAccounts();
    if(this.props.signin === "Sign in as Doctor"){
      console.log("Doctor");
      await medBlocks.methods.AddNewDoctor(username, aadharNumber, passCode).send({from: accounts[0]});
      
    } else{
      console.log("Patient");
      await medBlocks.methods.AddNewPatient(username, aadharNumber, passCode).send({from: accounts[0]});
    }
    this.props.handleClose();
  };

  render() {
    const { username, aadharNumber, passCode } = this.state;

    return (
          <Form onSubmit={this.handleLoginSubmit}
            // onSubmit={(e) => {
            // this.handleLoginSubmit(e);
           // this.props.handleClose();
          //  }}
          >
            <Label style={{marginTop: '0px'}} htmlFor="username">Username</Label>
            <br />
            <Input
              placeholder="Username"
               value={username}
              onChange={ event => {this.setState({ username: event.target.value})}}
              ></Input>             
            <br />
            <Label style={{marginTop: '20px'}} htmlFor="Aadhar Card Number">Aadhar Card Number</Label>
            <br />
            <Input
              placeholder="Aadhar Card Number"
              value={aadharNumber}
              onChange={ event => {this.setState({ aadharNumber: event.target.value })}}
              ></Input>
            <br />
            <Label style={{marginTop: '20px'}} htmlFor="username">Pass Code</Label>
            <br />
            <Input
              type="password"
              placeholder="Password"
              value={passCode}
              onChange={ event => {this.setState({ passCode: event.target.value})}}
            ></Input>
            <br />
            <Button primary style={{marginTop: '10px'}}>Sign in</Button>
          </Form>
    );
  }
}

export default Login;