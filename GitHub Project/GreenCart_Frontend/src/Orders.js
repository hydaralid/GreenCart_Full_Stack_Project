import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Badge, ProgressBar } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

// Mock location data for simulating dynamic tracking
const MOCK_LOCATIONS = {
  'New York': { 
    trackingSpeed: 1.2,  // faster progress
    additionalDelays: ['Traffic', 'Weather Conditions']
  },
  'Rural Area': { 
    trackingSpeed: 0.8,  // slower progress
    additionalDelays: ['Limited Transportation']
  },
  'Metropolitan Area': { 
    trackingSpeed: 10,  // very fast progress
    additionalDelays: ['High Efficiency']
  }
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // [Rest of the code remains the same until the useEffect]
    // Detailed order status progression with cumulative durations
    const orderStatusProgression = [
      { 
        status: 'Pending', 
        duration: 0 * 0 * 30 * 1000,  // 2 hours
        progressStep: 0 
      },
      { 
        status: 'Processing', 
        duration: 0.5 * 60 * 60 * 1000,  // 4 hours
        progressStep: 25 
      },
      { 
        status: 'Shipped', 
        duration: 1 * 60 * 30 * 1000,  // 12 hours
        progressStep: 50 
      },
      { 
        status: 'Out for Delivery', 
        duration: 0 * 3 * 60 * 1000,  // 6 hours
        progressStep: 75 
      },
      { 
        status: 'Delivered', 
        duration: 0 * 4 * 60 * 1000,  // Final state
        progressStep: 100 
      }
    ];

  useEffect(() => {
    // Retrieve order history from local storage
    const storedOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    
    // Update orders with dynamic progress
    const updatedOrders = storedOrders.map(order => {
      // Calculate progress based on time and location
      const locationData = MOCK_LOCATIONS[order.shippingAddress.state] || MOCK_LOCATIONS['Rural Area'];
      return {
        ...order,
        dynamicProgress: calculateDynamicProgress(order, locationData)
      };
    });

    setOrders(updatedOrders.sort((a, b) => new Date(b.date) - new Date(a.date)));

    // Set up interval to update progress
    const progressInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(progressInterval);
  }, []);

  // [Rest of the code remains the same]
  // Accurately calculate dynamic progress
  const calculateDynamicProgress = (order, locationData) => {
    const orderDate = new Date(order.date);
    const timeSinceOrder = currentTime.getTime() - orderDate.getTime();

    // Calculate cumulative duration for each status
    let cumulativeDuration = 0;
    let currentStatus = 'Pending';
    let currentProgressStep = 0;

    for (const stage of orderStatusProgression) {
      cumulativeDuration += stage.duration;
      
      if (timeSinceOrder < cumulativeDuration) {
        currentStatus = stage.status;
        currentProgressStep = stage.progressStep;
        break;
      }
    }

    // If order is past all stages, set to Delivered
    if (currentStatus === 'Pending' && timeSinceOrder > orderStatusProgression.reduce((sum, stage) => sum + stage.duration, 0)) {
      currentStatus = 'Delivered';
      currentProgressStep = 100;
    }

    // Adjust progress based on location and time within current stage
    const locationMultiplier = locationData.trackingSpeed;
    const stageStartTime = orderDate.getTime() + orderStatusProgression
      .slice(0, orderStatusProgression.findIndex(s => s.status === currentStatus))
      .reduce((sum, stage) => sum + stage.duration, 0);

    const timeInCurrentStage = currentTime.getTime() - stageStartTime;
    const stageIndex = orderStatusProgression.findIndex(s => s.status === currentStatus);
    const currentStageDuration = orderStatusProgression[stageIndex].duration;

    // Calculate progress within the current stage
    const stageProgress = currentStageDuration > 0 
      ? Math.min(100, (timeInCurrentStage / currentStageDuration) * 25 + currentProgressStep)
      : 100;

    // Apply location and random variability
    const finalProgress = Math.min(
      100, 
      stageProgress * locationData.trackingSpeed + (Math.random() * 5)
    );

    return finalProgress;
  };

  // Function to get badge color based on order status
  const getStatusVariant = (status) => {
    const variantMap = {
      'Delivered': 'success',
      'Processing': 'warning',
      'Shipped': 'info',
      'Out for Delivery': 'primary',
      'Cancelled': 'danger',
      'Pending': 'secondary'
    };
    return variantMap[status] || 'secondary';
  };


  return (
    <div>
      <Header />
    <Container className="mt-5">
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <Card>
          <Card.Body className="text-center">
            <p>You have no order history.</p>
          </Card.Body>
        </Card>
      ) : (
        orders.map((order, orderIndex) => (
          <Card key={order.id} className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Order #{order.id}</strong>
                <span className="ml-3 text-muted">
                  {new Date(order.date).toLocaleString()}
                </span>
              </div>
              <Badge variant={getStatusVariant(order.status)}>
                {order.status}
              </Badge>
            </Card.Header>
            <Card.Body>
              {/* [Rest of the Card.Body remains the same] */}
               {/* Dynamic Order Tracking Progress Bar */}
               <div className="mb-3">
                <ProgressBar 
                  now={order.dynamicProgress || 0} 
                  variant={getStatusVariant(order.status)}
                  label={`${order.status}`}
                />
                <div className="d-flex justify-content-between mt-2 text-muted">
                  <small>Pending</small>
                  <small>Processing</small>
                  <small>Shipped</small>
                  <small>Out for Delivery</small>
                  <small>Delivered</small>
                </div>
              </div>

              {/* Additional Location-based Insights */}
              {MOCK_LOCATIONS[order.shippingAddress.state]?.additionalDelays && (
                <div className="alert alert-info mt-3">
                  <strong>Location Insights:</strong>
                  <ul>
                    {MOCK_LOCATIONS[order.shippingAddress.state].additionalDelays.map((delay, index) => (
                      <li key={index}>{delay}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-3">
                <h6>Shipping Address</h6>
                <p>
                  {order.shippingAddress.name}<br />
                  {order.shippingAddress.street !== 'N/A' ? order.shippingAddress.street : 'N/A'}<br />
                  {order.shippingAddress.city !== 'N/A' ? `${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}` : 'No address provided'}
                </p>
              </div>

            </Card.Body>
          </Card>
        ))
      )}
    </Container>
      <Footer />
    </div>
  );
};

export default Orders;