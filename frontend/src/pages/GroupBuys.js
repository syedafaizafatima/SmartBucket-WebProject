import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Form, Badge, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getGroupBuys, createGroupBuy } from '../services/groupBuyService';
import { getProducts } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import GroupBuyCard from '../components/groupBuy/GroupBuyCard';

const GroupBuys = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [groupBuys, setGroupBuys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    product: '',
    title: '',
    description: '',
    targetQuantity: 5,
    originalPrice: '',
    groupPrice: '',
    expiresAt: '',
    deliveryDate: '',
    deliveryAddress: '',
    paymentMethod: 'cash'
  });

  const [filter, setFilter] = useState('active');

  useEffect(() => {
    loadGroupBuys();
    loadProducts();
  }, [filter]);

  const loadGroupBuys = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getGroupBuys({ status: filter });
      setGroupBuys(response.data.data || []);
    } catch (err) {
      setError('Failed to load group buys');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data || []);
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductSelect = (e) => {
    const productId = e.target.value;
    const selectedProduct = products.find(p => p._id === productId);
    
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        product: productId,
        originalPrice: selectedProduct.basePrice || '',
        title: `Group Buy: ${selectedProduct.name}`
      }));
    }
  };

  const handleCreateGroupBuy = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to create a group buy');
      return;
    }

    try {
      await createGroupBuy(formData);
      setShowCreateModal(false);
      setFormData({
        product: '',
        title: '',
        description: '',
        targetQuantity: 5,
        originalPrice: '',
        groupPrice: '',
        expiresAt: '',
        deliveryDate: '',
        deliveryAddress: '',
        paymentMethod: 'cash'
      });
      loadGroupBuys();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create group buy');
    }
  };

  // Get minimum date for date inputs (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h2>Group Buying</h2>
          <p className="text-muted">
            Team up with others to get better prices on bulk purchases!
          </p>
        </Col>
        <Col xs="auto">
          {user && (
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              + Create Group Buy
            </Button>
          )}
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Form.Group>
            <Form.Label>Filter by Status</Form.Label>
            <div className="d-flex gap-2">
              <Badge
                bg={filter === 'active' ? 'primary' : 'secondary'}
                style={{ cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                onClick={() => setFilter('active')}
              >
                Active
              </Badge>
              <Badge
                bg={filter === 'completed' ? 'primary' : 'secondary'}
                style={{ cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                onClick={() => setFilter('completed')}
              >
                Completed
              </Badge>
              <Badge
                bg={filter === 'expired' ? 'primary' : 'secondary'}
                style={{ cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                onClick={() => setFilter('expired')}
              >
                Expired
              </Badge>
            </div>
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Group Buys Grid */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : groupBuys.length === 0 ? (
        <Alert variant="info">
          No group buys found. {user && 'Create one to get started!'}
        </Alert>
      ) : (
        <Row>
          {groupBuys.map((groupBuy) => (
            <Col key={groupBuy._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <GroupBuyCard groupBuy={groupBuy} />
            </Col>
          ))}
        </Row>
      )}

      {/* Create Group Buy Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Group Buy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateGroupBuy}>
            <Form.Group className="mb-3">
              <Form.Label>Product *</Form.Label>
              <Form.Select
                name="product"
                value={formData.product}
                onChange={handleProductSelect}
                required
              >
                <option value="">Select a product</option>
                {products.map(product => (
                  <option key={product._id} value={product._id}>
                    {product.name} - ${product.basePrice?.toFixed(2)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Group Buy: Premium Rice 10kg"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the group buy details..."
                rows={3}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Target Quantity *</Form.Label>
                  <Form.Control
                    type="number"
                    name="targetQuantity"
                    value={formData.targetQuantity}
                    onChange={handleInputChange}
                    min="2"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="online">Online</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Original Price *</Form.Label>
                  <Form.Control
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Group Price *</Form.Label>
                  <Form.Control
                    type="number"
                    name="groupPrice"
                    value={formData.groupPrice}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                  {formData.originalPrice && formData.groupPrice && (
                    <Form.Text className="text-success">
                      Save ${(formData.originalPrice - formData.groupPrice).toFixed(2)} (
                      {(((formData.originalPrice - formData.groupPrice) / formData.originalPrice) * 100).toFixed(0)}% off)
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Expires At *</Form.Label>
                  <Form.Control
                    type="date"
                    name="expiresAt"
                    value={formData.expiresAt}
                    onChange={handleInputChange}
                    min={getMinDate()}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Delivery Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    min={getMinDate()}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                type="text"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleInputChange}
                placeholder="Enter delivery location"
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                Create Group Buy
              </Button>
              <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default GroupBuys;

