
# Bootstrap 5 Setup Guide for SmartBasket

## Installation

### Option 1: Using npm (Recommended)
```bash
cd frontend
npm install bootstrap react-bootstrap
```

### Option 2: Using CDN (Alternative)
Add to `public/index.html`:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

## Setup in React App

### 1. Import Bootstrap CSS
In `src/index.js`:
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 2. Using Bootstrap Components

#### Option A: Regular Bootstrap Classes
```javascript
function ProductCard({ product }) {
  return (
    <div className="card mb-3">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  );
}
```

#### Option B: React-Bootstrap Components
```javascript
import { Card, Button } from 'react-bootstrap';

function ProductCard({ product }) {
  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}
```

## Common Bootstrap Components for SmartBasket

### Navigation Bar
```javascript
import { Navbar, Nav, Container } from 'react-bootstrap';

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">SmartBasket</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/recipes">Recipes</Nav.Link>
            <Nav.Link href="/subscriptions">Subscriptions</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
```

### Product Grid
```javascript
import { Container, Row, Col } from 'react-bootstrap';

function ProductList({ products }) {
  return (
    <Container>
      <Row>
        {products.map(product => (
          <Col md={4} sm={6} key={product._id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
```

### Forms (Login/Register)
```javascript
import { Form, Button, Card } from 'react-bootstrap';

function LoginForm() {
  return (
    <Card className="w-50 mx-auto mt-5">
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
```

### Modal (for Confirmations)
```javascript
import { Modal, Button } from 'react-bootstrap';

function ConfirmModal({ show, onHide, onConfirm }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to proceed?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
```

### Tables (for Transaction History, Admin)
```javascript
import { Table } from 'react-bootstrap';

function TransactionTable({ transactions }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction._id}>
            <td>{transaction.date}</td>
            <td>{transaction.type}</td>
            <td>${transaction.amount}</td>
            <td>{transaction.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
```

### Alerts (for Notifications)
```javascript
import { Alert } from 'react-bootstrap';

function NotificationAlert({ message, variant = 'success' }) {
  return (
    <Alert variant={variant}>
      {message}
    </Alert>
  );
}
```

### Badges (for Tags, Status)
```javascript
import { Badge } from 'react-bootstrap';

function ProductTags({ tags }) {
  return (
    <div>
      {tags.map(tag => (
        <Badge bg="secondary" className="me-2" key={tag}>
          {tag}
        </Badge>
      ))}
    </div>
  );
}
```

## Custom Styling with Bootstrap

### Custom CSS Variables
Create `src/custom-bootstrap.css`:
```css
:root {
  --bs-primary: #28a745; /* Green for grocery theme */
  --bs-secondary: #6c757d;
  --bs-success: #28a745;
  --bs-danger: #dc3545;
}

/* Custom styles */
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.product-card {
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
}
```

Import in `src/index.js`:
```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom-bootstrap.css';
```

## Bootstrap Utilities for SmartBasket

### Spacing
- `mb-3` - margin bottom
- `mt-4` - margin top
- `p-3` - padding
- `mx-auto` - center horizontally

### Display
- `d-flex` - flexbox
- `d-none` - hide
- `d-block` - block display

### Colors
- `text-primary` - primary text color
- `bg-light` - light background
- `border` - border

### Responsive
- `col-md-6` - 6 columns on medium screens
- `col-sm-12` - 12 columns on small screens
- `d-md-none` - hide on medium screens

## Useful Bootstrap Components for Each Feature

### Products Page
- Cards, Grid system, Badges, Buttons

### Shopping Lists
- List groups, Checkboxes, Buttons

### Recipes
- Cards, Accordion, Images

### Subscriptions
- Cards, Forms, Badges (for status)

### Financial Dashboard
- Tables, Cards, Progress bars, Charts (Chart.js)

### Blog
- Cards, Pagination, Images

### Admin Dashboard
- Tables, Cards, Modals, Forms, Alerts

## Resources

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [React-Bootstrap Documentation](https://react-bootstrap.github.io/)
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Free icon library

## Tips

1. **Use Container/Row/Col** for responsive layouts
2. **Combine Bootstrap with custom CSS** for unique styling
3. **Use React-Bootstrap** for better React integration
4. **Leverage Bootstrap utilities** for quick styling
5. **Test responsiveness** on different screen sizes

