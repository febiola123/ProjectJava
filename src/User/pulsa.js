import React, { Component } from "react";
import Header from "../Tambahan/Header";
import {Container,Table,Button} from 'reactstrap'
import axios from 'axios';
import { Link } from "react-router-dom";
export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            product:[],
            baseUrl:"http://pesananapi.herokuapp.com/",
        }
    }
    componentDidMount(){
        axios.get(this.state.baseUrl+"pulsa")
        .then(res=>{
            // console.log(res.data);
            this.setState({
                product:res.data,
            })
        })
    }

    render(){
        const {product} = this.state;
        const renderData = product.map((data,index)=>{
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{data.voucher}</td>
                    <td>{data.harga}</td>
                    <td>{data.stock}</td>
                    <td><a href={'/pesan/'+data._id} className="btn btn-primary">Pesan</a></td>
                </tr>
            )
        })
        return(
            <React.Fragment>
                <Header isAdmin={2}/>
                <Container fluid>   
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