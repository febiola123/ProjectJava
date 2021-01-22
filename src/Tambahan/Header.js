import React,{Component,useEffect,useState} from "react"
import{
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap"
import axios from "axios"

const logout = ()=>{
  localStorage.clear();
}

const Header=(props)=>{
    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    let nav;
    if(props.isAdmin == null){
      nav =<React.Fragment>
        <NavItem>
            <NavLink href="/sign-in">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/sign-up">Register</NavLink>
        </NavItem>
        </React.Fragment>
    }else if(props.isAdmin == 1){
      nav =<React.Fragment>
        <NavItem>
          <NavLink href="/product">Product</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/pulsa">Pulsa</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/" onClick={()=>{localStorage.clear()}}>Logout</NavLink>
        </NavItem>
        </React.Fragment>
    }else{
      nav =<React.Fragment>
        <NavItem>
          <NavLink href="/home">Product</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/my-order">Pesanan Saya</NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Booking
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href="/booking-room">Booking Ruangan</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/booking-seat">Booking Tempat Duduk</NavLink>
                </DropdownItem>
              </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem>
          <NavLink href="/packet">Pengantaran Paket</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/belipulsa">Beli Pulsa</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/" onClick={()=>{localStorage.clear()}}>Logout</NavLink>
        </NavItem>
        </React.Fragment>
    }
      return (
          <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Kantin IT DEL</NavbarBrand>
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