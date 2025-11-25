import React, { useState } from 'react';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { markReviewHelpful, deleteReview } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';

const ReviewCard = ({ review, onDelete, onUpdate }) => {
  const { user } = useAuth();
  const [helpfulCount, setHelpfulCount] = useState(review.helpful?.length || 0);
  const [isHelpful, setIsHelpful] = useState(
    review.helpful?.includes(user?.id) || false
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleHelpful = async () => {
    try {
      const response = await markReviewHelpful(review._id);
      setHelpfulCount(response.data.helpfulCount);
      setIsHelpful(!isHelpful);
    } catch (error) {
      console.error('Error marking review helpful:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        setIsDeleting(true);
        await deleteReview(review._id);
        if (onDelete) onDelete(review._id);
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Failed to delete review');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} style={{ color: index < rating ? '#ffc107' : '#e0e0e0' }}>
        ★
      </span>
    ));
  };

  const isOwner = user && review.user && review.user._id === user.id;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col md={2} className="text-center">
            {review.user?.profilePhoto ? (
              <img
                src={review.user.profilePhoto}
                alt={review.user.name}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#007bff',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: '0 auto'
                }}
              >
                {review.user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
            <div className="mt-2">
              <strong>{review.user?.name || 'Anonymous'}</strong>
            </div>
            {review.verified && (
              <Badge bg="success" className="mt-1">Verified</Badge>
            )}
          </Col>

          <Col md={10}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="mb-2">
                  <span style={{ fontSize: '1.2rem' }}>{renderStars(review.rating)}</span>
                  <span className="ms-2 text-muted">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h5>{review.title}</h5>
              </div>
              {isOwner && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              )}
            </div>

            <Card.Text className="mb-3">{review.comment}</Card.Text>

            {review.images && review.images.length > 0 && (
              <Row className="mb-3">
                {review.images.map((image, idx) => (
                  <Col key={idx} xs={6} md={3} className="mb-2">
                    <img
                      src={image}
                      alt={`Review ${idx + 1}`}
                      className="img-fluid rounded"
                      style={{ maxHeight: '100px', objectFit: 'cover' }}
                    />
                  </Col>
                ))}
              </Row>
            )}

            {user && (
              <Button
                variant={isHelpful ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={handleHelpful}
              >
                👍 Helpful {helpfulCount > 0 && `(${helpfulCount})`}
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;

