import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Alert, Spinner, Table } from 'react-bootstrap';
import { getProduct, comparePrices } from '../services/productService';
import ReviewsSection from '../components/reviews/ReviewsSection';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [priceComparison, setPriceComparison] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProduct();
    loadPriceComparison();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getProduct(id);
      setProduct(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const loadPriceComparison = async () => {
    try {
      const response = await comparePrices(id);
      setPriceComparison(response.data);
    } catch (err) {
      console.error('Failed to load price comparison:', err);
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

  if (error || !product) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          {error || 'Product not found'}
        </Alert>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </Container>
    );
  }

  const bestPrice = product.storePrices && product.storePrices.length > 0
    ? Math.min(...product.storePrices.filter(sp => sp.availability).map(sp => sp.price))
    : product.basePrice;

  const savings = product.basePrice - bestPrice;
  const hasDiscount = savings > 0;

  return (
    <Container className="my-5">
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate('/products')}>
        ← Back to Products
      </Button>

      <Row>
        {/* Product Images */}
        <Col md={6}>
          {product.images && product.images.length > 0 ? (
            <div>
              <img
                src={product.images[0]}
                alt={product.name}
                className="img-fluid rounded mb-3"
                style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
                }}
              />
              {product.images.length > 1 && (
                <Row>
                  {product.images.slice(1, 4).map((img, idx) => (
                    <Col key={idx} xs={4}>
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 2}`}
                        className="img-fluid rounded"
                        style={{ width: '100%', height: '100px', objectFit: 'cover', cursor: 'pointer' }}
                        onClick={() => {
                          const newImages = [...product.images];
                          [newImages[0], newImages[idx + 1]] = [newImages[idx + 1], newImages[0]];
                          setProduct({ ...product, images: newImages });
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </div>
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

        {/* Product Details */}
        <Col md={6}>
          <h2>{product.name}</h2>
          <p className="text-muted mb-3">
            <strong>Brand:</strong> {product.brand} | <strong>Category:</strong> {product.category}
          </p>

          <div className="mb-3">
            {product.dietaryTags && product.dietaryTags.map((tag) => (
              <Badge key={tag} bg="info" className="me-2 mb-2">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mb-4">
            {hasDiscount ? (
              <>
                <div className="mb-2">
                  <span className="text-decoration-line-through text-muted me-2" style={{ fontSize: '1.2rem' }}>
                    ${product.basePrice.toFixed(2)}
                  </span>
                  <span className="h3 text-primary mb-0">
                    ${bestPrice.toFixed(2)}
                  </span>
                </div>
                <Badge bg="success" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                  Save ${savings.toFixed(2)} ({((savings / product.basePrice) * 100).toFixed(0)}% off)
                </Badge>
              </>
            ) : (
              <span className="h3">${product.basePrice.toFixed(2)}</span>
            )}
          </div>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Description</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
          </Card>

          {product.rating > 0 && (
            <div className="mb-4">
              <strong>Rating:</strong> {product.rating.toFixed(1)} / 5.0
              {product.reviewCount > 0 && (
                <span className="text-muted ms-2">
                  ({product.reviewCount} review{product.reviewCount !== 1 ? 's' : ''})
                </span>
              )}
            </div>
          )}
        </Col>
      </Row>

      {/* Price Comparison */}
      {priceComparison && priceComparison.comparisons && priceComparison.comparisons.length > 0 && (
        <Row className="mt-5">
          <Col>
            <Card>
              <Card.Header>
                <h4 className="mb-0">Price Comparison Across Stores</h4>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Store</th>
                      <th>Price</th>
                      <th>Savings</th>
                      <th>Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceComparison.comparisons
                      .sort((a, b) => a.price - b.price)
                      .map((comparison, idx) => (
                        <tr
                          key={idx}
                          className={comparison.price === bestPrice ? 'table-success' : ''}
                        >
                          <td>
                            <strong>{comparison.storeName}</strong>
                            {comparison.price === bestPrice && (
                              <Badge bg="success" className="ms-2">Best Price</Badge>
                            )}
                          </td>
                          <td>${comparison.price.toFixed(2)}</td>
                          <td>
                            {comparison.savings > 0 ? (
                              <span className="text-success">
                                Save ${comparison.savings.toFixed(2)}
                              </span>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                          <td>
                            {comparison.availability ? (
                              <Badge bg="success">In Stock</Badge>
                            ) : (
                              <Badge bg="danger">Out of Stock</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <div className="mt-3">
                  <strong>Base Price:</strong> ${priceComparison.basePrice.toFixed(2)} |{' '}
                  <strong>Best Price:</strong> ${priceComparison.bestPrice.toFixed(2)}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Reviews Section */}
      <Row className="mt-5">
        <Col>
          <ReviewsSection productId={id} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;



