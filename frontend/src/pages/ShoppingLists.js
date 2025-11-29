import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, ListGroup, Badge, Alert, Spinner } from 'react-bootstrap';
import { getShoppingLists, createShoppingList, updateShoppingList, deleteShoppingList, generateAIShoppingList } from '../services/shoppingListService';
import { getProducts } from '../services/productService';

const ShoppingLists = () => {
  const [lists, setLists] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentList, setCurrentList] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    items: []
  });

  useEffect(() => {
    loadShoppingLists();
    loadProducts();
  }, []);

  const loadShoppingLists = async () => {
    try {
      setLoading(true);
      const response = await getShoppingLists();
      // Handle API response structure
      let listsData = [];
      if (response) {
        if (response.success && response.data && Array.isArray(response.data)) {
          listsData = response.data;
        } else if (response.data && Array.isArray(response.data)) {
          listsData = response.data;
        } else if (Array.isArray(response)) {
          listsData = response;
        }
      }
      setLists(listsData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load shopping lists');
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

  const handleCreateList = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await createShoppingList(formData);
      setSuccess('Shopping list created successfully!');
      setShowCreateModal(false);
      setFormData({ name: '', items: [] });
      loadShoppingLists();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create shopping list');
    }
  };

  const handleUpdateList = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await updateShoppingList(currentList._id, formData);
      setSuccess('Shopping list updated successfully!');
      setShowEditModal(false);
      setFormData({ name: '', items: [] });
      setCurrentList(null);
      loadShoppingLists();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update shopping list');
    }
  };

  const handleDeleteList = async (id) => {
    if (window.confirm('Are you sure you want to delete this shopping list?')) {
      try {
        await deleteShoppingList(id);
        setSuccess('Shopping list deleted successfully!');
        loadShoppingLists();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete shopping list');
      }
    }
  };

  const handleGenerateAI = async () => {
    setError('');
    setSuccess('');

    try {
      await generateAIShoppingList({ name: 'AI Generated List' });
      setSuccess('AI shopping list generated successfully!');
      loadShoppingLists();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate AI shopping list');
    }
  };

  const openEditModal = (list) => {
    setCurrentList(list);
    setFormData({
      name: list.name,
      items: list.items
    });
    setShowEditModal(true);
  };

  const openViewModal = (list) => {
    setCurrentList(list);
    setShowViewModal(true);
  };

  const addItemToList = (productId) => {
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

  const removeItemFromList = (productId) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.productId !== productId)
    });
  };

  const updateItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItemFromList(productId);
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

  const calculateTotalPrice = (items) => {
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
          <h2>📝 Shopping Lists</h2>
          <p className="text-muted">Manage your grocery shopping lists</p>
        </Col>
        <Col className="text-end">
          <Button variant="success" className="me-2" onClick={handleGenerateAI}>
            🤖 Generate AI List
          </Button>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            ➕ Create New List
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      {lists.length === 0 ? (
        <Alert variant="info">
          No shopping lists yet. Create your first list to get started!
        </Alert>
      ) : (
        <Row>
          {lists.map((list) => (
            <Col key={list._id} md={6} lg={4} className="mb-4 slide-in">
              <Card className="product-card">
                <Card.Body>
                  <Card.Title>
                    <span className="floating-icon">📋</span> {list.name}
                  </Card.Title>
                  <Card.Text>
                    <Badge bg="secondary">{list.items.length} items</Badge>
                    <br />
                    <small className="text-muted">
                      Created: {new Date(list.createdAt).toLocaleDateString()}
                    </small>
                  </Card.Text>
                  <div className="d-grid gap-2">
                    <Button variant="outline-primary" size="sm" onClick={() => openViewModal(list)}>
                      View Details
                    </Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => openEditModal(list)}>
                      Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteList(list._id)}>
                      Delete
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
          <Modal.Title>Create Shopping List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateList}>
            <Form.Group className="mb-3">
              <Form.Label>List Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g., Weekly Groceries"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Add Products</Form.Label>
              <Form.Select onChange={(e) => e.target.value && addItemToList(e.target.value)}>
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
                          onClick={() => removeItemFromList(item.productId)}
                        >
                          Remove
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Create List
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Shopping List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateList}>
            <Form.Group className="mb-3">
              <Form.Label>List Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Add Products</Form.Label>
              <Form.Select onChange={(e) => e.target.value && addItemToList(e.target.value)}>
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
                <h6>Items in List:</h6>
                <ListGroup>
                  {formData.items.map((item) => (
                    <ListGroup.Item key={item.productId._id || item.productId} className="d-flex justify-content-between align-items-center">
                      <span>{getProductName(item.productId._id || item.productId)}</span>
                      <div className="d-flex align-items-center gap-2">
                        <Form.Control
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItemQuantity(item.productId._id || item.productId, e.target.value)}
                          style={{ width: '80px' }}
                          min="1"
                        />
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeItemFromList(item.productId._id || item.productId)}
                        >
                          Remove
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Update List
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{currentList?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentList && (
            <>
              <div className="mb-3">
                <p><strong>Created:</strong> {new Date(currentList.createdAt).toLocaleDateString()}</p>
                <p><strong>Total Items:</strong> {currentList.items.length}</p>
                <p><strong>Estimated Total:</strong> ${calculateTotalPrice(currentList.items).toFixed(2)}</p>
              </div>

              <h6>Items:</h6>
              {currentList.items.length === 0 ? (
                <Alert variant="info">No items in this list</Alert>
              ) : (
                <ListGroup>
                  {currentList.items.map((item) => {
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

export default ShoppingLists;
