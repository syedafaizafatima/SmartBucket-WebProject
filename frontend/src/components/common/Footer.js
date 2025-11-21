import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto py-3">
      <Container>
        <div className="text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} SmartBasket. All rights reserved.
          </p>
          <p className="mb-0 text-muted" style={{ fontSize: '0.875rem' }}>
            Smart Grocery Shopping App
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

