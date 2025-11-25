import React from 'react';
import { Card, Badge, Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GroupBuyCard = ({ groupBuy }) => {
  const navigate = useNavigate();

  const progress = (groupBuy.currentQuantity / groupBuy.targetQuantity) * 100;
  const daysLeft = Math.ceil((new Date(groupBuy.expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
  const isExpired = daysLeft <= 0;
  const isFull = groupBuy.currentQuantity >= groupBuy.targetQuantity;

  const getStatusBadge = () => {
    if (groupBuy.status === 'completed' || isFull) {
      return <Badge bg="success">Completed</Badge>;
    }
    if (groupBuy.status === 'expired' || isExpired) {
      return <Badge bg="danger">Expired</Badge>;
    }
    if (groupBuy.status === 'cancelled') {
      return <Badge bg="secondary">Cancelled</Badge>;
    }
    return <Badge bg="primary">Active</Badge>;
  };

  return (
    <Card className="h-100 shadow-sm hover-shadow" style={{ cursor: 'pointer' }}>
      <div
        onClick={() => navigate(`/group-buys/${groupBuy._id}`)}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {groupBuy.product?.images && groupBuy.product.images[0] ? (
          <Card.Img
            variant="top"
            src={groupBuy.product.images[0]}
            style={{ height: '200px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: '200px', backgroundColor: '#f8f9fa' }}
          >
            <span className="text-muted">No Image</span>
          </div>
        )}

        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h6 className="mb-0">{groupBuy.product?.name}</h6>
            {getStatusBadge()}
          </div>

          <Card.Title className="h6 mb-3">{groupBuy.title}</Card.Title>

          <div className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <span className="text-decoration-line-through text-muted">
                ${groupBuy.originalPrice.toFixed(2)}
              </span>
              <span className="text-success fw-bold">
                ${groupBuy.groupPrice.toFixed(2)}
              </span>
            </div>
            <Badge bg="success">
              Save {groupBuy.savingsPercentage}% (${groupBuy.savings.toFixed(2)})
            </Badge>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <small className="text-muted">Progress</small>
              <small className="text-muted">
                {groupBuy.currentQuantity}/{groupBuy.targetQuantity}
              </small>
            </div>
            <ProgressBar 
              now={progress} 
              variant={progress >= 100 ? 'success' : 'primary'}
              style={{ height: '8px' }}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              👥 {groupBuy.participants?.length || 0} participant{groupBuy.participants?.length !== 1 ? 's' : ''}
            </small>
            {!isExpired && !isFull && (
              <small className="text-muted">
                ⏰ {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
              </small>
            )}
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default GroupBuyCard;

