import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="my-5">
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 mb-3">Welcome to SmartBasket</h1>
          <p className="lead">Your smart grocery shopping companion</p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>💰 Price Comparison</Card.Title>
              <Card.Text>
                Compare prices across multiple stores and find the best deals for your groceries.
              </Card.Text>
              <Button as={Link} to="/products" variant="primary">
                Browse Products
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>📝 Smart Lists</Card.Title>
              <Card.Text>
                AI-powered shopping lists tailored to your dietary preferences and shopping history.
              </Card.Text>
              <Button as={Link} to="/shopping-lists" variant="primary">
                Create List
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>🍳 Recipe Recommendations</Card.Title>
              <Card.Text>
                Get personalized recipe suggestions based on your cart and dietary needs.
              </Card.Text>
              <Button as={Link} to="/recipes" variant="primary">
                View Recipes
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>🔄 Subscriptions</Card.Title>
              <Card.Text>
                Set up regular deliveries for your essential items and save with subscription discounts.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>📊 Financial Tracking</Card.Title>
              <Card.Text>
                Track your spending with detailed cashflow statements and transaction history.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

