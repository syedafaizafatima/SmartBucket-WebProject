import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications
} from '../services/notificationService';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadNotifications();
  }, [filter]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError('');
      const filters = filter === 'unread' ? { read: false } : {};
      const response = await getNotifications(filters);
      setNotifications(response.data.data || []);
    } catch (err) {
      setError('Failed to load notifications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      loadNotifications();
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      loadNotifications();
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        await deleteNotification(id);
        loadNotifications();
      } catch (err) {
        console.error('Failed to delete notification:', err);
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete all notifications?')) {
      try {
        await deleteAllNotifications();
        loadNotifications();
      } catch (err) {
        console.error('Failed to delete all notifications:', err);
      }
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification._id);
    }
    if (notification.link) {
      navigate(notification.link);
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

  const getPriorityBadge = (priority) => {
    const colors = {
      urgent: 'danger',
      high: 'warning',
      medium: 'info',
      low: 'secondary'
    };
    return <Badge bg={colors[priority] || 'secondary'}>{priority}</Badge>;
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return new Date(date).toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h2>Notifications</h2>
          <p className="text-muted">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </Col>
        <Col xs="auto">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="me-2"
          >
            Mark All Read
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={handleDeleteAll}
            disabled={notifications.length === 0}
          >
            Delete All
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex gap-2">
            <Badge
              bg={filter === 'all' ? 'primary' : 'secondary'}
              style={{ cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
              onClick={() => setFilter('all')}
            >
              All
            </Badge>
            <Badge
              bg={filter === 'unread' ? 'primary' : 'secondary'}
              style={{ cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
              onClick={() => setFilter('unread')}
            >
              Unread
            </Badge>
          </div>
        </Card.Body>
      </Card>

      {/* Notifications List */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : notifications.length === 0 ? (
        <Alert variant="info">
          No notifications to display.
        </Alert>
      ) : (
        <ListGroup>
          {notifications.map((notification) => (
            <ListGroup.Item
              key={notification._id}
              className={`d-flex align-items-start ${!notification.read ? 'bg-light' : ''}`}
              style={{ cursor: notification.link ? 'pointer' : 'default' }}
            >
              <div
                className="me-3"
                style={{ fontSize: '2rem' }}
                onClick={() => handleNotificationClick(notification)}
              >
                {getNotificationIcon(notification.type)}
              </div>
              
              <div
                className="flex-grow-1"
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 className="mb-1">
                      {notification.title}
                      {!notification.read && (
                        <Badge bg="primary" pill className="ms-2">New</Badge>
                      )}
                    </h6>
                    <p className="mb-1">{notification.message}</p>
                    <small className="text-muted">
                      {getTimeAgo(notification.createdAt)}
                    </small>
                  </div>
                  <div>
                    {getPriorityBadge(notification.priority)}
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column gap-2 ms-3">
                {!notification.read && (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsRead(notification._id);
                    }}
                  >
                    Mark Read
                  </Button>
                )}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(notification._id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Notifications;

