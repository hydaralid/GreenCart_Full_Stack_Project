import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Navbar, Nav, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Search, Facebook, Twitter, Instagram, Linkedin, Plus, Dash } from 'react-bootstrap-icons';
import Header from './Header';
import toothbrush from './/images/toothbrush.jpg';
import straws from './/images/straws.jpg';
import Compostableplates from './/images/Compostableplates.jpg';
import Garbagebags from './/images/Garbagebags.jpg';
import Cocopeat from './/images/Cocopeat.jpg';
import Ceramicplants from './/images/Ceramicplants.jpg';
import Philodendron from './/images/Philodendron.jpg';
import Snakeplant from './/images/Snakeplant.jpg';
import Succulents from './/images/Succulents.jpg';
import ZZplant from './/images/ZZplant.jpg';
import Paperplates from './/images/Paperplates.jpg';
import pots from './/images/pots.jpg';
import Shop from './Shop';

const products = [
  { id: 1, name: "Bamboo Tooth Brush", price: 89, image: toothbrush, description: "Finest bamboo, solid round frame", category: "Bathroom", material: "Wood", brand: "Prakritik" },
  { id: 2, name: "Biodegradable Pots", price: 199, image: pots, description: "Essential oil diffuser, long-lasting", category: "Living Room", material: "Fabric", brand: "Nutri org" },
  { id: 3, name: "Bamboo straws", price: 39, image: straws, description: "Eco-friendly set, 150 pack, biodegradable", category: "Kitchen", material: "Wood", brand: "Prakritik" },
  { id: 4, name: "Air purifying plant-snake plant", price: 599, image: Snakeplant, description: "Natural air purifier, low maintenance", category: "Living Room", material: "Fabric", brand: "ITC" },
  { id: 5, name: "Low-maintenance plant-ZZ plant", price: 199, image: ZZplant, description: "Drought-tolerant, ideal for beginners", category: "Office", material: "Fabric", brand: "ITC" },
  { id: 6, name: "Succulents", price: 159, image: Succulents, description: "Variety pack, 5 small decorative plants", category: "Outdoor", material: "Fabric", brand: "Nutri org" },
  { id: 7, name: "Philodendron", price: 245, image: Philodendron , description: "Fast-growing vine, heart-shaped leaves", category: "Living Room", material: "Fabric", brand: "ITC" },
  { id: 8, name: "Ceramic-planters", price: 110, image: Ceramicplants, description: "Handcrafted design, drainage holes", category: "Living Room", material: "Metal", brand: "TATA" },
  { id: 9, name: "Cocopeat", price: 340, image: Cocopeat, description: "Organic growing medium, 5kg block", category: "Outdoor", material: "Fabric", brand: "Nutri org" },
  { id: 10, name: "Biodegradable Paper Plates", price: 160, image: Paperplates, description: "Nutrient-rich, 100% natural, 2kg pack", category: "Outdoor", material: "Fabric", brand: "Prakritik" },
  { id: 11, name: "Biodegradable garbage bags", price: 75, image: Garbagebags, description: "Eco-friendly, 30 bags per roll", category: "Bedroom", material: "Fabric", brand: "TATA" },
  { id: 12, name: "Compostable-plates", price: 50, image: Compostableplates, description:"Plant-based, microwave safe, 25 pieces", category: "Kitchen", material: "Wood", brand: "Prakritik" },
];

