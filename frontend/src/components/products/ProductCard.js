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
    <Card className="h-100 shadow-sm">
      {product.images && product.images.length > 0 && (
        <Card.Img
          variant="top"
          src={product.images[0]}
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      )}
      {(!product.images || product.images.length === 0) && (
        <div
          style={{
            height: '200px',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6c757d'
          }}
        >
          No Image
        </div>
      )}
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
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;



