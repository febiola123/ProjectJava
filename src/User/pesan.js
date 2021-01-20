import React, { Component, useState } from "react";
import Header from "../Tambahan/Header";
import {Container,Table,Button} from 'reactstrap'
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const Pesan = (props)=>{

    let{id} = useParams();
    console.log(id);
    return(
        <React.Fragment>
            <Header isAdmin={2}/>
            <Container fluid>
            </Container>
        </React.Fragment>
    )
}

export default Pesan;