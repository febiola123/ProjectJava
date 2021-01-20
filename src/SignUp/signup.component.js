import axios from "axios";
import React, { Component } from "react";
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
    ,FormFeedback
    ,Form, FormGroup, Label, Input, FormText
} from "reactstrap";
import Header from "../Tambahan/Header";
import BASE_URL from "../Tambahan/Url";
export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            noHp:'',
            noKtp:'',
            namaLengkap:'',
            isOpen:false,
            isCheck:false,
            isEmail:false,
        }
        this.onClickButton = this.onClickButton.bind(this);
    }
    onChangeEmail= (e)=>{
        this.setState({
            email : e.target.value
        })
    }
    onChangeNama = (e)=>{
        this.setState({
            namaLengkap:e.target.value
        })
    }
    onChangeNo = (e)=>{
        this.setState({
            noHp:e.target.value
        })
    }
    onChangeNoKtp = (e)=>{
        this.setState({
            noKtp:e.target.value
        })
    }
    onChangePassword = (e)=>{
        this.setState({
            password:e.target.value
        })
    }
    onClickButton(){
        const {email,password,noHp,noKtp,namaLengkap} = this.state;
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            this.setState({
                isEmail:true
            })
            alert("Format Email Salah");
        }else{
            if(password == '' || noHp == '' || noKtp == '' || namaLengkap == ''){
                alert("Semua Field Harus diisi");
            }else{
                axios.post(BASE_URL+'register',{
                    'namaLengkap':namaLengkap,
                    'noKtp':noKtp,
                    'noHp':noHp,
                    'email':email,
                    'password':password,
                    'role':'user'
                }).then(res=>{
                    const user = {
                        'user':email,
                        'role':'user'
                    };
                    localStorage.setItem('user',JSON.stringify(user));
                    window.location.href='/home'
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        }
    }
    render() {
        
        const {email,password,noHp,noKtp,namaLengkap} = this.state;
        return (
            <React.Fragment>
            <Header/>
            <div class="app flex-row align-items-center">
            <Container className="mx-auto" fluid="lg">
            <Card style={{maxWidth:"800px",margin:"auto"}}>
                <CardBody>
                    <Row>
                    <Col>
                    <CardTitle  tag="h2">Register</CardTitle>
                    </Col>
                    </Row>
                    <Form>
                    <FormGroup row>
                            <Label for="exampleEmail" md={2}>Nomor KTP</Label>
                            <Col md={10}>
                                <Input type="text" name="ktp" value={noKtp} onChange={this.onChangeNoKtp} placeholder="Ketik No Ktp" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail" md={2}>Nama Lengkap</Label>
                            <Col md={10}>
                                <Input type="text" name="nama" value={namaLengkap} onChange={this.onChangeNama} placeholder="Ketik Nama Lengkapmu" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail" md={2}>Nomor Handphone</Label>
                            <Col md={10}>
                                <Input type="text" name="noHp" value={noHp} onChange={this.onChangeNo} placeholder="Ketik Nomor Handphone kamu" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail" md={2}>Email</Label>
                            <Col md={10}>
                                <Input type="email" name="email" invalid={this.state.isEmail} value={email} onChange={this.onChangeEmail} placeholder="Ketik Email Kamu" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail" md={2}>Password</Label>
                            <Col md={10}>
                                <Input type="password" name="password" value={password} onChange={this.onChangePassword}  placeholder="Ketik Password kamu" />
                            </Col>
                        </FormGroup>
                    </Form>
                    <Row>
                        <Col md="2">
                            <Button onClick={this.onClickButton} color="primary">Sign UP</Button>
                        </Col>
                        <Col md="10">
                    Already registered <a href="/sign-in">sign in?</a>
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