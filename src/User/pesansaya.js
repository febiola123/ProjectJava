import axios from "axios";
import React, { Component, useEffect, useState } from "react"
import Header from "../Tambahan/Header";
import {Table,Row,Col,Button} from "reactstrap";
import BASE_URL from "../Tambahan/Url"

export default class PesanSaya extends Component{

    constructor(props){
        super(props);
        this.state= {
            order:[],
            product:[],
        }
    }
    componentWillUnmount(){
       
            this.setState({
                order:[],
                product:[],
            })
    }
    componentDidMount(){
        const ids = localStorage.getItem('ids');
        axios.get(BASE_URL+'order?user_id='+ids,{
            "user_id":ids
        })
        .then(res=>{
            this.setState({
                order:res.data,
                product:res.data.product
            })
            console.log(this.state.order);
        })
    }


    render(){
        let renderData;
        let item = 0;
        if(this.state.product){
            console.log("ada");
             renderData = this.state.product.map((ord,index)=>{
                 {item++}
                 return(<tr key={ord._id}>
                     <td>{index+1}</td>
                     <td>{ord.nama}</td>
                     <td>{ord.jlh_pesan}</td>
                     <td>{ord.price}</td>
                 </tr>)
             })
        }
        return(
            
        <React.Fragment>
        <Header isAdmin={2}/>
        <h1>Pesanan Saya</h1>
        <Table sm={2} dark>
        <thead>
            <tr>
            <th>#</th>
            <th>Nama Product</th>
            <th>Jumlah Pesanan</th>
            <th>Harga</th>
            <th>Option</th>
            </tr>
        </thead>
        <tbody>
            {renderData}
        </tbody>
        </Table>
        <Row>
            <Col md={3}>
                <h1>Harga : {this.state.order.totalHarga}</h1>
            </Col>
            <Col md={2}>{item > 0?
                <Button color='success'>Bayar</Button>:""}
            </Col>
        </Row>
    </React.Fragment>
        )
    }
};