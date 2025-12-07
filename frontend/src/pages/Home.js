import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const cardTextStyle = {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#ffffff', 
    textShadow: '0 1px 2px rgba(0,0,0,0.6)'
  };

  return (
    <Container fluid className="px-0 fade-in">
      
      {/* HERO SECTION */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.6), rgba(222, 92, 255, 0.5)), url(https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1600) center/cover',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', padding: '2rem' }}>
          <h1
            className="display-3 mb-4"
            style={{
              textShadow: '0 0 20px rgba(0,0,0,0.4)',
              fontWeight: 'bold'
            }}
          >
            <span className="floating-icon" style={{ fontSize: '4rem' }}>🛒</span>
            <br />
            Welcome to SmartBasket
          </h1>

          <p
            className="lead mb-4"
            style={{
              fontSize: '1.5rem',
              textShadow: '0 0 10px rgba(0,0,0,0.4)'
            }}
          >
            Your smart grocery shopping companion
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Button
              as={Link}
              to="/products"
              variant="primary"
              size="lg"
              style={{
                backgroundColor: 'var(--accent-purple)',
                borderColor: 'var(--accent-purple)',
                padding: '0.75rem 2rem',
                fontSize: '1.1rem'
              }}
            >
              🛍️ Start Shopping
            </Button>

            <Button
              as={Link}
              to="/register"
              variant="outline-light"
              size="lg"
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1.1rem'
              }}
            >
              ✨ Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* CARD SECTIONS */}
      <Container className="my-5">
        <Row className="mb-5">

          {/* Price Comparison */}
          <Col md={4} className="mb-4 slide-in">
            <Card
              className="h-100 product-card"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '2px solid rgba(222, 92, 255, 0.3)'
              }}
            >
              <Card.Body
                style={{
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                }}
              >
                <div>
                  <Card.Title className="mb-3" style={{ fontSize: '1.5rem' }}>
                    <span className="floating-icon">💰</span> Price Comparison
                  </Card.Title>
                  <Card.Text style={cardTextStyle}>
                    Compare prices across multiple stores and find the best deals for your groceries.
                    Save money with our smart price tracking.
                  </Card.Text>
                </div>

                <Button as={Link} to="/products" variant="primary" className="w-100 mt-3" size="lg">
                  🔍 Browse Products
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Smart Lists */}
          <Col md={4} className="mb-4 slide-in" style={{ animationDelay: '0.2s' }}>
            <Card
              className="h-100 product-card"
              style={{
                border: '2px solid rgba(222, 92, 255, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, var(--primary-color), var(--accent-purple))'
              }}
            >
              <div
                className="card-background-image"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1484482340112-e1e2682cc16e?w=800&h=600&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.3,
                  zIndex: 0
                }}
              ></div>

              <Card.Body
                style={{
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: 'white',
                  position: 'relative',
                  zIndex: 2,
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                }}
              >
                <div>
                  <Card.Title className="mb-3" style={{ fontSize: '1.5rem' }}>
                    <span className="floating-icon">📝</span> Smart Lists
                  </Card.Title>
                  <Card.Text style={cardTextStyle}>
                    AI-powered shopping lists tailored to your dietary preferences and shopping
                    history. Never forget an item again!
                  </Card.Text>
                </div>

                <Button as={Link} to="/shopping-lists" variant="primary" className="w-100 mt-3" size="lg">
                  ✨ Create List
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Recipe Recommendations */}
          <Col md={4} className="mb-4 slide-in" style={{ animationDelay: '0.4s' }}>
            <Card
              className="h-100 product-card"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '2px solid rgba(222, 92, 255, 0.3)'
              }}
            >
              <Card.Body
                style={{
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                }}
              >
                <div>
                  <Card.Title className="mb-3" style={{ fontSize: '1.5rem' }}>
                    <span className="floating-icon">🍳</span> Recipe Recommendations
                  </Card.Title>
                  <Card.Text style={cardTextStyle}>
                    Get personalized recipe suggestions based on your cart and dietary needs.
                    Cook delicious meals with what you already have!
                  </Card.Text>
                </div>

                <Button as={Link} to="/recipes" variant="primary" className="w-100 mt-3" size="lg">
                  👨‍🍳 View Recipes
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Subscriptions + Finance */}
        <Row className="mb-5">
          {/* Subscriptions */}
          <Col md={6} className="mb-4 fade-in" style={{ animationDelay: '0.6s' }}>
            <Card
              className="h-100 product-card"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '2px solid rgba(222, 92, 255, 0.3)'
              }}
            >
              <Card.Body
                style={{
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                }}
              >
                <div>
                  <Card.Title className="mb-3" style={{ fontSize: '1.5rem' }}>
                    <span className="floating-icon">🔄</span> Subscriptions
                  </Card.Title>
                  <Card.Text style={cardTextStyle}>
                    Set up recurring deliveries for your essentials and save with subscription
                    discounts. Never run out again.
                  </Card.Text>
                </div>

                <Button as={Link} to="/subscriptions" variant="primary" className="w-100 mt-3" size="lg">
                  📅 Manage Subscriptions
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Finance */}
          <Col md={6} className="mb-4 fade-in" style={{ animationDelay: '0.8s' }}>
            <Card
              className="h-100 product-card"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '2px solid rgba(222, 92, 255, 0.3)'
              }}
            >
              <Card.Body
                style={{
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                }}
              >
                <div>
                  <Card.Title className="mb-3" style={{ fontSize: '1.5rem' }}>
                    <span className="floating-icon">📊</span> Financial Tracking
                  </Card.Title>
                  <Card.Text style={cardTextStyle}>
                    Analyze your spending with detailed cashflow history and patterns. Stay on top of your budget effortlessly.
                  </Card.Text>
                </div>

                <Button as={Link} to="/financial" variant="primary" className="w-100 mt-3" size="lg">
                  💰 View Dashboard
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* WHY CHOOSE US */}
        <Row className="text-center mb-5">
          <Col>
            <h2 className="mb-4" style={{ color: 'var(--primary-color)' }}>
              Why Choose SmartBasket?
            </h2>
          </Col>
        </Row>

        <Row>
          <Col md={3} className="mb-4 text-center fade-in">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }} className="floating-icon">
              🤖
            </div>
            <h5>AI-Powered</h5>
            <p className="text-muted">Smart recommendations and automation</p>
          </Col>

          <Col md={3} className="mb-4 text-center fade-in" style={{ animationDelay: '0.2s' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }} className="floating-icon">
              💸
            </div>
            <h5>Save Money</h5>
            <p className="text-muted">Find the best deals instantly</p>
          </Col>

          <Col md={3} className="mb-4 text-center fade-in" style={{ animationDelay: '0.4s' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }} className="floating-icon">
              ⚡
            </div>
            <h5>Fast & Easy</h5>
            <p className="text-muted">Designed for quick shopping</p>
          </Col>

          <Col md={3} className="mb-4 text-center fade-in" style={{ animationDelay: '0.6s' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }} className="floating-icon">
              🔒
            </div>
            <h5>Secure</h5>
            <p className="text-muted">Your data stays protected</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
