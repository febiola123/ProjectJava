import React,{Component,useEffect,useState} from "react"
import{
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap"
import axios from "axios"

const Header=(props)=>{
    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    let nav;
    if(props.isAdmin == null){
      nav =<React.Fragment><NavItem>
            <NavLink href="/sign-in">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/sign-up">Register</NavLink>
        </NavItem></React.Fragment>
    }else{
      nav =<React.Fragment>
        <NavItem>
            <NavLink href="/admin">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/product">Product</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/">Logout</NavLink>
        </NavItem>
        </React.Fragment>
    }
      return (
          <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand>Kantin IT DEL</NavbarBrand>
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {nav}
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
  }
  

export default Header