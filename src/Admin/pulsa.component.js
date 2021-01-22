import React,{Component, useEffect, useState} from "react"
import Header from "../Tambahan/Header"
import {Button, Container,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table,
    Select
}from "reactstrap"
import axios from "axios";

export default class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            pulsa:[],
            baseUrl:"http://pesananapi.herokuapp.com/",
            addModal:false,
            updateModal:false,
            voucher:0,
            harga:0,
            stock:0,

        }
        this.showModal = this.showModal.bind(this);
        this.showUpdate = this.showUpdate.bind(this);
    }
    componentDidMount(){
        axios.get(this.state.baseUrl+"pulsa")
        .then(res=>{
            // console.log(res.data);
            this.setState({
                pulsa:res.data,
            })
        })
    }
    showUpdate(){
        this.setState({
            updateModal:!this.state.updateModal
        })
    }
    showModal(){
        this.setState({
            addModal:!this.state.addModal,
            voucher:0,
            harga:0,
            stock:0,
        })
    }
    handleVoucher = e =>{
        this.setState({
            voucher:parseInt(e.target.value)
        })
    }
    handlePrice = e =>{
        this.setState({
            harga:parseInt(e.target.value)
        })
    }
    handleStock = e =>{
        this.setState({
            stock:parseInt(e.target.value)
        })
    }
    handleUpdateModal = id=>{
        axios.get(this.state.baseUrl+'pulsa/'+id)
        .then(res=>{
            const data = res.data;
            this.setState({
                voucher:data.voucher,
                harga:data.harga,
                stock:data.stock,
                updateModal:!this.state.updateModal
            })
        })
    }
    handleAddForm = ()=>{
        const{voucher,harga,stock} = this.state;
        axios.post(this.state.baseUrl+"pulsa",{
            "voucher":voucher,
            "harga":harga,
            "stock":stock
        })
        .then(res=>{
            alert("Data Berhasil di tambah")
            console.log(res);
            // window.location.reload();
        })
        .catch(err=>{
            alert("Data tidak bisa ditambah");
            window.location.reload();
        })
    }

    render(){
        const{pulsa} = this.state;

        const renderData = pulsa.map((data,index)=>{
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{data.voucher}</td>
                    <td>{data.harga}</td>
                    <td>{data.stock}</td>
                    <td>
                        <Button onClick={()=>this.handleUpdateModal(data._id)}>Update</Button>
                    </td>
                </tr>
            )
        })
        return(
            <React.Fragment>
                <Modal isOpen={this.state.updateModal}>
                <ModalHeader toggle={this.showUpdate}>Add Pulsa</ModalHeader>
                <ModalBody>
                    Voucher
                    <Input type="text" onChange={this.handleVoucher} value={this.state.voucher||' '}/>
                    Harga
                    <Input type="text" onChange={this.handlePrice} value={this.state.harga||' '}/>
                    Stok 
                    <Input type="text" onChange={this.handleStock} value={this.state.stock||' '} />
                </ModalBody>
                <ModalFooter>
                     <Button className="btn btn-secondary" onClick={this.showUpdate}>
                            Close
                        </Button>
                        <Button className="btn btn-info">
                            Save Changes
                        </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.addModal}>
                <ModalHeader toggle={this.showModal}>Add Pulsa</ModalHeader>
                <ModalBody>
                    Voucher
                    <Input type="text" onChange={this.handleVoucher} value={this.state.voucher}/>
                    Harga
                    <Input type="text" onChange={this.handlePrice} value={this.state.harga}/>
                    Stok
                    <Input type="text" onChange={this.handleStock} value={this.state.stock} />
                </ModalBody>
                <ModalFooter>
                     <Button className="btn btn-secondary" onClick={this.showModal}>
                            Close
                        </Button>
                        <Button className="btn btn-info" onClick = {this.handleAddForm}>
                            Save Changes
                        </Button>
                </ModalFooter>
            </Modal>
            <Header isAdmin={1}/>
            <Container fluid className="mt-3">
            <Button className="mb-2" color="success" onClick={this.showModal}>Add Pulsa</Button>
                <Table size="sm" dark>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Voucher</th>
                            <th>Harga</th>
                            <th>Stok</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderData}
                    </tbody>
                </Table>
            </Container>
            </React.Fragment>
        )
    }
}