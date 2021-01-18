
//import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Login/login.component";
import SignUp from "./SignUp/signup.component";
import Admin from "./Admin/admin.component";
import {Admin1,User} from "./Tambahan/Auth";

function App() {
  return (<Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/admin" component = {Admin} />
          </Switch>
          </Router>
  );
}

export default App;
