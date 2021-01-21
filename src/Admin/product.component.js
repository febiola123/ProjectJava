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
// const Product = ()=>{
//     const baseUrl = "http://pesananapi.herokuapp.com/";
//     const [products,setProducts] = useState([]);
//     useEffect(()=>{
        // axios.get(baseUrl+"food")
        // .then(res=>{
        //     // console.log(res.data);
        //     setProducts(res.data);
        // })
//     },[])
//     let product = products.map((pro)=>{
//         return(
//             <p>{pro.name}</p>
//         )
//     })
//     // return product;
// }

export default class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            product:[],
            baseUrl:"http://pesananapi.herokuapp.com/",
            addModal:false,
            updateModal:false,
            option:[
                {
                    type:"Makanan"
                },
                {
                    type:"Minuman"
                },
                {
                    type:"Snack"
                }
            ],
            type:'',
            namaProduct:'',
            hargaProduct:0,
            stock:0,

        }
        this.showModal = this.showModal.bind(this);
        this.showUpdate = this.showUpdate.bind(this);
    }
    componentDidMount(){
        axios.get(this.state.baseUrl+"food")
        .then(res=>{
            // console.log(res.data);
            this.setState({
                product:res.data,
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
            namaProduct:'',
            hargaProduct:0,
            stock:0,
            type:'',
        })
    }
    handleName = e => {
        this.setState({
            namaProduct:e.target.value
        })
    }
    handleStock = e =>{
        this.setState({
            stock:parseInt(e.target.value)
        })
    }
    handlePrice = e =>{
        this.setState({
            hargaProduct:parseInt(e.target.value)
        })
    }
    handleType = selectedStatus =>{
        this.setState({
            type:selectedStatus.target.value
        })
    }
    handleUpdateModal = id=>{
        axios.get(this.state.baseUrl+'food/'+id)
        .then(res=>{
            const data = res.data;
            this.setState({
                namaProduct:data.name,
                hargaProduct:data.price,
                stock:data.stock,
                type:data.type,
                updateModal:!this.state.updateModal
            })
        })
    }
    handleAddForm = ()=>{
        const{namaProduct,type,hargaProduct,stock} = this.state;
        axios.post(this.state.baseUrl+"food",{
            "name":namaProduct,
            "price":hargaProduct,
            "stock":stock,
            "type":type
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
        const{product,option} = this.state;
        
        const selectOption = option.map((opt)=>{
            return (
                <option value={opt.type}>{opt.type}</option>
            )
        })

        const renderData = product.map((data,index)=>{
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{data.name}</td>
                    <td>{data.price}</td>
                    <td>{data.stock}</td>
                    <td>{data.type}</td>
                    <td>
                        <Button onClick={()=>this.handleUpdateModal(data._id)}>Update</Button>
                    </td>
                </tr>
            )
        })
        return(
            <React.Fragment>
                <Modal isOpen={this.state.updateModal}>
                <ModalHeader toggle={this.showUpdate}>Add Product</ModalHeader>
                <ModalBody>
                    Nama Produk
                    <Input type="text" onChange={this.handleName} value={this.state.namaProduct||' '}/>
                    Harga Product
                    <Input type="text" onChange={this.handlePrice} value={this.state.hargaProduct||' '}/>
                    Stok Produk
                    <Input type="text" onChange={this.handleStock} value={this.state.stock||' '} />
                    Jenis Produk
                    <select className="form-control" onChange={this.handleType} value={this.state.type}>
                        {selectOption}
                    </select>
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
                <ModalHeader toggle={this.showModal}>Add Product</ModalHeader>
                <ModalBody>
                    Nama Produk
                    <Input type="text" onChange={this.handleName} value={this.state.namaProduct}/>
                    Harga Product
                    <Input type="text" onChange={this.handlePrice} value={this.state.hargaProduct}/>
                    Stok Produk
                    <Input type="text" onChange={this.handleStock} value={this.state.stock} />
                    Jenis Produk
                    <select className="form-control" onChange={this.handleType} value={this.state.type}>
                        {selectOption}
                    </select>
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
            <Button className="mb-2" color="success" onClick={this.showModal}>Add Product</Button>
                <Table size="sm" dark>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama Product</th>
                            <th>Harga Product</th>
                            <th>Stok</th>
                            <th>Jenis Product</th>
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