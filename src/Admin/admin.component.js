import React,{Component} from "react"
import Header from "../Tambahan/Header"
export default class Admin extends Component{
    render(){
        return(
            <React.Fragment>
            <Header isAdmin={1}/>
            <div>
                <h1>Ini halaman Admin</h1>
            </div>
            </React.Fragment>
        )
    }
}