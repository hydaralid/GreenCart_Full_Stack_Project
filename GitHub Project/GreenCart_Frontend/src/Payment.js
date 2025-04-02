import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

const Payment = () => {
  // Shipping Address State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  });
  const [addressValidated, setAddressValidated] = useState(false);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [paymentValidated, setPaymentValidated] = useState(false);

  // Cart State
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Alert State
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // List of Indian states
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 
    'Andaman and Nicobar Islands', 'Chandigarh', 
    'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 
    'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  // Handlers for Shipping Address
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  // Handlers for Payment
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setPaymentValidated(false);
  };

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Order Submission Handler
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const shippingForm = e.currentTarget;
    
    // Validate shipping address
    if (shippingForm.checkValidity() === false) {
      e.stopPropagation();
      setAddressValidated(true);
      return;
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(shippingAddress.phoneNumber)) {
      alert('Please enter a valid 10-digit Indian phone number');
      return;
    }

    // Validate postal code (6 digits)
    const postalCodeRegex = /^\d{6}$/;
    if (!postalCodeRegex.test(shippingAddress.postalCode)) {
      alert('Please enter a valid 6-digit postal code');
      return;
    }

    // If card payment is selected, validate card details
    if (paymentMethod === 'card') {
      const cardNumberRegex = /^[0-9]{16}$/;
      const cvvRegex = /^[0-9]{3}$/;
      const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;

      if (!cardNumberRegex.test(paymentDetails.cardNumber)) {
        alert('Please enter a valid 16-digit card number');
        return;
      }

      if (!cvvRegex.test(paymentDetails.cvv)) {
        alert('Please enter a valid 3-digit CVV');
        return;
      }

      if (!expiryRegex.test(paymentDetails.expiryDate)) {
        alert('Please enter a valid expiry date (MM/YY)');
        return;
      }
    }

    // If all validations pass
    try {
      // Generate a consistent order ID
      const newOrderId = Math.floor(Math.random() * 1000000);

      // Create order object
      const newOrder = {
        id: newOrderId,
        date: new Date().toISOString(),
        status: 'Processing',
        paymentMethod: paymentMethod,
        items: cartItems,
        total: cartTotal,
        shippingAddress: shippingAddress
      };

      // Retrieve existing order history or create new array
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      
      // Add new order to history
      orderHistory.push(newOrder);
      
      // Save updated order history
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      
      // Clear cart and reset form
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartTotal');
      setCartItems([]);
      setCartTotal(0);
      setSubmitSuccess(true);
      setSubmitError(null);
      setOrderId(newOrderId);
      
      console.log('Order placed with ID: ', newOrderId);
    } catch (error) {
      setSubmitError('Failed to process order. Please try again.');
      setSubmitSuccess(false);
    }
  };

// Retrieve cart data on component mount
useEffect(() => {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const storedCartTotal = localStorage.getItem('cartTotal') || 0;

  setCartItems(storedCartItems);
  setCartTotal(Number(storedCartTotal));
}, []);

  return (
    <div>
      <Header />

    <Container className="mt-4">
      <Form noValidate validated={addressValidated} onSubmit={handleOrderSubmit}>
        {/* [Rest of the form remains the same] */}
        {/* Shipping Address Section */}
        <Card className="mb-4">
          <Card.Header>
            <h4>Shipping Address</h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Form.Group as={Col} md="6" controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleAddressChange}
                  placeholder="Enter full name"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid full name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  name="phoneNumber"
                  value={shippingAddress.phoneNumber}
                  onChange={handleAddressChange}
                  placeholder="10-digit mobile number"
                  pattern="[6-9]\d{9}"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid 10-digit Indian phone number.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mt-3" controlId="streetAddress">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                required
                type="text"
                name="streetAddress"
                value={shippingAddress.streetAddress}
                onChange={handleAddressChange}
                placeholder="House/Flat No., Street, Area"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a street address.
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mt-3">
              <Form.Group as={Col} md="4" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  placeholder="Enter city"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a city name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleAddressChange}
                >
                  <option value="">Choose State</option>
                  {indianStates.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please select a state.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleAddressChange}
                  placeholder="6-digit postal code"
                  pattern="\d{6}"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid 6-digit postal code.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Card.Body>
        </Card>

        {/* Cart Details Section */}
        <Card className="mb-4">
          <Card.Header>Order Summary</Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>₹{item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-right"><strong>Total</strong></td>
                  <td><strong>₹{cartTotal.toFixed(2)}</strong></td>
                </tr>
              </tfoot>
            </Table>
          </Card.Body>
        </Card>

        {/* Payment Method Section */}
        <Card className="mb-4">
          <Card.Header>Payment Method</Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Check 
                type="radio"
                id="cod-payment"
                name="paymentMethod"
                label="Cash on Delivery"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={handlePaymentMethodChange}
              />
              <Form.Check 
                type="radio"
                id="card-payment"
                name="paymentMethod"
                label="Credit/Debit Card"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={handlePaymentMethodChange}
              />
            </Form.Group>

            {paymentMethod === 'card' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Cardholder Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="cardName"
                    value={paymentDetails.cardName}
                    onChange={handlePaymentDetailsChange}
                    placeholder="Enter cardholder name" 
                    required 
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter cardholder name
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handlePaymentDetailsChange}
                    placeholder="Enter card number" 
                    pattern="[0-9]{16}"
                    required 
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid 16-digit card number
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="expiryDate"
                        value={paymentDetails.expiryDate}
                        onChange={handlePaymentDetailsChange}
                        placeholder="MM/YY" 
                        pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                        required 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter expiry date (MM/YY)
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handlePaymentDetailsChange}
                        placeholder="CVV" 
                        pattern="[0-9]{3}"
                        required 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter 3-digit CVV
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}

            <Button 
              variant="success" 
              type="submit" 
              className="w-100"
              disabled={cartItems.length === 0}
            >
              {paymentMethod === 'card' ? 'Pay Now' : 'Place Order'} (₹{cartTotal.toFixed(2)})
            </Button>
          </Card.Body>
        </Card>
      </Form>
      {/* Success and Error Alerts */}
      {submitSuccess && (
        <div className="alert alert-success mt-3">
          Order placed successfully! Order ID: {orderId}
        </div>
      )}
      {submitError && (
        <div className="alert alert-danger mt-3">
          {submitError}
        </div>
      )}
    </Container>
      <Footer />
    </div>
  );
};

export default Payment;