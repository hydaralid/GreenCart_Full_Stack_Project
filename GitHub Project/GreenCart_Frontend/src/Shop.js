import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Navbar, Nav, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Search, Facebook, Twitter, Instagram, Linkedin, Plus, Dash } from 'react-bootstrap-icons';
import Header from './Header';
import Footer from './Footer';


const Shop = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Filter states
  const [priceRange, setPriceRange] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/products/fetch', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const fetchedProducts = await response.json();
        
        // Set products and initialize filtered products
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);

        // Initialize quantities for each product individually
        const initialQuantities = fetchedProducts.reduce((acc, product) => {
          acc[product.id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id];
    const itemToAdd = {
      ...product,
      quantity: quantity,
      totalPrice: product.price * quantity
    };

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      updatedCart[existingItemIndex].totalPrice = updatedCart[existingItemIndex].price * updatedCart[existingItemIndex].quantity;
      setCart(updatedCart);
    } else {
      // Add new item
      setCart([...cart, itemToAdd]);
    }

    setShow(true);
  };

  const handleClose = () => setShow(false);

  // Increment quantity for a specific product
  const incrementQuantity = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };

  // Decrement quantity for a specific product
  const decrementQuantity = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) - 1, 1)
    }));
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update cart item quantity
  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: item.price * newQuantity
        };
      }
      return item;
    });

    setCart(updatedCart);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    applyFilters();
  };

  // Handle price range filter change
  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
    applyFilters();
  };

  // Handle category filter change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const updatedCategories = e.target.checked
      ? [...selectedCategories, category]
      : selectedCategories.filter(item => item !== category);
    
    setSelectedCategories(updatedCategories);
    applyFilters();
  };

  // Handle material filter change
  const handleMaterialChange = (e) => {
    const material = e.target.value;
    const updatedMaterials = e.target.checked
      ? [...selectedMaterials, material]
      : selectedMaterials.filter(item => item !== material);
    
    setSelectedMaterials(updatedMaterials);
    applyFilters();
  };

  // Handle brand filter change
  const handleBrandChange = (e) => {
    const brand = e.target.value;
    const updatedBrands = e.target.checked
      ? [...selectedBrands, brand]
      : selectedBrands.filter(item => item !== brand);
    
    setSelectedBrands(updatedBrands);
    applyFilters();
  };

  // Apply all filters
  const applyFilters = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply price range filter
    if (priceRange) {
      switch(priceRange) {
        case 'upto1k':
          filtered = filtered.filter(product => product.price <= 1000);
          break;
        case 'upto2k':
          filtered = filtered.filter(product => product.price <= 2000);
          break;
        case 'upto5k':
          filtered = filtered.filter(product => product.price <= 5000);
          break;
        case 'upto10k':
          filtered = filtered.filter(product => product.price <= 10000);
          break;
        default:
          break;
      }
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    // Apply material filter
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(product => selectedMaterials.includes(product.material));
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }

    setFilteredProducts(filtered);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange('');
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setSelectedBrands([]);
    setFilteredProducts(products);
  };

  // Calculate cart total


  const [cart, setCart] = useState([]);
const shippingCost = 49;
const taxRate = 0.18;

