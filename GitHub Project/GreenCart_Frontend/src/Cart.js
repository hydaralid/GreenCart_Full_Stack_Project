import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Dash, Plus, Trash } from 'react-bootstrap-icons';
import Header from './Header';
import Footer from './Footer';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      calculateTotal(parsedCart);
    }
  }, []);

  // Update localStorage and total whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    calculateTotal(cart);
  }, [cart]);

  // Calculate total amount
  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalAmount(total);
  };

  // Update cart item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      // Remove item if quantity becomes 0
      removeFromCart(productId);
      return;
    }

    const updatedCart = cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity }
        : item
    );

    setCart(updatedCart);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  return (
    <div>
      <Header />

    <div style={{ backgroundColor: '#f0ffef', minHeight: '100vh' }}>
      
      <Container className="py-5">
        <h2 className="mb-4" style={{ color: '#2e7d32' }}>Your Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center py-5">
            <h4>Your cart is empty</h4>
            <p>Explore our products and add some items to your cart!</p>
            <a href="/Shop" className="btn btn-success mt-3">Continue Shopping</a>
          </div>
        ) : (
          <Row>
            <Col md={8}>
              {cart.map((item) => (
                <Card key={item.id} className="mb-3 shadow-sm">
                  <Card.Body className="d-flex align-items-center">
                    <div style={{ width: '100px', height: '100px', marginRight: '20px' }}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          borderRadius: '8px' 
                        }} 
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h5>{item.name}</h5>
                      <p className="text-muted mb-2">{item.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Dash />
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus />
                          </Button>
                        </div>
                        <div>
                          <span className="fw-bold me-3">₹{item.price * item.quantity}</span>
                          <Button 
                            variant="outline-danger" 
                            size="sm" 
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Col>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h4>Order Summary</h4>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping</span>
                    <span>₹50</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold mb-3">
                    <span>Total</span>
                    <span>₹{totalAmount + 50}</span>
                  </div>
                  <a href="/Payment" className="btn btn-success w-100">
                    Proceed to Checkout
                  </a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
     
    </div>
    <Footer />
  </div>
  );
};

export default Cart;