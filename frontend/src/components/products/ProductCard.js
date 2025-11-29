import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const bestPrice = product.storePrices && product.storePrices.length > 0
    ? Math.min(...product.storePrices.filter(sp => sp.availability).map(sp => sp.price))
    : product.basePrice;

  const savings = product.basePrice - bestPrice;
  const hasDiscount = savings > 0;

  return (
    <Card className="h-100 shadow-sm product-card" style={{ 
      transition: 'all 0.3s ease',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        {product.images && product.images.length > 0 && product.images[0] ? (
          <Card.Img
            variant="top"
            src={product.images[0]}
            alt={product.name}
            style={{ 
              height: '200px', 
              width: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
            className="product-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : null}
        <div
          className="image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: '200px',
            background: `linear-gradient(135deg, var(--primary-color), var(--accent-purple))`,
            display: product.images && product.images.length > 0 && product.images[0] ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '3rem'
          }}
        >
          🛒
        </div>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6">{product.name}</Card.Title>
        <Card.Text className="text-muted small mb-2">
          {product.brand} • {product.category}
        </Card.Text>
        <div className="mb-2">
          {product.dietaryTags && product.dietaryTags.map((tag) => (
            <Badge key={tag} bg="info" className="me-1 mb-1">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-auto">
          <div className="mb-2">
            {hasDiscount ? (
              <>
                <span className="text-decoration-line-through text-muted me-2">
                  ${product.basePrice.toFixed(2)}
                </span>
                <span className="h5 text-primary mb-0">
                  ${bestPrice.toFixed(2)}
                </span>
                <Badge bg="success" className="ms-2">
                  Save ${savings.toFixed(2)}
                </Badge>
              </>
            ) : (
              <span className="h5 mb-0">${product.basePrice.toFixed(2)}</span>
            )}
          </div>
          <Button
            as={Link}
            to={`/products/${product._id}`}
            variant="primary"
            size="sm"
            className="w-100"
          >
            👁️ View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;






