import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { logout } from '../../services/authService';
import NotificationBell from '../notifications/NotificationBell';
import './SidebarNav.css';

const SidebarNav = ({ onSidebarToggle }) => {
  const { isAuthenticated, user, logout: logoutContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`sidebar-nav ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link to="/" className="sidebar-brand">
          <span className="brand-icon">🛒</span>
          {!isCollapsed && <span className="brand-text">SmartBasket</span>}
        </Link>
        <button 
          className="sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <Nav className="sidebar-nav-links flex-column">
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/" 
            className={isActive('/') ? 'active' : ''}
            title="Home"
          >
            <span className="nav-icon">🏠</span>
            {!isCollapsed && <span className="nav-text">Home</span>}
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/products" 
            className={isActive('/products') ? 'active' : ''}
            title="Products"
          >
            <span className="nav-icon">🛍️</span>
            {!isCollapsed && <span className="nav-text">Products</span>}
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/recipes" 
            className={isActive('/recipes') ? 'active' : ''}
            title="Recipes"
          >
            <span className="nav-icon">🍳</span>
            {!isCollapsed && <span className="nav-text">Recipes</span>}
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/group-buys" 
            className={isActive('/group-buys') ? 'active' : ''}
            title="Group Buys"
          >
            <span className="nav-icon">👥</span>
            {!isCollapsed && <span className="nav-text">Group Buys</span>}
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/blog" 
            className={isActive('/blog') ? 'active' : ''}
            title="Blog"
          >
            <span className="nav-icon">📝</span>
            {!isCollapsed && <span className="nav-text">Blog</span>}
          </Nav.Link>
        </Nav.Item>

        {isAuthenticated && (
          <>
            <div className="sidebar-divider"></div>
            <div className="sidebar-section-title">
              {!isCollapsed && <span>My Account</span>}
            </div>

            <Nav.Item>
              <Nav.Link 
                as={Link} 
                to="/shopping-lists" 
                className={isActive('/shopping-lists') ? 'active' : ''}
                title="Shopping Lists"
              >
                <span className="nav-icon">📋</span>
                {!isCollapsed && <span className="nav-text">Shopping Lists</span>}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link 
                as={Link} 
                to="/subscriptions" 
                className={isActive('/subscriptions') ? 'active' : ''}
                title="Subscriptions"
              >
                <span className="nav-icon">🔄</span>
                {!isCollapsed && <span className="nav-text">Subscriptions</span>}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link 
                as={Link} 
                to="/financial" 
                className={isActive('/financial') ? 'active' : ''}
                title="Financial"
              >
                <span className="nav-icon">💰</span>
                {!isCollapsed && <span className="nav-text">Financial</span>}
              </Nav.Link>
            </Nav.Item>

            {user?.role === 'admin' && (
              <Nav.Item>
                <Nav.Link 
                  as={Link} 
                  to="/admin" 
                  className={isActive('/admin') ? 'active' : ''}
                  title="Admin"
                >
                  <span className="nav-icon">⚙️</span>
                  {!isCollapsed && <span className="nav-text">Admin</span>}
                </Nav.Link>
              </Nav.Item>
            )}
          </>
        )}

        <div className="sidebar-divider"></div>

        <Nav.Item>
          <Nav.Link 
            onClick={onSidebarToggle}
            className="sidebar-qa-link"
            title="Ask Question"
          >
            <span className="nav-icon">💬</span>
            {!isCollapsed && <span className="nav-text">Ask Question</span>}
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="sidebar-footer">
        {isAuthenticated ? (
          <div className="sidebar-user-section">
            {!isCollapsed && <NotificationBell />}
            <NavDropdown 
              title={
                <div className="sidebar-user-info">
                  {user?.photo ? (
                    <img 
                      src={user.photo} 
                      alt={user.name}
                      className="sidebar-user-avatar"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="sidebar-user-avatar-placeholder">
                      {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
                    </div>
                  )}
                  {!isCollapsed && (
                    <div className="sidebar-user-details">
                      <div className="sidebar-user-name">{user?.name || 'User'}</div>
                      <div className="sidebar-user-email">{user?.email}</div>
                    </div>
                  )}
                </div>
              }
              id="sidebar-user-dropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/profile" onClick={handleProfileClick}>
                ⚙️ Setup Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>🚪 Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
        ) : (
          <div className="sidebar-auth-buttons">
            <Nav.Link as={Link} to="/login" className="sidebar-login-btn">
              <span className="nav-icon">🔐</span>
              {!isCollapsed && <span>Login</span>}
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="sidebar-register-btn">
              <span className="nav-icon">✨</span>
              {!isCollapsed && <span>Register</span>}
            </Nav.Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarNav;

