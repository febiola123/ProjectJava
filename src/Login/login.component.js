import React, { Component,useState} from "react";
import {Link, Redirect} from "react-router-dom"
import{Container
    ,Col
    ,Row
    ,Card
    ,CardTitle
    ,CardBody
    ,Button
    ,CustomInput
    ,InputGroupAddon,
    InputGroupText
    ,Form, FormGroup, Label, Input, FormText
} from "reactstrap";
import axios from 'axios';
import Header from "../Tambahan/Header"
import BASE_URL from "../Tambahan/Url";

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            isAdmin:'',
            isOpen:false,
            isCheck:false,
        }
        this.onClickButton = this.onClickButton.bind(this)
        this.toggle = this.toggle.bind(this);
    }
    onChangeEmail= (e)=>{
        this.setState({
            email : e.target.value
        })
    }
    onChangePassword = (e)=>{
        this.setState({
            password:e.target.value
        })
    }
    onClickButton(){
        const {email,password} = this.state;
        if(email === "admin@gmail.com" && password === 'admin123'){
            
            const user = {
                'user':email,
                'role':'admin'
            };
            localStorage.setItem('user',JSON.stringify(user));
            window.location.href="/admin";
        }
        else{
            axios.post(BASE_URL+'login',{
                'email':email,
                'password':password
            })
            .then(res=>{
                const {email,role} = res.data.user;
                
            const user = {
                'user':email,
                'role':role
            };
            localStorage.setItem('user',JSON.stringify(user));
            
            window.location.href="/home";
            })
            .catch(err=>{
                console.log(err.response);
            })
        }
    }
    handleCheck = (e)=>{
        this.setState({
            isCheck:!this.state.isCheck
        })
    }
    toggle(){
        this.setState({
            isOpen:!this.state.isOpen
        })
    }
    componentDidMount(){
        var user = localStorage.getItem('user');
        console.log(user);
    }
    render() {
        if(localStorage.getItem('user') !== null){
            var user = localStorage.getItem('user');
            if(user.role == 'admin'){
                return <Redirect to="/admin"/>
            }else{
            return <Redirect to="/home"/>
            }
        }

        const {email,password} = this.state;

        return (
            <React.Fragment>
            <Header />
            <div class="app flex-row align-items-center">
            <Container className="mx-auto" fluid="lg">
            <Card style={{maxWidth:"800px",margin:"auto"}}>
                <CardBody>
                    <Col>
                    <CardTitle  tag="h2">Login</CardTitle>
                    </Col>
                    <Form>
                        <FormGroup row>
                            <Label for="exampleEmail" md={2}>Email</Label>
                            <Col md={10}>
                                <Input type="email" name="email" value={email} onChange={this.onChangeEmail} id="exampleEmail" placeholder="Type your username" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail" md={2}>Password</Label>
                            <Col md={10}>
                                <Input type={this.state.isCheck?"text":"password"} name="password" value={password} onChange={this.onChangePassword}  id="exampleEmail" placeholder="Type your password" />
                            </Col>
                        </FormGroup>
                    </Form>
                    <Row>
                        <Col md="2">
                            <Button onClick={this.onClickButton} color="primary">Login</Button>
                        </Col>
                        <Col md="10">
                            <CustomInput type="checkbox" onChange={this.handleCheck} id="exampleCustomCheckbox" label="Show Your password" />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            </Container>
            </div>
            </React.Fragment>
        );
    }
}