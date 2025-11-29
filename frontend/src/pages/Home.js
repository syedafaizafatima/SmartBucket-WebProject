import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container fluid className="px-0 fade-in">
      {/* Hero Section with Image */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.9), rgba(204, 0, 255, 0.7)), url(https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1600) center/cover',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', padding: '2rem' }}>
          <h1 className="display-3 mb-4" style={{ 
            textShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
            fontWeight: 'bold'
          }}>
            <span className="floating-icon" style={{ fontSize: '4rem' }}>🛒</span>
            <br />
            Welcome to SmartBasket
          </h1>
          <p className="lead mb-4" style={{ 
            fontSize: '1.5rem',
            textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
          }}>
            Your smart grocery shopping companion
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Button as={Link} to="/products" variant="primary" size="lg" style={{
              backgroundColor: 'var(--accent-purple)',
              borderColor: 'var(--accent-purple)',
              padding: '0.75rem 2rem',
              fontSize: '1.1rem'
            }}>
              🛍️ Start Shopping
            </Button>
            <Button as={Link} to="/register" variant="outline-light" size="lg" style={{
              padding: '0.75rem 2rem',
              fontSize: '1.1rem'
            }}>
              ✨ Get Started
            </Button>
          </div>
        </div>
      </div>

      <Container className="my-5">
        <Row className="mb-5">
          <Col md={4} className="mb-4 slide-in">
            <Card className="h-100 product-card" style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '2px solid rgba(204, 0, 255, 0.3)'
            }}>
              <Card.Body style={{ 
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
              }}>
                <div>
                  <Card.Title className="mb-3" style={{ fontSize: '1.5rem' }}>
                    <span className="floating-icon" style={{ animationDelay: '0s' }}>💰</span> Price Comparison
                  </Card.Title>
                  <Card.Text style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                    Compare prices across multiple stores and find the best deals for your groceries. Save money with our smart price tracking.
                  </Card.Text>
                </div>
                <Button as={Link} to="/products" variant="primary" className="w-100 mt-3 glow-effect" size="lg">
                  🔍 Browse Products
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4 slide-in" style={{ animationDelay: '0.2s' }}>
            <Card className="h-100 product-card" style={{
              border: '2px solid rgba(204, 0, 255, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, var(--primary-color), var(--accent-purple))'
            }}>
              <div 
                className="card-background-image"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: 'url(https://images.unsplash.com/photo-1484482340112-e1e2682cc16e?w=800&h=600&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  opacity: 0.4,
                  zIndex: 0
                }}
              ></div>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8))',
                zIndex: 1
              }}></div>
              <Card.Body style={{ 
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                position: 'relative',
                zIndex: 2
              }}>
                <div>
                  <Card.Title className="mb-3" style={{ fontSize: '1.5rem' }}>
                    <span className="floating-icon" style={{ animationDelay: '1s' }}>📝</span> Smart Lists
                  </Card.Title>
                  <Card.Text style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                    AI-powered shopping lists tailored to your dietary preferences and shopping history. Never forget an item again!
                  </Card.Text>
                </div>
                <Button as={Link} to="/shopping-lists" variant="primary" className="w-100 mt-3 glow-effect" size="lg">
                  ✨ Create List
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4 slide-in" style={{ animationDelay: '0.4s' }}>
            <Card className="h-100 product-card" style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '2px solid rgba(204, 0, 255, 0.3)'
            }}>
              <Card.Body style={{ 
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
              }}>
                <div>
                  <Card.Title className="mb-3" style={{ fontSize: '1.5rem' }}>
                    <span className="floating-icon" style={{ animationDelay: '2s' }}>🍳</span> Recipe Recommendations
                  </Card.Title>
                  <Card.Text style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                    Get personalized recipe suggestions based on your cart and dietary needs. Cook delicious meals with what you have!
                  </Card.Text>
                </div>
                <Button as={Link} to="/recipes" variant="primary" className="w-100 mt-3 glow-effect" size="lg">
                  👨‍🍳 View Recipes
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={6} className="mb-4 fade-in" style={{ animationDelay: '0.6s' }}>
            <Card className="h-100 product-card" style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '2px solid rgba(204, 0, 255, 0.3)'
            }}>
              <Card.Body style={{ 
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
              }}>
                <div>
                  <Card.Title className="mb-3" style={{ fontSize: '1.5rem' }}>
                    <span className="floating-icon" style={{ animationDelay: '3s' }}>🔄</span> Subscriptions
                  </Card.Title>
                  <Card.Text style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                    Set up regular deliveries for your essential items and save with subscription discounts. Never run out of your favorites!
                  </Card.Text>
                </div>
                <Button as={Link} to="/subscriptions" variant="primary" className="w-100 mt-3 glow-effect" size="lg">
                  📅 Manage Subscriptions
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4 fade-in" style={{ animationDelay: '0.8s' }}>
            <Card className="h-100 product-card" style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '2px solid rgba(204, 0, 255, 0.3)'
            }}>
              <Card.Body style={{ 
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
              }}>
                <div>
                  <Card.Title className="mb-3" style={{ fontSize: '1.5rem' }}>
                    <span className="floating-icon" style={{ animationDelay: '4s' }}>📊</span> Financial Tracking
                  </Card.Title>
                  <Card.Text style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                    Track your spending with detailed cashflow statements and transaction history. Stay on budget with smart analytics.
                  </Card.Text>
                </div>
                <Button as={Link} to="/financial" variant="primary" className="w-100 mt-3 glow-effect" size="lg">
                  💰 View Dashboard
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Additional Features Section */}
        <Row className="text-center mb-5">
          <Col>
            <h2 className="mb-4" style={{ color: 'var(--primary-color)' }}>
              Why Choose SmartBasket?
            </h2>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="mb-4 text-center fade-in">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }} className="floating-icon">🤖</div>
            <h5>AI-Powered</h5>
            <p className="text-muted">Smart recommendations and automated lists</p>
          </Col>
          <Col md={3} className="mb-4 text-center fade-in" style={{ animationDelay: '0.2s' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }} className="floating-icon" style={{ animationDelay: '1s' }}>💸</div>
            <h5>Save Money</h5>
            <p className="text-muted">Compare prices and find the best deals</p>
          </Col>
          <Col md={3} className="mb-4 text-center fade-in" style={{ animationDelay: '0.4s' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }} className="floating-icon" style={{ animationDelay: '2s' }}>⚡</div>
            <h5>Fast & Easy</h5>
            <p className="text-muted">Quick setup and intuitive interface</p>
          </Col>
          <Col md={3} className="mb-4 text-center fade-in" style={{ animationDelay: '0.6s' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }} className="floating-icon" style={{ animationDelay: '3s' }}>🔒</div>
            <h5>Secure</h5>
            <p className="text-muted">Your data is safe and protected</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home;

