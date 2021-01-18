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
    ,Form, FormGroup, Label, Input, FormText
} from "reactstrap";
import Header from "../Tambahan/Header";
export default class SignUp extends Component {
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
        var email = this.state.email;
        if(email === "admin"){
            window.location.href="/admin";
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
    render() {
        
        const {email,password} = this.state;
        return (
            <React.Fragment>
            <Header/>
            <div class="app flex-row align-items-center">
            <Container className="mx-auto" fluid="lg">
            <Card style={{maxWidth:"800px",margin:"auto"}}>
                <CardBody>
                    <Col>
                    <CardTitle  tag="h2">Login</CardTitle>
                    </Col>
                    <Form>
                    <FormGroup row>
                            <Label for="exampleEmail" md={2}>Nomor KTP</Label>
                            <Col md={10}>
                                <Input type="text" name="email" value={email} onChange={this.onChangeEmail} id="exampleEmail" placeholder="Type your username" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail" md={2}>Nama Lengkap</Label>
                            <Col md={10}>
                                <Input type="email" name="email" value={email} onChange={this.onChangeEmail} id="exampleEmail" placeholder="Type your username" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail" md={2}>Nomor Handphone</Label>
                            <Col md={10}>
                                <Input type="email" name="email" value={email} onChange={this.onChangeEmail} id="exampleEmail" placeholder="Type your username" />
                            </Col>
                        </FormGroup>
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