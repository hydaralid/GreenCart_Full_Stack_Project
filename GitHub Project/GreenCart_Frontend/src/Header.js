import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BsCart, BsPerson, BsBell, BsBoxArrowRight } from 'react-icons/bs';
import './css/App.css';

const Header = () => {
  return (
    <Navbar className="border-bottom shadow-sm py-2">
        {/* Logo */}
        <Navbar.Brand href="Homepage" className="d-flex align-items-center">
            <div className="me-5">
                <img src="./images/logo.png" alt="logo"/>
            </div>
        </Navbar.Brand>
      <Container>
        {/* Toggle button for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
          <Nav.Link href="Homepage" className="mx-4 fw-medium">Home</Nav.Link>
            <Nav.Link href="Shopdemo" className="mx-4 fw-medium">Shop</Nav.Link>
            <Nav.Link href="Sellproducts" className="mx-4 fw-medium">Become a Dealer</Nav.Link>
            <Nav.Link href="Orders" className="mx-4 fw-medium">Orders</Nav.Link>
            <Nav.Link href="Econnect" className="mx-4 fw-medium">E-Connect</Nav.Link>
          </Nav>

          {/* Icons on the right */}
          <Nav className="d-flex align-items-center">
            <Nav.Link href="profile" className="mx-2">
              <BsPerson size={20} />
            </Nav.Link>
            <Nav.Link href="landingpage" className="mx-2">
              <BsBoxArrowRight size={20} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;