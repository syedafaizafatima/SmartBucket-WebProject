import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { logout } from '../../services/authService';
import NotificationBell from '../notifications/NotificationBell';

const Navbar = ({ onSidebarToggle }) => {
  const { isAuthenticated, user, logout: logoutContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    logoutContext();
    navigate('/');
  };

  const handleProfileClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    <BootstrapNavbar bg="primary" expand="lg" className="shadow-sm" style={{
      background: 'linear-gradient(135deg, var(--primary-color), rgba(0, 26, 51, 0.95))',
      borderBottom: '2px solid rgba(204, 0, 255, 0.3)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    }}>
      <Container fluid>
        <BootstrapNavbar.Brand as={Link} to="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '0 0 10px var(--accent-purple)'
        }}>
          🛒 SmartBasket
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'var(--accent-purple)' }} />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ color: 'white', fontWeight: '500' }}>
              🏠 Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" style={{ color: 'white', fontWeight: '500' }}>
              🛍️ Products
            </Nav.Link>
            <Nav.Link as={Link} to="/recipes" style={{ color: 'white', fontWeight: '500' }}>
              🍳 Recipes
            </Nav.Link>
            <Nav.Link as={Link} to="/group-buys" style={{ color: 'white', fontWeight: '500' }}>
              👥 Group Buys
            </Nav.Link>
            <Nav.Link as={Link} to="/blog" style={{ color: 'white', fontWeight: '500' }}>
              📝 Blog
            </Nav.Link>
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/shopping-lists" style={{ color: 'white', fontWeight: '500' }}>
                  📋 Shopping Lists
                </Nav.Link>
                <Nav.Link as={Link} to="/subscriptions" style={{ color: 'white', fontWeight: '500' }}>
                  🔄 Subscriptions
                </Nav.Link>
                <Nav.Link as={Link} to="/financial" style={{ color: 'white', fontWeight: '500' }}>
                  💰 Financial
                </Nav.Link>
              </>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <Nav.Link as={Link} to="/admin" style={{ color: 'white', fontWeight: '500' }}>
                ⚙️ Admin
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Item className="d-flex align-items-center me-3">
              <Button
                variant="outline-light"
                onClick={onSidebarToggle}
                style={{
                  borderColor: 'var(--accent-purple)',
                  color: 'white',
                  fontWeight: '500'
                }}
                className="glow-effect"
              >
                💬 Ask Question
              </Button>
            </Nav.Item>
            {isAuthenticated ? (
              <>
                <Nav.Item className="d-flex align-items-center me-3">
                  <NotificationBell />
                </Nav.Item>
                <NavDropdown 
                  title={
                    <span style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                      {user?.photo ? (
                        <img 
                          src={user.photo} 
                          alt={user.name}
                          style={{ 
                            width: '35px', 
                            height: '35px', 
                            borderRadius: '50%', 
                            marginRight: '8px',
                            objectFit: 'cover',
                            border: '2px solid var(--accent-purple)',
                            boxShadow: '0 0 10px rgba(204, 0, 255, 0.5)'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span style={{ 
                          marginRight: '8px',
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--primary-color), var(--accent-purple))',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem'
                        }}>
                          {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
                        </span>
                      )}
                      <span style={{ fontWeight: '500' }}>{user?.name || 'User'}</span>
                    </span>
                  } 
                  id="user-nav-dropdown"
                  style={{ color: 'white' }}
                >
                  <NavDropdown.Item as={Link} to="/profile" onClick={handleProfileClick}>
                    ⚙️ Setup Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>🚪 Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: 'white', fontWeight: '500' }}>
                  🔐 Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" style={{ color: 'white', fontWeight: '500' }}>
                  ✨ Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;