const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
const cartTax = cartSubtotal * taxRate;
const cartTotal = cartSubtotal + cartTax + shippingCost;


  return (
  <div>
    <div style={{ backgroundColor: '#f0ffef', minHeight: '100vh' }}>
      {/* Main Content */}
      <Container>
        <Row>
          {/* Filters - Left Sidebar - FIXED POSITION */}

          {/* Products */}
          <Col md={12}>
            {/* Product count and filter indicators */}
            <div className="mb-3">
              {/* Active filters display */}
              {(priceRange || selectedCategories.length > 0 || selectedMaterials.length > 0 || selectedBrands.length > 0) && (
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {priceRange && (
                    <span className="badge bg-light text-dark border">
                      {priceRange === 'upto1k' && 'Price: Up to 1k'}
                      {priceRange === 'upto2k' && 'Price: Up to 2k'}
                      {priceRange === 'upto5k' && 'Price: Up to 5k'}
                      {priceRange === 'upto10k' && 'Price: Up to 10k'}
                      <button
                        className="btn-close btn-close-sm ms-1"
                        style={{ fontSize: '0.6rem' }}
                        onClick={() => {
                          setPriceRange('');
                          applyFilters();
                        }}
                      ></button>
                    </span>
                  )}

                  {selectedCategories.map(category => (
                    <span key={category} className="badge bg-light text-dark border">
                      Category: {category}
                      <button
                        className="btn-close btn-close-sm ms-1"
                        style={{ fontSize: '0.6rem' }}
                        onClick={() => {
                          setSelectedCategories(selectedCategories.filter(c => c !== category));
                          applyFilters();
                        }}
                      ></button>
                    </span>
                  ))}

                  {selectedMaterials.map(material => (
                    <span key={material} className="badge bg-light text-dark border">
                      Material: {material}
                      <button
                        className="btn-close btn-close-sm ms-1"
                        style={{ fontSize: '0.6rem' }}
                        onClick={() => {
                          setSelectedMaterials(selectedMaterials.filter(m => m !== material));
                          applyFilters();
                        }}
                      ></button>
                    </span>
                  ))}

                  {selectedBrands.map(brand => (
                    <span key={brand} className="badge bg-light text-dark border">
                      Brand: {brand}
                      <button
                        className="btn-close btn-close-sm ms-1"
                        style={{ fontSize: '0.6rem' }}
                        onClick={() => {
                          setSelectedBrands(selectedBrands.filter(b => b !== brand));
                          applyFilters();
                        }}
                      ></button>
                    </span>
                  ))}

                  <span
                    className="badge bg-danger text-white cursor-pointer"
                    onClick={resetFilters}
                    style={{ cursor: 'pointer' }}
                  >
                    Clear All Filters
                  </span>
                </div>
              )}
            </div>

            {/* No products found message */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-5">
                <h5>No products found</h5>
                <p className="text-muted">Try adjusting your search or filter criteria</p>
                <Button variant="outline-success" onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}

            {/* Product section */}
            {/* manual product section */}
            
            <Row className="g-4 mb-5 mt-3">
            {filteredProducts.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={6} lg={4}>
                <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ height: '180px', overflow: 'hidden' }}>
                      <a>
                        <Card.Img
                          variant="top"
                          src={product.image}
                          style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </a>
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title style={{ fontSize: '1rem', fontWeight: 'bold' }}>{product.name}</Card.Title>
                      <Card.Text style={{ fontSize: '0.8rem', color: '#666' }}>
                        {product.description}
                      </Card.Text>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold" style={{ color: '#2e7d32' }}>₹{product.price}</span>


                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="p-1"
                      onClick={() => decrementQuantity(product.id)}
                      aria-label="Decrease quantity"
                    >
                      <Dash size={16} />
                    </Button>
                    <span className="mx-2">{quantities[product.id] || 1}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="p-1"
                      onClick={() => incrementQuantity(product.id)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
                        <div className="mt-2 d-flex justify-content-between align-items-center">
                          <small className="text-muted">
                            {product.category} • {product.brand}
                          </small>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            style={{ fontSize: '0.8rem', borderColor: '#4caf50', color: '#4caf50' }}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>



          </Col>
        </Row>
      </Container>

      {/* Cart Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>


        <Modal.Body>
        {cart.length === 0 ? (
  <p className="text-center">Your cart is empty</p>
) : (
  <>
    {cart.map((item, index) => (
      <div key={index} className="d-flex justify-content-between mb-3 align-items-center">
        <div className="d-flex flex-column" style={{ width: '50%' }}>
          <span className="text-truncate fw-bold">{item.name}</span>
          <small className="text-muted">₹{item.price} each</small>
        </div>
        <div className="d-flex align-items-center">
          <Button
            variant="outline-secondary"
            size="sm"
            className="p-0"
            style={{ width: '24px', height: '24px' }}
            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Dash size={12} />
          </Button>
          <span className="mx-2">{item.quantity}</span>
          <Button
            variant="outline-secondary"
            size="sm"
            className="p-0"
            style={{ width: '24px', height: '24px' }}
            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
          >
            <Plus size={12} />
          </Button>
        </div>
        <span className="fw-bold">₹{item.price * item.quantity}</span>
        <Button
          variant="link"
          className="text-danger p-0 ms-2"
          onClick={() => removeFromCart(item.id)}
        >
          ×
        </Button>
      </div>
    ))}
    <hr />
    <div className="d-flex justify-content-between fw-bold mt-2">
      <span>Total</span>
      <span>₹{cartSubtotal}</span>
    </div>
  </>
)}
        </Modal.Body>

        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
            <a href='Payment'>
            <Button
              variant="success"
                style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}
                disabled={cart.length === 0}
            >
              Checkout
            </Button></a>
        </Modal.Footer>
      </Modal>

    </div>
    <Footer />
    
   
  </div>
  );
};



export default Shop;