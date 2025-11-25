import React, { useState, useEffect } from 'react';
import { Card, Alert, Spinner, Button } from 'react-bootstrap';
import { getProductReviews } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

const ReviewsSection = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getProductReviews(productId);
      setReviews(response.data.data || []);

      // Check if current user has already reviewed
      if (user) {
        const userReview = response.data.data.find(
          review => review.user?._id === user.id
        );
        setHasUserReviewed(!!userReview);
      }
    } catch (err) {
      setError('Failed to load reviews');
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmitted = (newReview) => {
    setReviews(prev => [newReview.data, ...prev]);
    setShowForm(false);
    setHasUserReviewed(true);
  };

  const handleReviewDeleted = (reviewId) => {
    setReviews(prev => prev.filter(review => review._id !== reviewId));
    // If deleted own review, allow to write new one
    if (user) {
      const deletedReview = reviews.find(r => r._id === reviewId);
      if (deletedReview && deletedReview.user?._id === user.id) {
        setHasUserReviewed(false);
      }
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(r => r.rating === rating).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { rating, count, percentage };
  });

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="my-5">
      <h3>Customer Reviews</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Rating Summary */}
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex align-items-center mb-3">
            <div className="me-4">
              <h2 className="mb-0">{averageRating}</h2>
              <div style={{ fontSize: '1.5rem', color: '#ffc107' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.round(averageRating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <div className="text-muted">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</div>
            </div>

            <div className="flex-grow-1">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="d-flex align-items-center mb-2">
                  <div style={{ width: '60px' }}>{rating} ★</div>
                  <div className="flex-grow-1 mx-2">
                    <div
                      style={{
                        height: '8px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          width: `${percentage}%`,
                          height: '100%',
                          backgroundColor: '#ffc107'
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ width: '40px', textAlign: 'right' }}>{count}</div>
                </div>
              ))}
            </div>
          </div>

          {user && !hasUserReviewed && (
            <Button
              variant="primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : 'Write a Review'}
            </Button>
          )}

          {!user && (
            <Alert variant="info" className="mb-0 mt-3">
              Please log in to write a review
            </Alert>
          )}

          {hasUserReviewed && (
            <Alert variant="success" className="mb-0 mt-3">
              You have already reviewed this product
            </Alert>
          )}
        </Card.Body>
      </Card>

      {/* Review Form */}
      {showForm && user && !hasUserReviewed && (
        <Card className="mb-4">
          <Card.Body>
            <ReviewForm
              productId={productId}
              onReviewSubmitted={handleReviewSubmitted}
            />
          </Card.Body>
        </Card>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <Alert variant="info">
          No reviews yet. Be the first to review this product!
        </Alert>
      ) : (
        <div>
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onDelete={handleReviewDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;

