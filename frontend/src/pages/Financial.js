import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Table, Badge, Alert, Spinner } from 'react-bootstrap';
import {
  getTransactions,
  createTransaction,
  getCashflowStatement,
  downloadCashflowPDF
} from '../services/transactionService';

const Financial = () => {
  const [transactions, setTransactions] = useState([]);
  const [statement, setStatement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Modal and filter states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    type: 'credit',
    amount: '',
    description: '',
    category: 'groceries',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadTransactions();
    loadCashflowStatement();
  }, [filterType, filterCategory, startDate, endDate]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterType) params.type = filterType;
      if (filterCategory) params.category = filterCategory;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      
      const response = await getTransactions(params);
      // Handle API response structure
      let transactionsData = [];
      if (response) {
        if (response.success && response.data && Array.isArray(response.data)) {
          transactionsData = response.data;
        } else if (response.data && Array.isArray(response.data)) {
          transactionsData = response.data;
        } else if (Array.isArray(response)) {
          transactionsData = response;
        }
      }
      setTransactions(transactionsData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const loadCashflowStatement = async () => {
    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      
      const response = await getCashflowStatement(params);
      // Handle API response structure
      if (response) {
        if (response.success && response.data) {
          setStatement(response.data);
        } else if (response.data) {
          setStatement(response.data);
        } else {
          setStatement(response);
        }
      }
    } catch (err) {
      console.error('Failed to load cashflow statement:', err);
    }
  };

  const handleCreateTransaction = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await createTransaction(formData);
      setSuccess('Transaction added successfully!');
      setShowCreateModal(false);
      setFormData({
        type: 'credit',
        amount: '',
        description: '',
        category: 'groceries',
        date: new Date().toISOString().split('T')[0]
      });
      loadTransactions();
      loadCashflowStatement();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create transaction');
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setSuccess('Generating PDF...');
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      
      const response = await downloadCashflowPDF(params);
      
      // Create blob and download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `cashflow-statement-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      setSuccess('PDF downloaded successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to download PDF');
    }
  };

  const getTypeBadge = (type) => {
    return type === 'credit' ? 'success' : 'danger';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      groceries: '🛒',
      subscription: '📅',
      refund: '💰',
      purchase: '🛍️',
      other: '📝'
    };
    return icons[category] || '📝';
  };

  if (loading && transactions.length === 0) {
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
    <Container className="my-5 fade-in">
      <Row className="mb-4">
        <Col>
          <h2 className="text-white">📊 Financial Dashboard</h2>
          <p className="text-muted">Track your income and expenses</p>
        </Col>
        <Col className="text-end">
          <Button variant="success" className="me-2" onClick={handleDownloadPDF}>
            📄 Download PDF
          </Button>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            ➕ Add Transaction
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      {/* Cashflow Summary Cards */}
      {statement && (
        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center border-success glow-effect">
              <Card.Body>
                <Card.Title className="text-success">
                  <span className="floating-icon">💰</span> Total Credits
                </Card.Title>
                <h3 className="text-success">${statement.summary?.totalCredits?.toFixed(2) || '0.00'}</h3>
                <small className="text-muted">Income</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center border-danger glow-effect" style={{ animationDelay: '1s' }}>
              <Card.Body>
                <Card.Title className="text-danger">
                  <span className="floating-icon" style={{ animationDelay: '2s' }}>💸</span> Total Debits
                </Card.Title>
                <h3 className="text-danger">${statement.summary?.totalDebits?.toFixed(2) || '0.00'}</h3>
                <small className="text-muted">Expenses</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={`text-center border-${statement.summary?.netCashflow >= 0 ? 'primary' : 'warning'} glow-effect`} style={{ animationDelay: '3s' }}>
              <Card.Body>
                <Card.Title className={`text-${statement.summary?.netCashflow >= 0 ? 'primary' : 'warning'}`}>
                  <span className="floating-icon">📈</span> Net Cashflow
                </Card.Title>
                <h3 className={`text-${statement.summary?.netCashflow >= 0 ? 'primary' : 'warning'}`}>
                  ${statement.summary?.netCashflow?.toFixed(2) || '0.00'}
                </h3>
                <small className="text-muted">Balance</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="credit">Credit (Income)</option>
                  <option value="debit">Debit (Expense)</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="groceries">Groceries</option>
                  <option value="subscription">Subscription</option>
                  <option value="refund">Refund</option>
                  <option value="purchase">Purchase</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
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
        </Card.Body>
      </Card>

      {/* Transactions Table */}
      <Card>
        <Card.Header>
          <h5 className="mb-0 text-white">💳 Transaction History</h5>
        </Card.Header>
        <Card.Body>
          {transactions.length === 0 ? (
            <Alert variant="info">No transactions found. Add your first transaction to get started!</Alert>
          ) : (
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td>{new Date(transaction.date).toLocaleDateString()}</td>
                      <td>{transaction.description}</td>
                      <td>
                        <span className="me-2">{getCategoryIcon(transaction.category)}</span>
                        {transaction.category}
                      </td>
                      <td>
                        <Badge bg={getTypeBadge(transaction.type)}>
                          {transaction.type.toUpperCase()}
                        </Badge>
                      </td>
                      <td className={transaction.type === 'credit' ? 'text-success' : 'text-danger'}>
                        {transaction.type === 'credit' ? '+' : '-'}
                        ${transaction.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Create Transaction Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateTransaction}>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="credit">Credit (Income)</option>
                <option value="debit">Debit (Expense)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                placeholder="0.00"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                placeholder="Enter transaction description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="groceries">Groceries</option>
                <option value="subscription">Subscription</option>
                <option value="refund">Refund</option>
                <option value="purchase">Purchase</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Add Transaction
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Financial;