const Shopdemo = () => {
  const [show, setShow] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [quantities, setQuantities] = useState({});
  
  // Filter states
  const [priceRange, setPriceRange] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  
  // Initialize quantities for all products
  useEffect(() => {
    const initialQuantities = {};
    products.forEach(product => {
      initialQuantities[product.id] = 1;
    });
    setQuantities(initialQuantities);
  }, []);
  
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
  
  // Increment quantity
  const incrementQuantity = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };
  
  // Decrement quantity
  const decrementQuantity = (productId) => {
    if (quantities[productId] > 1) {
      setQuantities(prev => ({
        ...prev,
        [productId]: prev[productId] - 1
      }));
    }
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
  };
  
  // Handle category filter change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    }
  };
  
  // Handle material filter change
  const handleMaterialChange = (e) => {
    const material = e.target.value;
    if (e.target.checked) {
      setSelectedMaterials([...selectedMaterials, material]);
    } else {
      setSelectedMaterials(selectedMaterials.filter(item => item !== material));
    }
  };
  
  // Handle brand filter change
  const handleBrandChange = (e) => {
    const brand = e.target.value;
    if (e.target.checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(item => item !== brand));
    }
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
    
    // Reset form controls
    document.getElementById('filterForm').reset();
  };

  // Apply filters when filter state changes
  useEffect(() => {
    // Don't apply filters on initial render or filter reset
    if (searchTerm || priceRange || selectedCategories.length > 0 || 
        selectedMaterials.length > 0 || selectedBrands.length > 0) {
      applyFilters();
    }
  }, [searchTerm]); // Only trigger on search term change for real-time search

  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
  <div>
    <Header />
    <div style={{ backgroundColor: '#f0ffef', minHeight: '100vh' }}>
      {/* Main Content */}
      <Container>
        <Row>
          {/* Filters - Left Sidebar - FIXED POSITION */}
          <Col md={3} className="mb-4">
            <div className="bg-light rounded p-4" style={{
                backgroundColor: '#e6f7e6 !important',
                position: 'sticky',
                top: '20px',
                maxHeight: 'calc(100vh - 40px)',
                overflow: 'auto'
              }}>
              <Form id="filterForm">
                <h5 className="mb-3">Price</h5>
                <Form.Group>
                  <Form.Check
                    type="radio"
                    label="Upto 1k"
                    name="priceRange"
                    value="upto1k"
                    onChange={handlePriceRangeChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    label="Upto 2k"
                    name="priceRange"
                    value="upto2k"
                    onChange={handlePriceRangeChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    label="Upto 5k"
                    name="priceRange"
                    value="upto5k"
                    onChange={handlePriceRangeChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    label="Upto 10k"
                    name="priceRange"
                    value="upto10k"
                    onChange={handlePriceRangeChange}
                    className="mb-2"
                  />
                </Form.Group>

                <h5 className="mb-3 mt-4">Categories</h5>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Living Room"
                    value="Living Room"
                    onChange={handleCategoryChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Bedroom"
                    value="Bedroom"
                    onChange={handleCategoryChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Office"
                    value="Office"
                    onChange={handleCategoryChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Outdoor"
                    value="Outdoor"
                    onChange={handleCategoryChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Kitchen"
                    value="Kitchen"
                    onChange={handleCategoryChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Bathroom"
                    value="Bathroom"
                    onChange={handleCategoryChange}
                    className="mb-2"
                  />
                </Form.Group>

                <h5 className="mb-3 mt-4">Material</h5>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Wood"
                    value="Wood"
                    onChange={handleMaterialChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Metal"
                    value="Metal"
                    onChange={handleMaterialChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Fabric"
                    value="Fabric"
                    onChange={handleMaterialChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Leather"
                    value="Leather"
                    onChange={handleMaterialChange}
                    className="mb-2"
                  />
                </Form.Group>

                <h5 className="mb-3 mt-4">Brand</h5>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="ITC"
                    value="ITC"
                    onChange={handleBrandChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Nutri org"
                    value="Nutri org"
                    onChange={handleBrandChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Prakritik"
                    value="Prakritik"
                    onChange={handleBrandChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="TATA"
                    value="TATA"
    onChange={handleBrandChange}
    className="mb-2"
  />
                </Form.Group>

                <div className="d-flex justify-content-between mt-4">
                  <Button
                    variant="success"
                    className="w-75 me-2"
                    style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="w-25"
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            </div>
          </Col>

          {/* Products */}
          <Col md={9}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 style={{ color: '#2e7d32' }}>Shop Here,</h4>
              <div className="bg-white rounded d-flex mt-3" style={{ width: '400px' }}>
                <Search size={20} className="mx-3 my-auto text-muted" />
                <Form.Control 
                  type="search" 
                  placeholder="Search" 
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="border-0" 
                  style={{ boxShadow: 'none' }} 
                />
                <Button 
                  variant="success" 
                  className="rounded-right" 
                  style={{ borderRadius: '0 4px 4px 0' }}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Product count and filter indicators */}
            <div className="mb-3">
              <p className="text-muted">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                {searchTerm && <span className="ms-2">for "{searchTerm}"</span>}
              </p>
              
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
            <Row className="g-4">
  {filteredProducts.map((product) => (
    <Col key={product.id} xs={12} sm={6} md={6} lg={4}>
      <Card
        className="h-100 shadow-sm border-0"
        style={{ borderRadius: '10px', overflow: 'hidden' }}
      >
        <div style={{ height: '180px', overflow: 'hidden' }}>
          <a href={`/ProductDetails/${product.id}`}>
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

      <Shop />


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
                  <div className="d-flex align-items-center" style={{ width: '60%' }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }}
                    />
                    <span className="text-truncate">{item.name}</span>
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
                  <span>₹{item.totalPrice}</span>
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
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
  <Button
    variant="success"
    style={{ backgroundColor: '#4caf50', borderColor: '#4caf50' }}
    disabled={cart.length === 0}
    onClick={() => {
      // Save cart items and total to localStorage before navigating
      localStorage.setItem('cartItems', JSON.stringify(cart));
      localStorage.setItem('cartTotal', cartTotal.toString());
      
      // Navigate to Payment page
      window.location.href = '/Payment';
    }}
  >
    Checkout
  </Button>
</Modal.Footer>
      </Modal>

    </div>
  </div>
  );
};

export default Shopdemo;