import React, { Component, useEffect, useState } from "react";
import Header from "../Tambahan/Header";
import {Container
    ,Col
    ,Row
    ,Card
    ,CardTitle
    ,CardBody
    ,Button
    ,CustomInput
    ,InputGroupAddon,
    InputGroupText
    ,Form, FormGroup, Label, Input, Table, InputGroup} from 'reactstrap'
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import BASE_URL from "../Tambahan/Url";

const Pesan = (props)=>{
    const[produk,setProduk] = useState([]);
    const[name,setName] = useState("");
    const[jumlah,setJumlah] = useState(0);
    const[total,setTotal] = useState(0);
    const[isGreater,setIsGreater] = useState(false);
    let{id} = useParams();
    useEffect(()=>{
        axios.get(BASE_URL+'food/'+id)
        .then(res=>{
            setProduk(res.data);
            setName(res.data.name);
        })
    },[]);
    function handlePrice(event){
        setJumlah(event.target.value);
        if(event.target.value > produk.stock-produk.stockLaku){
            setIsGreater(true);
        }else{
            setIsGreater(false);
        }
        setTotal(produk.price*event.target.value);
    }
    function saveOrder(){
        const idUser = localStorage.getItem("ids");
        axios.post("http://localhost:3001/order",{
            "_id":id,
            "iduser":idUser.toString(),
            "pesanan":jumlah,
            "total":total,
            "nama":name,
        }).then(res=>{
            console.log("berhasil");
            window.location.href="/my-order";
        }).catch(err=>{
            console.log("gagal");
        })
    }
    return(
        <React.Fragment>
            <Header isAdmin={2}/>
            <Container fluid>
            <Card style={{maxWidth:"800px",margin:"auto"}}>
                <CardBody>
                    <Col>
                    <CardTitle  tag="h2">Pesan</CardTitle>
                    </Col>
                    <Form>
                        <FormGroup row>
                            <Label for="exampleEmail" md={2}>Nama Produk</Label>
                            <Col md={10}>
                                <Input type="text" value={produk.name}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail" md={2}>Jumlah Pesanan</Label>
                            <Col md={10}>
                                <InputGroup>
                                <Input type="text" value={jumlah} onChange={handlePrice}  />
                                {isGreater ? 
                                <InputGroupAddon addonType="prepend" style={{textDecorationColor:"red"}}>
                                    <Button color="danger" disabled>Stock Tidak mencukupi</Button>
                                </InputGroupAddon> : ""}
                                </InputGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail" md={2}>Harga Per Biji</Label>
                            <Col md={10}>
                                <Input type="text" value={produk.price} disabled/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleEmail" md={2}>Total Harga</Label>
                            <Col md={10}>
                                <Input type="text" value={total} disabled/>
                            </Col>
                        </FormGroup>
                    </Form>
                    <Row>
                        <Col md="2">
                            <Button color="primary" onClick={saveOrder}>Pesan</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            </Container>
        </React.Fragment>
    )
}

export default Pesan;