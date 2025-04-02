import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Footer from './Footer';

const Profile = () => {
  // State for form fields and UI
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [greeting, setGreeting] = useState('Hello');

  // Event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      fullName: '',
      email: '',
      phone: '',
      address: '',
    });
    setProfileImage(null);
    setGreeting('Hello');
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (formData.fullName) {
      setGreeting(`Hello, ${formData.fullName}`);
    }
    alert('Changes saved successfully!');
  };

  const handleCancel = () => {
    resetForm();
    alert('Changes cancelled');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      resetForm();
      alert('Account deleted successfully');
    }
  };

  const labelStyle = {
    textAlign: 'left',
    width: '100%',
    display: 'block'
  };

  return (
    <div>
            <Header />

    <Container className="py-5">
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <Row className="align-items-center mb-4">
            <Col xs={12} md={2} className="text-center">
              <div className="position-relative mb-3 mb-md-0">
                <div style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: '#e9ecef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  overflow: 'hidden'
                }}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span className="text-secondary">Upload Image</span>
                  )}
                </div>
                <input
                  type="file"
                  id="profileImageInput"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor="profileImageInput"
                  className="btn btn-sm btn-outline-secondary position-absolute"
                  style={{ bottom: '0', left: '50%', transform: 'translateX(-50%)' }}
                >
                  Change
                </label>
              </div>
            </Col>
            <Col xs={12} md={10} className="text-end">
              <h3 className="mb-0">{greeting}</h3>
            </Col>
          </Row>

          <Form onSubmit={handleSaveChanges}>
            {/* Username and Full Name */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Email and Phone */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label style={labelStyle}>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Address */}
            <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label style={labelStyle}>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                placeholder="Enter your address"
              />
            </Form.Group>
            </Col>

            <Row className="mt-4">
              <Col xs={12} md={6} className="d-flex gap-2">
                <Button
                  type="submit"
                  variant="warning"
                  style={{ backgroundColor: '#f90', border: 'none' }}
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Col>
              <Col xs={12} md={6} className="d-flex justify-content-md-end mt-3 mt-md-0">
                <Button
                  type="button"
                  variant="outline-danger"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
        <Footer />
    </div>  
  );
};

export default Profile;