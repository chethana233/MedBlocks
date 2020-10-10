import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import medBlocks from '../ethereum/medBlocks';
import Layout from '../components/Layout';
import { Router } from '../routes';
import web3 from '../ethereum/web3';

class MedIndex extends Component {
    state = {
        IsDoctor: false,
        IsPatient: false
    };
  
    onIsDoctor = async (e) => {
        e.preventDefault();
        try{
            const accounts = await web3.eth.getAccounts();
            const IsDoctor = await medBlocks.methods.getUserIsDoctor(accounts[0]).call(); 
            if(IsDoctor){
                Router.pushRoute('/category/doctor');
            }else{
                alert("You are not a Doctor");
            }
        }catch(err){
            alert(err);
        }
    };

    onIsPatient = async (e) => {
        e.preventDefault();
        try{
            const accounts = await web3.eth.getAccounts();
            const IsPatient = await medBlocks.methods.getUserIsPatient(accounts[0]).call(); 
            if(IsPatient){
                Router.pushRoute('/category/patient');
            }else{
                alert("You are not a Patient");
            }
        }catch(err){
            alert(err);
        }
    };

    render(){
        return(
            <Layout>
                <Form onSubmit={this.onIsDoctor}>
                    <Button 
                    content="Press if you are a Doctor"
                    icon="add circle"
                    primary
                    />
                </Form>
                <Form onSubmit={this.onIsPatient} style={{marginTop: '10px'}}>
                    <Button
                    content="Press if you are a Patient"
                    icon="add circle"
                    primary
                    />
                </Form>
            </Layout>
        );
    }
}

export default MedIndex;