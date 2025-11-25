import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, Badge, Button, Alert, Spinner, 
  ProgressBar, ListGroup, Modal
} from 'react-bootstrap';
import { getGroupBuy, joinGroupBuy, leaveGroupBuy, deleteGroupBuy } from '../services/groupBuyService';
import { useAuth } from '../context/AuthContext';

const GroupBuyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [groupBuy, setGroupBuy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadGroupBuy();
  }, [id]);

  const loadGroupBuy = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getGroupBuy(id);
      setGroupBuy(response.data.data);
    } catch (err) {
      setError('Failed to load group buy');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!user) {
      alert('Please log in to join group buy');
      navigate('/login');
      return;
    }

    try {
      setActionLoading(true);
      await joinGroupBuy(id);
      loadGroupBuy();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to join group buy');
    } finally {
      setActionLoading(false);
    }
  };

  const handleLeave = async () => {
    if (!window.confirm('Are you sure you want to leave this group buy?')) {
      return;
    }

    try {
      setActionLoading(true);
      await leaveGroupBuy(id);
      loadGroupBuy();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to leave group buy');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this group buy?')) {
      return;
    }

    try {
      setActionLoading(true);
      await deleteGroupBuy(id);
      navigate('/group-buys');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete group buy');
      setActionLoading(false);
    }
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

  if (error || !groupBuy) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error || 'Group buy not found'}</Alert>
        <Button onClick={() => navigate('/group-buys')}>Back to Group Buys</Button>
      </Container>
    );
  }

  const progress = (groupBuy.currentQuantity / groupBuy.targetQuantity) * 100;
  const daysLeft = Math.ceil((new Date(groupBuy.expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
  const isExpired = daysLeft <= 0 || groupBuy.status === 'expired';
  const isFull = groupBuy.currentQuantity >= groupBuy.targetQuantity || groupBuy.status === 'completed';
  const isCreator = user && groupBuy.creator?._id === user.id;
  const isParticipant = user && groupBuy.participants?.some(p => p.user?._id === user.id);

  return (
    <Container className="my-5">
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate('/group-buys')}>
        ← Back to Group Buys
      </Button>

      <Row>
        {/* Product Image */}
        <Col md={6}>
          {groupBuy.product?.images && groupBuy.product.images[0] ? (
            <img
              src={groupBuy.product.images[0]}
              alt={groupBuy.product.name}
              className="img-fluid rounded mb-3"
              style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
              }}
            />
          ) : (
            <div
              className="rounded d-flex align-items-center justify-content-center"
              style={{
                height: '500px',
                backgroundColor: '#f8f9fa',
                color: '#6c757d'
              }}
            >
              <div className="text-center">
                <h4>No Image Available</h4>
              </div>
            </div>
          )}
        </Col>

        {/* Group Buy Details */}
        <Col md={6}>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h2>{groupBuy.title}</h2>
              <p className="text-muted">
                <strong>Product:</strong> {groupBuy.product?.name}
              </p>
            </div>
            {isFull && <Badge bg="success">Completed</Badge>}
            {isExpired && <Badge bg="danger">Expired</Badge>}
            {!isFull && !isExpired && <Badge bg="primary">Active</Badge>}
          </div>

          <Card className="mb-4">
            <Card.Body>
              <h4>Pricing</h4>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-decoration-line-through text-muted" style={{ fontSize: '1.2rem' }}>
                  ${groupBuy.originalPrice.toFixed(2)}
                </span>
                <span className="h3 text-success mb-0">
                  ${groupBuy.groupPrice.toFixed(2)}
                </span>
              </div>
              <Badge bg="success" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                Save {groupBuy.savingsPercentage}% (${groupBuy.savings.toFixed(2)} per item)
              </Badge>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h5>Description</h5>
              <p>{groupBuy.description}</p>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">Progress</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Current / Target</span>
                <strong>{groupBuy.currentQuantity} / {groupBuy.targetQuantity}</strong>
              </div>
              <ProgressBar
                now={progress}
                label={`${Math.round(progress)}%`}
                variant={isFull ? 'success' : 'primary'}
                style={{ height: '25px', fontSize: '1rem' }}
              />
              <div className="mt-3">
                <p className="mb-1">
                  <strong>👥 Participants:</strong> {groupBuy.participants?.length || 0}
                </p>
                {!isExpired && !isFull && (
                  <p className="mb-0 text-muted">
                    ⏰ <strong>{daysLeft}</strong> day{daysLeft !== 1 ? 's' : ''} left to join
                  </p>
                )}
              </div>
            </Card.Body>
          </Card>

          {/* Action Buttons */}
          <div className="d-flex gap-2 mb-4">
            {!isExpired && !isFull && !isParticipant && !isCreator && (
              <Button
                variant="primary"
                size="lg"
                onClick={handleJoin}
                disabled={actionLoading}
              >
                {actionLoading ? 'Joining...' : 'Join Group Buy'}
              </Button>
            )}

            {isParticipant && !isCreator && (
              <Button
                variant="outline-danger"
                onClick={handleLeave}
                disabled={actionLoading}
              >
                {actionLoading ? 'Leaving...' : 'Leave Group Buy'}
              </Button>
            )}

            {isCreator && (
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={actionLoading}
              >
                {actionLoading ? 'Deleting...' : 'Delete Group Buy'}
              </Button>
            )}
          </div>

          {/* Additional Details */}
          <Card>
            <Card.Body>
              <h5>Details</h5>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Created by:</strong> {groupBuy.creator?.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Expires:</strong> {new Date(groupBuy.expiresAt).toLocaleDateString()}
                </ListGroup.Item>
                {groupBuy.deliveryDate && (
                  <ListGroup.Item>
                    <strong>Delivery Date:</strong> {new Date(groupBuy.deliveryDate).toLocaleDateString()}
                  </ListGroup.Item>
                )}
                {groupBuy.deliveryAddress && (
                  <ListGroup.Item>
                    <strong>Delivery Address:</strong> {groupBuy.deliveryAddress}
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <strong>Payment Method:</strong> {groupBuy.paymentMethod.charAt(0).toUpperCase() + groupBuy.paymentMethod.slice(1)}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Participants List */}
      {groupBuy.participants && groupBuy.participants.length > 0 && (
        <Row className="mt-5">
          <Col>
            <Card>
              <Card.Header>
                <h4 className="mb-0">Participants ({groupBuy.participants.length})</h4>
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  {groupBuy.participants.map((participant, idx) => (
                    <ListGroup.Item key={idx} className="d-flex align-items-center">
                      {participant.user?.profilePhoto ? (
                        <img
                          src={participant.user.profilePhoto}
                          alt={participant.user.name}
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginRight: '15px'
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#007bff',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '15px',
                            fontWeight: 'bold'
                          }}
                        >
                          {participant.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                      )}
                      <div className="flex-grow-1">
                        <strong>{participant.user?.name || 'Anonymous'}</strong>
                        {participant.user?._id === groupBuy.creator?._id && (
                          <Badge bg="primary" className="ms-2">Creator</Badge>
                        )}
                      </div>
                      <div>
                        <Badge bg="secondary">Qty: {participant.quantity}</Badge>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default GroupBuyDetail;

