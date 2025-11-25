import React, { useState, useEffect } from 'react';
import { Badge, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getNotifications, markAsRead, getUnreadCount } from '../../services/notificationService';
import { useAuth } from '../../context/AuthContext';

const NotificationBell = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadNotifications();
      loadUnreadCount();
      
      // Poll for new notifications every 30 seconds
      const interval = setInterval(() => {
        loadUnreadCount();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [user]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const response = await getNotifications({ limit: 5 });
      setNotifications(response.data.data || []);
      setUnreadCount(response.data.unreadCount || 0);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUnreadCount = async () => {
    try {
      const response = await getUnreadCount();
      setUnreadCount(response.data.count || 0);
    } catch (error) {
      console.error('Failed to load unread count:', error);
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.read) {
        await markAsRead(notification._id);
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      
      if (notification.link) {
        navigate(notification.link);
      }
    } catch (error) {
      console.error('Error handling notification click:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'group_buy_joined':
      case 'group_buy_completed':
        return '👥';
      case 'subscription_reminder':
      case 'subscription_renewed':
        return '🔔';
      case 'price_drop':
        return '💰';
      case 'review_helpful':
        return '👍';
      case 'shopping_list_shared':
        return '📝';
      case 'system':
        return 'ℹ️';
      default:
        return '📬';
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(date).toLocaleDateString();
  };

  if (!user) return null;

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="link"
        id="notification-dropdown"
        className="position-relative p-0 text-decoration-none"
        style={{ border: 'none', background: 'none' }}
      >
        <span style={{ fontSize: '1.5rem' }}>🔔</span>
        {unreadCount > 0 && (
          <Badge
            bg="danger"
            pill
            className="position-absolute top-0 start-100 translate-middle"
            style={{ fontSize: '0.7rem' }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: '350px', maxHeight: '400px', overflowY: 'auto' }}>
        <Dropdown.Header className="d-flex justify-content-between align-items-center">
          <strong>Notifications</strong>
          <small className="text-muted">{unreadCount} unread</small>
        </Dropdown.Header>
        <Dropdown.Divider />

        {loading ? (
          <div className="text-center py-3">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : notifications.length === 0 ? (
          <Dropdown.Item disabled>
            <div className="text-center text-muted py-3">
              No notifications
            </div>
          </Dropdown.Item>
        ) : (
          <>
            {notifications.map((notification) => (
              <Dropdown.Item
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                className={!notification.read ? 'bg-light' : ''}
                style={{ whiteSpace: 'normal' }}
              >
                <div className="d-flex">
                  <div className="me-2" style={{ fontSize: '1.5rem' }}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <strong className="d-block" style={{ fontSize: '0.9rem' }}>
                        {notification.title}
                      </strong>
                      {!notification.read && (
                        <Badge bg="primary" pill style={{ fontSize: '0.6rem' }}>
                          New
                        </Badge>
                      )}
                    </div>
                    <small className="text-muted d-block">
                      {notification.message}
                    </small>
                    <small className="text-muted">
                      {getTimeAgo(notification.createdAt)}
                    </small>
                  </div>
                </div>
              </Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <Dropdown.Item
              className="text-center text-primary"
              onClick={() => navigate('/notifications')}
            >
              View All Notifications
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationBell;

