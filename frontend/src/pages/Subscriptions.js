import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, ListGroup, Badge, Alert, Spinner } from 'react-bootstrap';
import {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  pauseSubscription,
  resumeSubscription,
  deleteSubscription
} from '../services/subscriptionService';
import { getProducts } from '../services/productService';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    items: [],
    frequency: 'weekly',
    deliveryAddress: '',
    paymentMethod: 'credit-card'
  });

  useEffect(() => {
    loadSubscriptions();
    loadProducts();
  }, []);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await getSubscriptions();
      // Handle API response structure
      let subscriptionsData = [];
      if (response) {
        if (response.success && response.data && Array.isArray(response.data)) {
          subscriptionsData = response.data;
        } else if (response.data && Array.isArray(response.data)) {
          subscriptionsData = response.data;
        } else if (Array.isArray(response)) {
          subscriptionsData = response;
        }
      }
      setSubscriptions(subscriptionsData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      // Handle API response structure
      let productsData = [];
      if (response) {
        if (response.success && response.data && Array.isArray(response.data)) {
          productsData = response.data;
        } else if (response.data && Array.isArray(response.data)) {
          productsData = response.data;
        } else if (Array.isArray(response)) {
          productsData = response;
        }
      }
      setProducts(productsData);
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  };

  const handleCreateSubscription = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await createSubscription(formData);
      setSuccess('Subscription created successfully!');
      setShowCreateModal(false);
      setFormData({ items: [], frequency: 'weekly', deliveryAddress: '', paymentMethod: 'credit-card' });
      loadSubscriptions();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create subscription');
    }
  };

  const handleUpdateSubscription = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await updateSubscription(currentSubscription._id, formData);
      setSuccess('Subscription updated successfully!');
      setShowEditModal(false);
      setFormData({ items: [], frequency: 'weekly', deliveryAddress: '', paymentMethod: 'credit-card' });
      setCurrentSubscription(null);
      loadSubscriptions();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update subscription');
    }
  };

  const handlePauseSubscription = async (id) => {
    try {
      await pauseSubscription(id);
      setSuccess('Subscription paused successfully!');
      loadSubscriptions();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to pause subscription');
    }
  };

  const handleResumeSubscription = async (id) => {
    try {
      await resumeSubscription(id);
      setSuccess('Subscription resumed successfully!');
      loadSubscriptions();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resume subscription');
    }
  };

  const handleDeleteSubscription = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await deleteSubscription(id);
        setSuccess('Subscription deleted successfully!');
        loadSubscriptions();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete subscription');
      }
    }
  };

  const openEditModal = (subscription) => {
    setCurrentSubscription(subscription);
    setFormData({
      items: subscription.items,
      frequency: subscription.frequency,
      deliveryAddress: subscription.deliveryAddress,
      paymentMethod: subscription.paymentMethod
    });
    setShowEditModal(true);
  };

  const openViewModal = (subscription) => {
    setCurrentSubscription(subscription);
    setShowViewModal(true);
  };

  const addItemToSubscription = (productId) => {
    const existingItem = formData.items.find(item => item.productId === productId);
    
    if (existingItem) {
      setFormData({
        ...formData,
        items: formData.items.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      });
    } else {
      setFormData({
        ...formData,
        items: [...formData.items, { productId, quantity: 1 }]
      });
    }
  };

  const removeItemFromSubscription = (productId) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.productId !== productId)
    });
  };

  const updateItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItemFromSubscription(productId);
      return;
    }

    setFormData({
      ...formData,
      items: formData.items.map(item =>
        item.productId === productId
          ? { ...item, quantity: parseInt(quantity) }
          : item
      )
    });
  };

  const getProductName = (productId) => {
    const product = products.find(p => p._id === productId);
    return product ? product.name : 'Unknown Product';
  };

  const calculateSubscriptionTotal = (items) => {
    return items.reduce((total, item) => {
      const product = products.find(p => p._id === (item.productId._id || item.productId));
      if (product) {
        const price = product.storePrices && product.storePrices.length > 0
          ? Math.min(...product.storePrices.filter(sp => sp.availability).map(sp => sp.price))
          : product.basePrice;
        return total + (price * item.quantity);
      }
      return total;
    }, 0);
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'success',
      paused: 'warning',
      cancelled: 'danger'
    };
    return badges[status] || 'secondary';
  };

  const getFrequencyLabel = (frequency) => {
    const labels = {
      weekly: 'Weekly',
      biweekly: 'Bi-weekly',
      monthly: 'Monthly'
    };
    return labels[frequency] || frequency;
  };

  if (loading) {
    return (
      <Container className="my-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5 fade-in">
      <Row className="mb-4">
        <Col>
          <h2 className="text-white">🔄 Subscriptions</h2>
          <p className="text-muted">Manage your recurring grocery deliveries</p>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setShowCreateModal(true)} className="glow-effect">
            ➕ Create Subscription
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      {subscriptions.length === 0 ? (
        <Alert variant="info">
          No subscriptions yet. Create your first subscription for automatic grocery deliveries!
        </Alert>
      ) : (
        <Row>
          {subscriptions.map((subscription) => (
            <Col key={subscription._id} md={6} lg={4} className="mb-4">
              <Card className="glow-effect" style={{ animationDelay: `${subscription._id % 3 * 0.2}s` }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <Badge bg={getStatusBadge(subscription.status)} className="p-2">
                      {subscription.status.toUpperCase()}
                    </Badge>
                    <Badge bg="info" className="p-2">{getFrequencyLabel(subscription.frequency)}</Badge>
                  </div>
                  <Card.Title className="mb-3 text-white">
                    <span className="floating-icon" style={{ animationDelay: `${subscription._id % 3 * 0.5}s` }}>📦</span> {subscription.items.length} items
                  </Card.Title>
                  <Card.Text>
                    <small className="text-muted">
                      <strong>📅 Next Delivery:</strong><br />
                      {subscription.nextDelivery ? new Date(subscription.nextDelivery).toLocaleDateString() : 'N/A'}
                    </small>
                  </Card.Text>
                  <Card.Text>
                    <small className="text-muted">
                      <strong>💰 Total:</strong> ${calculateSubscriptionTotal(subscription.items).toFixed(2)}
                    </small>
                  </Card.Text>
                  <div className="d-grid gap-2 mt-3">
                    <Button variant="outline-primary" size="sm" onClick={() => openViewModal(subscription)} className="glow-effect">
                      👁️ View Details
                    </Button>
                    {subscription.status === 'active' ? (
                      <Button variant="outline-warning" size="sm" onClick={() => handlePauseSubscription(subscription._id)}>
                        ⏸️ Pause
                      </Button>
                    ) : subscription.status === 'paused' ? (
                      <Button variant="outline-success" size="sm" onClick={() => handleResumeSubscription(subscription._id)}>
                        ▶️ Resume
                      </Button>
                    ) : null}
                    <Button variant="outline-secondary" size="sm" onClick={() => openEditModal(subscription)}>
                      ✏️ Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteSubscription(subscription._id)}>
                      🗑️ Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateSubscription}>
            <Form.Group className="mb-3">
              <Form.Label>Delivery Frequency</Form.Label>
              <Form.Select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                required
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                required
                placeholder="Enter your delivery address"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                required
              >
                <option value="credit-card">Credit Card</option>
                <option value="debit-card">Debit Card</option>
                <option value="paypal">PayPal</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Add Products</Form.Label>
              <Form.Select onChange={(e) => e.target.value && addItemToSubscription(e.target.value)}>
                <option value="">Select a product to add...</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} - ${product.basePrice}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {formData.items.length > 0 && (
              <div className="mb-3">
                <h6>Selected Items:</h6>
                <ListGroup>
                  {formData.items.map((item) => (
                    <ListGroup.Item key={item.productId} className="d-flex justify-content-between align-items-center">
                      <span>{getProductName(item.productId)}</span>
                      <div className="d-flex align-items-center gap-2">
                        <Form.Control
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItemQuantity(item.productId, e.target.value)}
                          style={{ width: '80px' }}
                          min="1"
                        />
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeItemFromSubscription(item.productId)}
                        >
                          Remove
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <div className="mt-2">
                  <strong>Total per delivery: ${calculateSubscriptionTotal(formData.items).toFixed(2)}</strong>
                </div>
              </div>
            )}

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" disabled={formData.items.length === 0}>
                Create Subscription
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubscription}>
            <Form.Group className="mb-3">
              <Form.Label>Delivery Frequency</Form.Label>
              <Form.Select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                required
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                required
              >
                <option value="credit-card">Credit Card</option>
                <option value="debit-card">Debit Card</option>
                <option value="paypal">PayPal</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Add Products</Form.Label>
              <Form.Select onChange={(e) => e.target.value && addItemToSubscription(e.target.value)}>
                <option value="">Select a product to add...</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} - ${product.basePrice}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {formData.items.length > 0 && (
              <div className="mb-3">
                <h6>Items in Subscription:</h6>
                <ListGroup>
                  {formData.items.map((item) => {
                    const itemId = item.productId._id || item.productId;
                    return (
                      <ListGroup.Item key={itemId} className="d-flex justify-content-between align-items-center">
                        <span>{getProductName(itemId)}</span>
                        <div className="d-flex align-items-center gap-2">
                          <Form.Control
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItemQuantity(itemId, e.target.value)}
                            style={{ width: '80px' }}
                            min="1"
                          />
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeItemFromSubscription(itemId)}
                          >
                            Remove
                          </Button>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </div>
            )}

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Update Subscription
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Subscription Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentSubscription && (
            <>
              <Row className="mb-3">
                <Col>
                  <strong>Status:</strong>{' '}
                  <Badge bg={getStatusBadge(currentSubscription.status)}>
                    {currentSubscription.status.toUpperCase()}
                  </Badge>
                </Col>
                <Col>
                  <strong>Frequency:</strong>{' '}
                  {getFrequencyLabel(currentSubscription.frequency)}
                </Col>
              </Row>

              <div className="mb-3">
                <strong>Next Delivery:</strong>{' '}
                {currentSubscription.nextDelivery ? new Date(currentSubscription.nextDelivery).toLocaleDateString() : 'N/A'}
              </div>

              <div className="mb-3">
                <strong>Delivery Address:</strong>
                <p>{currentSubscription.deliveryAddress}</p>
              </div>

              <div className="mb-3">
                <strong>Payment Method:</strong> {currentSubscription.paymentMethod}
              </div>

              <h6 className="mt-4">Items:</h6>
              {currentSubscription.items.length === 0 ? (
                <Alert variant="info">No items in this subscription</Alert>
              ) : (
                <>
                  <ListGroup className="mb-3">
                    {currentSubscription.items.map((item) => {
                      const product = products.find(p => p._id === (item.productId._id || item.productId));
                      const price = product
                        ? (product.storePrices && product.storePrices.length > 0
                          ? Math.min(...product.storePrices.filter(sp => sp.availability).map(sp => sp.price))
                          : product.basePrice)
                        : 0;

                      return (
                        <ListGroup.Item key={item._id} className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{item.productId?.name || getProductName(item.productId)}</strong>
                            <br />
                            <small className="text-muted">Quantity: {item.quantity}</small>
                          </div>
                          <Badge bg="primary">${(price * item.quantity).toFixed(2)}</Badge>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                  <div className="text-end">
                    <strong>Total per delivery: ${calculateSubscriptionTotal(currentSubscription.items).toFixed(2)}</strong>
                  </div>
                </>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Subscriptions;

