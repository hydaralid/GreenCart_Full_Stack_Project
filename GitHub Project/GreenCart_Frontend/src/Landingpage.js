import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { BsCart, BsPerson, BsBell, BsBoxArrowRight } from 'react-icons/bs';
import './css/App.css';
import Footer from './Footer';
import recycleImage from './images/recycle.jpg';
import aboutUs from './images/aboutus.jpg';
import certificate from './images/certificate.jpg';
import commitment from './images/commitment.jpg';
import homeproducts from './images/homeproducts.jpg';
import fashion from './images/fashion.jpg';
import naturalherbs from './images/naturalherbs.jpg';
import petproducts from './images/petproducts.jpg';
import store1 from './images/store1.jpg';
import store2 from './images/store2.jpg';
import store3 from './images/store3.jpg';





const Landingpage = () => {

  const homeCards = [
    { id: 1, title: "Sustainable Home Products", subtitle: "Sofas, Coffee Tables, TV Stands", image: homeproducts },
    { id: 2, title: "Sustainable Fashion & Accessories", subtitle: "Tables, Chairs, Sideboards", image: fashion },
    { id: 3, title: "Natural & Organic Personal Care", subtitle: "Tables, Chairs, Buffets", image: naturalherbs },
    { id: 4, title: "Sustainable Pet Products", subtitle: "Tables, Chairs, Buffets", image: petproducts }
  ];


  return (
    <div>
      <Navbar className="border-bottom shadow-sm py-2">
              {/* Logo */}
              <Navbar.Brand className="d-flex align-items-center">
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
                <Nav.Link href="Login" className="mx-4 fw-medium">Home</Nav.Link>
                  <Nav.Link href="Login" className="mx-4 fw-medium">Shop</Nav.Link>
                  <Nav.Link href="Login" className="mx-4 fw-medium">Become a Dealer</Nav.Link>
                  <Nav.Link href="Login" className="mx-4 fw-medium">Orders</Nav.Link>
                  <Nav.Link href="Login" className="mx-4 fw-medium">E-Connect</Nav.Link>
                </Nav>
      
                {/* Icons on the right */}
                <Nav className="d-flex align-items-center">
                  <Nav.Link href="Login" className="mx-2">
                    <BsPerson size={20} />
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

    <div className="eco-landing">
      {/* Hero Section */}
      <div className="bg-success bg-opacity-25 py-5">
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start">
              <h1 className="display-4 fw-bold mb-4">Shop Sustainably, <br />Live Consciously</h1>
              <p className="lead mb-4">Discover eco-friendly products that look good, feel good, and do good for our planet.</p>
              <a href='Signup'>
                  <Button variant="success" size="lg" className="rounded-pill px-4 me-3">Register</Button>
              </a>
              <a href="#about-us">
                <Button variant="outline-success" size="lg" className="rounded-pill px-4">About us</Button>
              </a>
            </Col>
            <Col lg={6} className="mt-5 mt-lg-0 text-center">
              <img
                src={recycleImage}
                alt="Eco-friendly products"
                className="img-fluid rounded shadow landingpage-img1"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5 mb-3">
        <h2 className="text-center mb-5">Why Choose EcoShop?</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center">
              <Card.Body className="p-4">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle mb-3 mx-auto" style={{width: '80px', height: '80px'}}>
                  <i className="bi bi-tree text-success" style={{fontSize: '2rem'}}></i>
                </div>
                <Card.Title>Sustainable Materials</Card.Title>
                <Card.Text>
                  All our products are made from responsibly sourced, recyclable, or biodegradable materials.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center">
              <Card.Body className="p-4">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle mb-3 mx-auto" style={{width: '80px', height: '80px'}}>
                  <i className="bi bi-box-seam text-success" style={{fontSize: '2rem'}}></i>
                </div>
                <Card.Title>Plastic-Free Packaging</Card.Title>
                <Card.Text>
                  We ship all orders in 100% plastic-free packaging that you can compost or recycle.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center">
              <Card.Body className="p-4">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle mb-3 mx-auto" style={{width: '80px', height: '80px'}}>
                  <i className="bi bi-heart text-success" style={{fontSize: '2rem'}}></i>
                </div>
                <Card.Title>1% For The Planet</Card.Title>
                <Card.Text>
                  We donate 1% of every purchase to environmental nonprofits working to protect our earth.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
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
          <hr className="mt-5 mb-5"></hr>

          <Row className="align-items-center">
            <Col lg={6} className="order-lg-2 mt-5">
              <h3 className="mb-4">Our Certifications</h3>
              <p className="mb-4">We're proud to be recognized by leading environmental and ethical certifications that validate our commitment to sustainability:</p>
              <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-4 mb-4">
                <div className="text-center">
                  <div className="bg-white rounded-circle shadow p-3 mb-2" style={{width: '80px', height: '80px'}}>
                    <i className="bi bi-patch-check-fill text-success" style={{fontSize: '2.5rem'}}></i>
                  </div>
                  <small>B Corp Certified</small>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-circle shadow p-3 mb-2" style={{width: '80px', height: '80px'}}>
                    <i className="bi bi-recycle text-success" style={{fontSize: '2.5rem'}}></i>
                  </div>
                  <small>Cradle to Cradle</small>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-circle shadow p-3 mb-2" style={{width: '80px', height: '80px'}}>
                    <i className="bi bi-droplet-fill text-success" style={{fontSize: '2.5rem'}}></i>
                  </div>
                  <small>Water Positive</small>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-circle shadow p-3 mb-2" style={{width: '80px', height: '80px'}}>
                    <i className="bi bi-wind text-success" style={{fontSize: '2.5rem'}}></i>
                  </div>
                  <small>Carbon Neutral</small>
                </div>
              </div>
            </Col>
            <Col lg={6} className="order-lg-1 text-center mb-4 mb-lg-0">
              <img
                src={certificate}
                alt="Our sustainable practices"
                className="img-fluid rounded shadow"
                style={{ height: "350px", width: "500px" }}
              />
            </Col>
          </Row>
        </Container>
      </div>


      {/* Sustainability Section */}
      <Container className="py-5 mt-5">
        <Row className="align-items-center">
          <Col lg={6}>
            <img
              src={commitment}
              alt="Our sustainability practices"
              className="img-fluid rounded shadow"
              style={{ height: "450px", width: "550px" }}
            />
          </Col>
          <Col lg={6} className="mt-4 mt-lg-0">
            <h2 className="mb-4">Our Commitment to Sustainability</h2>
            <p className="mb-4">We believe in creating products that don't compromise our planet's future. From sourcing materials to shipping your order, we consider the environmental impact at every step.</p>
            <div className="mb-3">
              <h5><i className="bi bi-check-circle-fill text-success me-2"></i> Carbon-Neutral Shipping</h5>
              <p className="text-muted ms-4">We offset 100% of our shipping emissions through verified carbon offset projects.</p>
            </div>
            <div className="mb-3">
              <h5><i className="bi bi-check-circle-fill text-success me-2"></i> Ethical Supply Chain</h5>
              <p className="text-muted ms-4">We work only with suppliers who meet our high standards for ethical labor practices.</p>
            </div>
            <div>
              <h5><i className="bi bi-check-circle-fill text-success me-2"></i> Circular Economy</h5>
              <p className="text-muted ms-4">We design products to be reused, recycled, or composted at the end of their life.</p>
            </div>
          </Col>
        </Row>
      </Container>


      {/* What we offer */}
      <Container className="py-3 mt-3">
                <h2 className=" text-center mb-4">What we offer</h2>
                <Row className="row-cols-2 row-cols-md-5 g-3 d-flex justify-content-center">
                  {homeCards.map(card => (
                    <Col key={card.id} className="d-flex justify-content-center mx-2">
                      <Card className="h-100" style={{ width: '20rem', height: '16rem' }}>
                        <Card.Img variant="top" src={card.image} style={{ height: '120px', objectFit: 'cover' }} />
                        <Card.Body className="p-2">
                          <Card.Title style={{ fontSize: '14px' }}>{card.title}</Card.Title>
                          <Card.Text style={{ fontSize: '12px' }}>{card.text}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>


      {/* Testimonials */}
      <div className="bg-success bg-opacity-10 py-5 mt-5">
        <Container className="py-3">
          <h2 className="text-center mb-5">What Our Customers Say</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                  </div>
                  <Card.Text className="mb-4">
                    "I love knowing that my purchases are making a positive impact. The quality is excellent and the packaging was completely plastic-free!"
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-success bg-opacity-25 text-success d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                    <i className="bi bi-person-fill"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">Sarah J.</h6>
                      <small className="text-muted">Verified Customer</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                  </div>
                  <Card.Text className="mb-4">
                    "These products have helped me significantly reduce my environmental footprint. The customer service is also exceptional!"
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-success bg-opacity-25 text-success d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                      <i className="bi bi-person-fill"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">Michael T.</h6>
                      <small className="text-muted">Verified Customer</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-half text-warning"></i>
                  </div>
                  <Card.Text className="mb-4">
                    "Great company with a real commitment to sustainability. You can tell they truly care about their environmental impact."
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-success bg-opacity-25 text-success d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                      <i className="bi bi-person-fill"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">Emma R.</h6>
                      <small className="text-muted">Verified Customer</small>
                    </div>
                  </div>
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

    <Footer />
    </div>
    </div>
  );
};

export default Landingpage;