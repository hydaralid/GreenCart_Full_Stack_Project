import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { Search, Facebook, Twitter, Instagram, Linkedin } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import HomepageBg from './images/Homepage.jpg';
import recycleImage from './images/recycle.jpg';
import aboutUs from './images/aboutus.jpg';
import certificate from './images/certificate.jpg';
import commitment from './images/commitment.jpg';
import store1 from './images/store1.jpg';
import store2 from './images/store2.jpg';
import store3 from './images/store3.jpg';
import homeproducts from './images/homeproducts.jpg';
import fashion from './images/fashion.jpg';
import naturalherbs from './images/naturalherbs.jpg';
import petproducts from './images/petproducts.jpg';

function Homepage() {
  const homeCards = [
    { id: 1, title: "Sustainable Home Products", subtitle: "Sofas, Coffee Tables, TV Stands", image: homeproducts },
    { id: 2, title: "Sustainable Fashion & Accessories", subtitle: "Tables, Chairs, Sideboards", image: fashion },
    { id: 3, title: "Natural & Organic Personal Care", subtitle: "Tables, Chairs, Buffets", image: naturalherbs },
    { id: 4, title: "Sustainable Pet Products", subtitle: "Tables, Chairs, Buffets", image: petproducts }
  ];

  return (
    <div>
        <Header />
      <div style={{ backgroundColor: '#f5f5f5' }}>

        {/* Hero Section */}
        <div
          className="position-relative"
          style={{
            backgroundColor: '#4a7c59',
            backgroundImage: `url(${HomepageBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '650px',
            overflow: 'hidden'
          }}
        >
          <Container>
            <div className="text-center py-5 my-4">
              <h1 className="text-white display-4 font-weight-bold">Transform Your Space with Nature's Touch</h1>
              <p className="text-white">Bring nature into your life. Beautifully nurtured,<br />lovingly exchanged.</p>
              <Form className="mt-5">
                <div className="d-flex justify-content-center">
                  <div className="bg-white rounded d-flex" style={{ width: '400px' }}>
                    <Search size={20} className="mx-3 my-auto text-muted" />
                    <Form.Control type="search" placeholder="Search" className="border-0" style={{ boxShadow: 'none' }} />
                    <Button variant="success" className="rounded-right" style={{ borderRadius: '0 4px 4px 0' }}>Search</Button>
                  </div>
                </div>
              </Form>
            </div>
          </Container>
        </div>

        {/* What we offer */}
        <Container className="py-5">
          <h2 className="text-center mb-4">What we offer</h2>
          <Row className="row-cols-2 row-cols-md-5 g-3 d-flex justify-content-center">
            {homeCards.map(card => (
              <Col key={card.id} className="d-flex justify-content-center mx-2">
                <Card className="h-100" style={{ width: '20rem', height: '16rem' }}>
                  <Card.Img variant="top" src={card.image} style={{ height: '120px', objectFit: 'cover' }} />
                  <Card.Body className="p-2">
                    <Card.Title style={{ fontSize: '14px' }}>{card.title}</Card.Title>
                    <Card.Text style={{ fontSize: '12px' }}>{card.text}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>



        </Container>

        {/* About Us Section */}
        <div id="about-us" className="bg-light py-5">
        <Container className="py-3">
          <h2 className="text-center mb-3">About Us</h2>
          <Row className="align-items-center mb-5">
            <Col lg={6}>
              <h3 className="mb-4">Our Story</h3>
              <p className="mb-4">GreenCart was founded in 2024 with a simple mission: to make sustainable living accessible to everyone. We started as a small team of environmental enthusiasts who believed that everyday products could be both eco-friendly and beautiful.</p>
              <p>Today, we've grown into a community of like-minded individuals committed to reducing environmental impact without sacrificing quality or style. Every product in our store is carefully selected to meet our rigorous sustainability standards.</p>
            </Col>
            <Col lg={6} className="text-center">
              <img
                src={aboutUs}
                alt="EcoShop founders"
                className="img-fluid rounded shadow"
                style={{ height: "300px", width: "500px" }}
              />
            </Col>
          </Row>
          <hr className="mb-5"></hr>

          <h3 className="text-center mb-5">Our Values</h3>
          <Row className="g-4 mb-5">
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle mb-3 mx-auto" style={{width: '70px', height: '70px'}}>
                    <i className="bi bi-globe text-success" style={{fontSize: '1.75rem'}}></i>
                  </div>
                  <Card.Title>Planet First</Card.Title>
                  <Card.Text>
                    Every decision we make prioritizes environmental impact.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle mb-3 mx-auto" style={{width: '70px', height: '70px'}}>
                    <i className="bi bi-lightbulb text-success" style={{fontSize: '1.75rem'}}></i>
                  </div>
                  <Card.Title>Innovation</Card.Title>
                  <Card.Text>
                    We continuously seek new sustainable materials and solutions.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle mb-3 mx-auto" style={{width: '70px', height: '70px'}}>
                    <i className="bi bi-people text-success" style={{fontSize: '1.75rem'}}></i>
                  </div>
                  <Card.Title>Community</Card.Title>
                  <Card.Text>
                    We build relationships with customers, suppliers, and partners.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle mb-3 mx-auto" style={{width: '70px', height: '70px'}}>
                    <i className="bi bi-award text-success" style={{fontSize: '1.75rem'}}></i>
                  </div>
                  <Card.Title>Quality</Card.Title>
                  <Card.Text>
                    We believe sustainable products should also be exceptional products.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row> 
        </Container>
      </div>


         {/* Our Stores*/}
         <Container className='bg-light mb-5'>
                  <div className="container mt-5">
            <div className="row mb-0">
              <div className="col-12 text-center">
                <h2 className=" text-center mb-4">Featured Stores</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="p-4 rounded-3" style={{backgroundColor: "#f8fff8"}}>
                  <div className="row g-4">

                    {/* Store Card 1 */}
                    <div className="col-md-4">
                      <div className="card h-100 shadow-sm rounded-4 border-0">
                        <img src={store1} className="card-img-top landingpage-img" alt="Flagship Store Bengaluru" />
                        <div className="card-body">
                          <h5 className="card-title fw-bold">Flagship Store - Bengaluru</h5>
                          <p className="card-text text-muted small">123 MG Road, Bengaluru, Karnataka 560001</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="small text-muted">Mon-Sat: 10 AM - 8 PM</div>
                            <a href="#" className="btn btn-success rounded-pill px-3">Get Directions</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Store Card 2 */}
                    <div className="col-md-4">
                      <div className="card h-100 shadow-sm rounded-4 border-0">
                        <img src={store2} className="card-img-top landingpage-img" alt="Premium Store Delhi" />
                        <div className="card-body">
                          <h5 className="card-title fw-bold">Premium Store - Delhi</h5>
                          <p className="card-text text-muted small">456 Connaught Place, New Delhi 110001</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="small text-muted">Mon-Sat: 10 AM - 8 PM</div>
                            <a href="#" className="btn btn-success rounded-pill px-3">Get Directions</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Store Card 3 */}
                    <div className="col-md-4">
                      <div className="card h-100 shadow-sm rounded-4 border-0">
                        <img src={store3} className="card-img-top landingpage-img" alt="Experience Center Mumbai" />
                        <div className="card-body">
                          <h5 className="card-title fw-bold">Experience Center - Mumbai</h5>
                          <p className="card-text text-muted small">789 Linking Road, Mumbai 400050</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="small text-muted">Mon-Sat: 10 AM - 8 PM</div>
                            <a href="#" className="btn btn-success rounded-pill px-3">Get Directions</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         </Container>

      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
