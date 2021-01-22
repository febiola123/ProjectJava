
//import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Login/login.component";
import SignUp from "./SignUp/signup.component";
import Admin from "./Admin/admin.component";
import Product from "./Admin/product.component"
import Home from "./User/home";
import Pesan from "./User/pesan";
import PesanSaya from "./User/pesansaya";
import {Admin1,User} from "./Tambahan/Auth";
import Pulsa from "./Admin/pulsa.component";
import BeliPulsa from "./User/pulsa";

function App() {
  return (<Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/admin" component = {Admin1(Admin)} />
            <Route path="/product" component = {Admin1(Product)} />
            <Route path="/home" component = {User(Home)} />
            <Route path="/pesan/:id" component = {User(Pesan)} />
            <Route path="/my-order" component = {User(PesanSaya)} />
            <Route path="/pulsa" component={Admin1(Pulsa)}/>
            <Route path="/belipulsa" component={User(BeliPulsa)}/>
          </Switch>
          </Router>
  );
}

export default App;
