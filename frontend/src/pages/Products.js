import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Card, Badge, Alert, Spinner, Button } from 'react-bootstrap';
import { getProducts } from '../services/productService';
import ProductCard from '../components/products/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDietaryTags, setSelectedDietaryTags] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    'fruits', 'vegetables', 'dairy', 'meat', 'bakery',
    'beverages', 'snacks', 'frozen', 'pantry', 'other'
  ];

  const dietaryOptions = [
    'gluten-free', 'vegan', 'vegetarian', 'keto', 'paleo',
    'dairy-free', 'nut-free', 'halal', 'kosher', 'organic'
  ];

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, selectedDietaryTags, minPrice, maxPrice, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const filters = {
        search: searchTerm || undefined,
        category: selectedCategory || undefined,
        dietaryTags: selectedDietaryTags.length > 0 ? selectedDietaryTags.join(',') : undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined
      };

      const response = await getProducts(filters);
      // Handle API response structure - API returns { success: true, count: X, data: [...] }
      // productService returns response.data which is the axios response.data
      let productsData = [];
      if (response) {
        // API returns: { success: true, count: X, data: [...] }
        if (response.success && response.data && Array.isArray(response.data)) {
          productsData = response.data;
        } 
        // Fallback: if data is directly an array
        else if (Array.isArray(response.data)) {
          productsData = response.data;
        } 
        // Fallback: if response itself is an array
        else if (Array.isArray(response)) {
          productsData = response;
        }
      }

      // Client-side sorting
      if (sortBy === 'price-low') {
        productsData.sort((a, b) => {
          const priceA = a.storePrices && a.storePrices.length > 0
            ? Math.min(...a.storePrices.filter(sp => sp.availability).map(sp => sp.price))
            : a.basePrice;
          const priceB = b.storePrices && b.storePrices.length > 0
            ? Math.min(...b.storePrices.filter(sp => sp.availability).map(sp => sp.price))
            : b.basePrice;
          return priceA - priceB;
        });
      } else if (sortBy === 'price-high') {
        productsData.sort((a, b) => {
          const priceA = a.storePrices && a.storePrices.length > 0
            ? Math.min(...a.storePrices.filter(sp => sp.availability).map(sp => sp.price))
            : a.basePrice;
          const priceB = b.storePrices && b.storePrices.length > 0
            ? Math.min(...b.storePrices.filter(sp => sp.availability).map(sp => sp.price))
            : b.basePrice;
          return priceB - priceA;
        });
      } else if (sortBy === 'name') {
        productsData.sort((a, b) => a.name.localeCompare(b.name));
      }

      setProducts(productsData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadProducts();
  };

  const handleDietaryTagToggle = (tag) => {
    setSelectedDietaryTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedDietaryTags([]);
    setMinPrice('');
    setMaxPrice('');
    setSortBy('name');
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2 className="mb-4">Products</h2>
        </Col>
      </Row>

      {/* Search and Filters */}
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSearch} className="mb-3">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </InputGroup>
              </Form>

              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Min Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Max Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="1000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Sort By</Form.Label>
                    <Form.Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="price-low">Price (Low to High)</option>
                      <option value="price-high">Price (High to Low)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Dietary Preferences</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {dietaryOptions.map((option) => (
                    <Badge
                      key={option}
                      bg={selectedDietaryTags.includes(option) ? 'primary' : 'secondary'}
                      style={{ cursor: 'pointer', fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                      onClick={() => handleDietaryTagToggle(option)}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </Form.Group>

              <Button variant="outline-secondary" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Products Grid */}
      {error && <Alert variant="danger">{error}</Alert>}
      
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : products.length === 0 ? (
        <Alert variant="info">
          No products found. Try adjusting your filters.
        </Alert>
      ) : (
        <>
          <Row className="mb-3">
            <Col>
              <p className="text-muted">
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
              </p>
            </Col>
          </Row>
          <Row>
            {products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default Products;
