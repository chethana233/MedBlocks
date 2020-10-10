import React, { Component } from 'react';
import { Menu, Form, Button, Label } from 'semantic-ui-react';
import { Link } from '../routes';
import medBlocks from '../ethereum/medBlocks';
import web3 from '../ethereum/web3';
import Modal from './Modal';
import { Router } from '.././routes';

class Header extends Component {
  state = {
    IsDoctor: false,
    IsPatient: false
  };

  onIsDoctor = async () => {
    const accounts = await web3.eth.getAccounts();
    let isDoctor = await medBlocks.methods.getUserIsDoctor(accounts[0]).call(); 
    this.setState({IsDoctor: isDoctor});
    return isDoctor;
  };

  render(){
    return(
      <Menu style={{marginTop: "10px"}}>
        <Link route="/">
          <a className="item">MedBlocks</a>
        </Link>
        <Menu.Menu position="right">
          <Modal signin="Sign in as Doctor"/>
          <Modal signin="Sign in as Patient"/>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;