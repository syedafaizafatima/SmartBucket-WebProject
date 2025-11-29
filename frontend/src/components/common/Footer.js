import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="text-center text-lg-start mt-auto py-3" style={{ backgroundColor: 'rgba(0, 26, 51, 0.8)', color: 'rgba(255, 255, 255, 0.8)' }}>
      <Container>
        <div className="text-center">
          <p className="mb-0" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            &copy; {new Date().getFullYear()} SmartBasket. All rights reserved.
          </p>
          <p className="mb-0" style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
            Smart Grocery Shopping App
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

