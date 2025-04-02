import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';
import { FaTree, FaGlobeAmericas, FaRecycle, FaMapMarkerAlt, FaClock,FaCalendar, FaCalendarAlt } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import saving from './images/saving.jpg';

function Econnect() {
  // State to store scheduled and previous events
  const [scheduledEvents, setScheduledEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to map icon based on event title
  const getEventIcon = (title) => {
    const iconMap = {
      'Planting Trees': <FaTree className="text-success fs-1" />,
      'Climate Change': <FaGlobeAmericas className="text-primary fs-1" />,
      'Recycling': <FaRecycle className="text-success fs-1" />
    };
    return iconMap[title] || <FaCalendarAlt className="text-success fs-1" />;
  };

  // Fetch events from Spring Boot backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch scheduled events
        const scheduledResponse = await axios.get('http://localhost:8080/events/scheduled');
        const scheduledData = scheduledResponse.data.map(event => ({
          ...event,
          icon: getEventIcon(event.title)
        }));
        setScheduledEvents(scheduledData);

        // Fetch previous events
        const previousResponse = await axios.get('http://localhost:8080/events/previous');
        setPreviousEvents(previousResponse.data);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch events');
        setLoading(false);
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="hero-content ps-lg-4">
                <h1 className="fw-bold mb-3">Connect with Us</h1>
                <h3 className="text-secondary mb-5">Join Us in Building a Greener Future!</h3>

                <div className="d-flex justify-content-between mb-4">
                  <div className="text-center">
                    <h2 className="fw-bold">{scheduledEvents.length}+</h2>
                    <p className="text-muted">Events</p>
                  </div>
                  <div className="text-center">
                    <h2 className="fw-bold">10k+</h2>
                    <p className="text-muted">Volunteers</p>
                  </div>
                  <div className="text-center">
                    <h2 className="fw-bold">50+</h2>
                    <p className="text-muted">Locations</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <img
                src={saving}
                alt="People planting trees"
                className="img-fluid"
                style={{ height: "400px", width: "550px" }}
              />
            </Col>
          </Row>  
        </Container>
      </section>

      {/* Scheduled Events Section */}
      <section className="events-scheduled py-5" style={{ backgroundColor: '#f0f5f0' }}>
        <Container>
          <h2 className="text-center mb-5">Upcoming Events</h2>
          <Row>
            {scheduledEvents.map(event => (
              <Col lg={4} md={6} className="mb-4" key={event.id}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="mb-3">
                      {event.icon}
                    </div>
                    <Card.Title>{event.title}</Card.Title>
                    <div className="bg-success text-white my-2 py-1 rounded-pill w-50 mx-auto">
                      {event.date}
                    </div>
                    <Card.Text className="mt-3">
                      {event.description}
                    </Card.Text>
                    <div className="d-flex justify-content-center align-items-center mt-2">
                      <FaMapMarkerAlt className="me-2 text-danger" />
                      <span>{event.place}</span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-2">
                      <FaClock className="me-2 text-primary" />
                      <span>{event.time}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Previous Events Section */}
      <section className="previous-events py-5">
        <Container>
          <h2 className="text-center mb-5">Past Events</h2>
          <Row>
            {previousEvents.map(event => (
              <Col lg={4} md={6} className="mb-4" key={event.id}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <Card.Title className="mb-3 text-center">{event.title}</Card.Title>
                    
                    <div className="event-details">
                      <div className="d-flex align-items-center mb-2">
                        <FaCalendar className="me-2 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      
                      <div className="d-flex align-items-center mb-2">
                        <FaClock className="me-2 text-success" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="d-flex align-items-center mb-3">
                        <FaMapMarkerAlt className="me-2 text-danger" />
                        <span>{event.place}</span>
                      </div>
                      
                      <p className="text-muted">{event.description}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>


      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Econnect;