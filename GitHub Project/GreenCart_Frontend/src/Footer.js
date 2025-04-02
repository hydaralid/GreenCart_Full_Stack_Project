import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col,Card, Nav } from 'react-bootstrap';
import { FaInstagram, FaFacebookSquare, FaTwitter, FaYoutube } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-light pt-5 pb-3">
      <Container>
        <Row className="mb-1">
          <Col md={5} className="mb-4 mb-md-0">
            <p className="text-muted mb-4">
              Shop sustainably with GreenCart, the eco-friendly
              eCommerce website offering premium, planet-friendly products.
               Embrace green living with stylish, durable, and responsibly sourced essentials for a better tomorrow.
            </p>
            <div className="d-flex gap-5">
              <a href="#" className="text-success fs-1">
                <FaInstagram />
              </a>
              <a href="#" className="text-success fs-1">
                <FaFacebookSquare />
              </a>
              <a href="#" className="text-success fs-1">
                <FaTwitter />
              </a>
              <a href="#" className="text-success fs-1">
                <FaYoutube />
              </a>
            </div>
          </Col>

          <Col md={3} className="mb-4 mb-md-0">
            <ul className="list-unstyled">
            <li className="mb-2"><a href="Homepage" className="text-decoration-none text-dark">Home</a></li>
              <li className="mb-2"><a href="shopdemo" className="text-decoration-none text-dark">Shop Now</a></li>
              <li className="mb-2"><a href="sellproducts" className="text-decoration-none text-dark">Become a Dealer</a></li>
              <li className="mb-2"><a href="econnect" className="text-decoration-none text-dark">E-Connect</a></li>
              <li className="mb-2"><a href="orders" className="text-decoration-none text-dark">Track Order</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-decoration-none text-dark">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-dark">Terms & Conditions</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-dark">Support Center</a></li>

              <Nav className="ms-auto p-3" style={{ backgroundColor: '#f5f9f4', display: 'flex', justifyContent: 'flex-end', borderRadius: '10px' }}>
                 <Nav.Link href="AdminLogin" className="mx-4 fw-medium px-4 py-2 rounded-pill text-white" 
                  style={{ backgroundColor: 'green', textDecoration: 'none', display: 'inline-block' }}>
                    Admin Signup
                </Nav.Link>
              </Nav>
            </ul>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col className="text-center">
            <p className="text-muted mb-0">© 2025 GreenCart. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;