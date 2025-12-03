import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Alert, Spinner, Tabs, Tab, Form, Button } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  getDashboardStats,
  getUserAnalytics,
  getSalesAnalytics,
  getInventoryAnalytics
} from '../services/adminService';
import { getProducts } from '../services/productService';
import { getBlogs } from '../services/blogService';
import { getAllUsers, deleteUser, updateUser } from '../services/userService';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [userAnalytics, setUserAnalytics] = useState(null);
  const [salesAnalytics, setSalesAnalytics] = useState(null);
  const [inventoryAnalytics, setInventoryAnalytics] = useState(null);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Date filters for sales analytics
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (startDate || endDate) {
      loadSalesAnalytics();
    }
  }, [startDate, endDate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load all dashboard data in parallel
      const [statsRes, userRes, salesRes, inventoryRes, productsRes, blogsRes, usersRes] = await Promise.all([
        getDashboardStats(),
        getUserAnalytics(),
        getSalesAnalytics(),
        getInventoryAnalytics(),
        getProducts(),
        getBlogs(),
        getAllUsers()
      ]);

      setStats(statsRes.data.data);
      setUserAnalytics(userRes.data.data);
      setSalesAnalytics(salesRes.data.data);
      setInventoryAnalytics(inventoryRes.data.data);
      setProducts(productsRes.data.data || []);
      setBlogs(blogsRes.data.data || []);
      setUsers(usersRes.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const loadSalesAnalytics = async () => {
    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      
      const response = await getSalesAnalytics(params);
      setSalesAnalytics(response.data.data);
    } catch (err) {
      console.error('Failed to load sales analytics:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setSuccess('User deleted successfully!');
        loadDashboardData();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleToggleUserRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (window.confirm(`Change user role to ${newRole}?`)) {
      try {
        await updateUser(userId, { role: newRole });
        setSuccess('User role updated successfully!');
        loadDashboardData();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to update user role');
      }
    }
  };

  if (loading) {
    return (
      <Container className="my-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h2>Admin Dashboard</h2>
          <p className="text-muted">Manage your SmartBasket platform</p>
        </Col>
      </Row>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      {/* Dashboard Stats Cards */}
      {stats && (
        <Row className="mb-4">
          <Col md={4} lg={2} className="mb-3">
            <Card className="text-center border-primary h-100">
              <Card.Body>
                <div className="display-6 text-primary">👥</div>
                <h3 className="mt-2">{stats.users}</h3>
                <Card.Text className="text-muted">Total Users</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} lg={2} className="mb-3">
            <Card className="text-center border-success h-100">
              <Card.Body>
                <div className="display-6 text-success">📦</div>
                <h3 className="mt-2">{stats.products}</h3>
                <Card.Text className="text-muted">Products</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} lg={2} className="mb-3">
            <Card className="text-center border-info h-100">
              <Card.Body>
                <div className="display-6 text-info">💳</div>
                <h3 className="mt-2">{stats.transactions}</h3>
                <Card.Text className="text-muted">Transactions</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} lg={2} className="mb-3">
            <Card className="text-center border-warning h-100">
              <Card.Body>
                <div className="display-6 text-warning">📅</div>
                <h3 className="mt-2">{stats.activeSubscriptions}</h3>
                <Card.Text className="text-muted">Active Subs</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} lg={2} className="mb-3">
            <Card className="text-center border-secondary h-100">
              <Card.Body>
                <div className="display-6 text-secondary">📝</div>
                <h3 className="mt-2">{stats.blogs}</h3>
                <Card.Text className="text-muted">Blog Posts</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} lg={2} className="mb-3">
            <Card className="text-center border-danger h-100">
              <Card.Body>
                <div className="display-6 text-danger">💰</div>
                <h3 className="mt-2">${stats.totalRevenue?.toFixed(2)}</h3>
                <Card.Text className="text-muted">Total Revenue</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Analytics Tabs */}
      <Tabs defaultActiveKey="users" className="mb-4">
        {/* User Analytics Tab */}
        <Tab eventKey="users" title="User Analytics">
          {userAnalytics && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">User Statistics</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Card className="mb-3 bg-light">
                      <Card.Body>
                        <h6>Total Users</h6>
                        <h3 className="text-primary">{userAnalytics.totalUsers}</h3>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="mb-3 bg-light">
                      <Card.Body>
                        <h6>New Users This Month</h6>
                        <h3 className="text-success">{userAnalytics.newUsersThisMonth}</h3>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col md={6}>
                    <h6 className="mb-3">Users by Role</h6>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Role</th>
                          <th>Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userAnalytics.usersByRole?.map((role) => (
                          <tr key={role._id}>
                            <td>
                              <Badge bg={role._id === 'admin' ? 'danger' : 'primary'}>
                                {role._id}
                              </Badge>
                            </td>
                            <td>{role.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                  <Col md={6}>
                    <h6 className="mb-3">User Distribution</h6>
                    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
                      <Pie
                        data={{
                          labels: userAnalytics.usersByRole?.map(role => role._id) || [],
                          datasets: [{
                            data: userAnalytics.usersByRole?.map(role => role.count) || [],
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.6)',
                              'rgba(54, 162, 235, 0.6)',
                              'rgba(255, 206, 86, 0.6)'
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)'
                            ],
                            borderWidth: 1
                          }]
                        }}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'bottom'
                            }
                          }
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Tab>

        {/* Sales Analytics Tab */}
        <Tab eventKey="sales" title="Sales Analytics">
          {salesAnalytics && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Sales & Revenue</h5>
              </Card.Header>
              <Card.Body>
                {/* Date Filters */}
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Summary Cards */}
                <Row className="mb-4">
                  <Col md={4}>
                    <Card className="text-center border-success">
                      <Card.Body>
                        <Card.Title className="text-success">Total Credits</Card.Title>
                        <h3 className="text-success">${salesAnalytics.totalCredits?.toFixed(2) || '0.00'}</h3>
                        <small className="text-muted">Income</small>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="text-center border-danger">
                      <Card.Body>
                        <Card.Title className="text-danger">Total Debits</Card.Title>
                        <h3 className="text-danger">${salesAnalytics.totalDebits?.toFixed(2) || '0.00'}</h3>
                        <small className="text-muted">Expenses</small>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className={`text-center border-${salesAnalytics.netRevenue >= 0 ? 'primary' : 'warning'}`}>
                      <Card.Body>
                        <Card.Title className={`text-${salesAnalytics.netRevenue >= 0 ? 'primary' : 'warning'}`}>
                          Net Revenue
                        </Card.Title>
                        <h3 className={`text-${salesAnalytics.netRevenue >= 0 ? 'primary' : 'warning'}`}>
                          ${salesAnalytics.netRevenue?.toFixed(2) || '0.00'}
                        </h3>
                        <small className="text-muted">Profit/Loss</small>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* Transactions by Category */}
                <Row className="mt-4">
                  <Col md={6}>
                    <h6 className="mb-3">Transactions by Category</h6>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Count</th>
                          <th>Total Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesAnalytics.transactionsByCategory?.map((category) => (
                          <tr key={category._id}>
                            <td>
                              <Badge bg="info">{category._id}</Badge>
                            </td>
                            <td>{category.count}</td>
                            <td>${category.total?.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                  <Col md={6}>
                    <h6 className="mb-3">Revenue by Category</h6>
                    <Bar
                      data={{
                        labels: salesAnalytics.transactionsByCategory?.map(cat => cat._id) || [],
                        datasets: [{
                          label: 'Total Amount ($)',
                          data: salesAnalytics.transactionsByCategory?.map(cat => cat.total) || [],
                          backgroundColor: 'rgba(75, 192, 192, 0.6)',
                          borderColor: 'rgba(75, 192, 192, 1)',
                          borderWidth: 1
                        }]
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              callback: function(value) {
                                return '$' + value;
                              }
                            }
                          }
                        }
                      }}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Tab>

        {/* Inventory Analytics Tab */}
        <Tab eventKey="inventory" title="Inventory">
          {inventoryAnalytics && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Product Inventory</h5>
              </Card.Header>
              <Card.Body>
                <Row className="mb-4">
                  <Col md={6}>
                    <Card className="bg-light">
                      <Card.Body>
                        <h6>Total Products</h6>
                        <h3 className="text-primary">{inventoryAnalytics.totalProducts}</h3>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="bg-light">
                      <Card.Body>
                        <h6>Average Product Price</h6>
                        <h3 className="text-success">${inventoryAnalytics.averagePrice?.toFixed(2)}</h3>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <h6 className="mb-3">Products by Category</h6>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventoryAnalytics.productsByCategory?.map((category) => (
                          <tr key={category._id}>
                            <td>
                              <Badge bg="success">{category._id}</Badge>
                            </td>
                            <td>{category.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                  <Col md={6}>
                    <h6 className="mb-3">Category Distribution</h6>
                    <Doughnut
                      data={{
                        labels: inventoryAnalytics.productsByCategory?.map(cat => cat._id) || [],
                        datasets: [{
                          data: inventoryAnalytics.productsByCategory?.map(cat => cat.count) || [],
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)'
                          ],
                          borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                          ],
                          borderWidth: 1
                        }]
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'bottom'
                          }
                        }
                      }}
                    />
                  </Col>
                </Row>

                <h6 className="mt-4 mb-3">Recent Products</h6>
                <div className="table-responsive">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Base Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 10).map((product) => (
                        <tr key={product._id}>
                          <td>{product.name}</td>
                          <td>{product.brand}</td>
                          <td>
                            <Badge bg="secondary">{product.category}</Badge>
                          </td>
                          <td>${product.basePrice?.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          )}
        </Tab>

        {/* Content Management Tab */}
        <Tab eventKey="content" title="Content">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Blog Posts Management</h5>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Published</th>
                      <th>Views</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.slice(0, 10).map((blog) => (
                      <tr key={blog._id}>
                        <td>{blog.title}</td>
                        <td>{blog.author?.name || 'Anonymous'}</td>
                        <td>{new Date(blog.publishDate).toLocaleDateString()}</td>
                        <td>{blog.views || 0}</td>
                        <td>
                          <Badge bg={blog.featured ? 'primary' : 'secondary'}>
                            {blog.featured ? 'Featured' : 'Published'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Tab>

        {/* User Management Tab */}
        <Tab eventKey="userManagement" title="User Management">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Manage Users</h5>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined</th>
                      <th>Dietary Preferences</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            {user.photo && (
                              <img
                                src={user.photo}
                                alt={user.name}
                                className="rounded-circle me-2"
                                style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                              />
                            )}
                            {user.name}
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <Badge bg={user.role === 'admin' ? 'danger' : 'primary'}>
                            {user.role}
                          </Badge>
                        </td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          {user.dietaryPreferences?.length > 0 ? (
                            user.dietaryPreferences.slice(0, 2).map((pref, idx) => (
                              <Badge key={idx} bg="success" className="me-1">
                                {pref}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted">None</span>
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-1">
                            <Button
                              variant="outline-warning"
                              size="sm"
                              onClick={() => handleToggleUserRole(user._id, user.role)}
                              title="Toggle role"
                            >
                              👤
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDeleteUser(user._id)}
                              title="Delete user"
                            >
                              🗑️
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Tab>

        {/* System Overview Tab */}
        <Tab eventKey="system" title="System Overview">
          <Card>
            <Card.Header>
              <h5 className="mb-0">System Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Card className="mb-3 border-primary">
                    <Card.Body>
                      <h6 className="text-primary">Platform Status</h6>
                      <div className="mt-3">
                        <div className="d-flex justify-content-between mb-2">
                          <span>API Status:</span>
                          <Badge bg="success">Active</Badge>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Database:</span>
                          <Badge bg="success">Connected</Badge>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Services:</span>
                          <Badge bg="success">All Running</Badge>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="mb-3 border-info">
                    <Card.Body>
                      <h6 className="text-info">Quick Actions</h6>
                      <div className="d-grid gap-2 mt-3">
                        <a href="/products" className="btn btn-outline-primary btn-sm">
                          Manage Products
                        </a>
                        <a href="/blog" className="btn btn-outline-secondary btn-sm">
                          Manage Blog Posts
                        </a>
                        <a href="/recipes" className="btn btn-outline-success btn-sm">
                          Manage Recipes
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card className="mt-3 bg-light">
                <Card.Body>
                  <h6>Platform Features</h6>
                  <Row className="mt-3">
                    <Col md={6}>
                      <ul className="list-unstyled">
                        <li>✅ User Authentication</li>
                        <li>✅ Product Management</li>
                        <li>✅ Price Comparison</li>
                        <li>✅ Shopping Lists</li>
                        <li>✅ AI List Generation</li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <ul className="list-unstyled">
                        <li>✅ Recipe Recommendations</li>
                        <li>✅ Subscriptions</li>
                        <li>✅ Financial Tracking</li>
                        <li>✅ Blog System</li>
                        <li>✅ Admin Dashboard</li>
                      </ul>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Admin;

