import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { createReview } from '../../services/reviewService';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
    images: []
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title.trim() || !formData.comment.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const response = await createReview({
        ...formData,
        product: productId
      });

      setSuccess('Review submitted successfully!');
      setFormData({
        rating: 5,
        title: '',
        comment: '',
        images: []
      });

      if (onReviewSubmitted) {
        onReviewSubmitted(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const renderStarSelection = () => {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
            style={{
              cursor: 'pointer',
              fontSize: '2rem',
              color: star <= formData.rating ? '#ffc107' : '#e0e0e0'
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h4>Write a Review</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          {renderStarSelection()}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Review Title *</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Sum up your experience"
            maxLength={100}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Review Comment *</Form.Label>
          <Form.Control
            as="textarea"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Share your thoughts about this product"
            rows={4}
            maxLength={1000}
            required
          />
          <Form.Text className="text-muted">
            {formData.comment.length}/1000 characters
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </Form>
    </div>
  );
};

export default ReviewForm;

