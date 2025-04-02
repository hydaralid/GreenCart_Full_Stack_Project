import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./Footer";
import Header from "./Header";

function Sellproducts() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    about: "",
    description: ""
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadSuccess(false);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image) {
      alert("Please select an image first");
      return;
    }
  
    setIsSubmitting(true);
  
    const submitData = new FormData();
    submitData.append("image", image);
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "price") {
        submitData.append(key, parseFloat(value) || 0); // Ensure price is a number
      } else {
        submitData.append(key, value);
      }
    });
  
    try {
      const response = await fetch("http://localhost:8080/products/add", {
        method: "POST",
        body: submitData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.text();
      console.log("Form submitted successfully:", result);
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <div>
      <Header />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg={10} className="bg-light p-4 rounded shadow">
            <Row>
              <Col md={6}>
                <h5 className="mb-5 fw-bold">Add Your Product Here</h5>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-5">
                    <Form.Control 
                      type="text" 
                      name="name"
                      placeholder="Product Name" 
                      className="py-2"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-5">
                    <Form.Control 
                      type="text" 
                      name="brand"
                      placeholder="Brand Name" 
                      className="py-2"
                      value={formData.brand}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-5">
                    <Form.Control 
                      type="number" 
                      name="price"
                      placeholder="Price" 
                      className="py-2"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-5">
                    <Form.Control 
                      type="text" 
                      name="about"
                      placeholder="About Product" 
                      className="py-2"
                      value={formData.about}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Control 
                      as="textarea" 
                      name="description"
                      rows={3} 
                      placeholder="Description" 
                      className="py-2"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    variant="success" 
                    className="w-40 py-2 fw-bold mx-5"
                    style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
                    disabled={isSubmitting || !image}
                  >
                    {isSubmitting ? 'Submitting...' : 'Add Product'}
                  </Button>
                  {/* <Button 
                    type="submit" 
                    variant="danger" 
                    className="w-40 py-2 fw-bold mx-5"
                    style={{ backgroundColor: '#c22c17', borderColor: '#c22c17' }}
                    disabled={isSubmitting || !image}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete Product'}
                  </Button> */}
                  

                </Form>
              </Col>

              <Col md={6} className="text-center d-flex flex-column justify-content-center">
                <div className="position-relative mb-4" style={{ minHeight: "250px" }}>
                  <div className="border rounded p-3 shadow-sm" style={{ height: "500px", width: "100%", position: "relative", overflow: "hidden" }}>
                    {previewUrl ? (
                      <img 
                        src={previewUrl} 
                        alt="Product Preview" 
                        className="img-fluid"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    ) : (
                      <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-center">
                          <div className="rounded-circle border d-flex justify-content-center align-items-center mx-auto" style={{ width: "60px", height: "60px" }}>
                            <i className="bi bi-upload fs-4"></i>
                          </div>
                          <div className="mt-3">
                            <p className="text-muted">Upload product image</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {uploadSuccess && (
                      <div className="position-absolute top-0 end-0 bg-success text-white p-2 m-2 rounded-circle" style={{ width: "32px", height: "32px" }}>
                        <i className="bi bi-check"></i>
                      </div>
                    )}
                  </div>
                </div>

                <input 
                  type="file" 
                  id="imageInput" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="d-none" 
                />
                
                <div className="text-center mt-3">
                  <label htmlFor="imageInput" className="btn btn-outline-secondary btn-sm px-4 py-2 me-2 shadow-sm rounded-pill">
                    Select Image
                  </label>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
}

export default Sellproducts;