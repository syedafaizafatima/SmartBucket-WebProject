import React, { useState, useEffect, useRef } from 'react';
import { Offcanvas, Form, Button, ListGroup, Badge, InputGroup } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ show, onHide }) => {
  const { user, isAuthenticated } = useAuth();
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (show) {
      setMessages([{
        type: 'bot',
        text: isAuthenticated 
          ? `Hello ${user?.name || 'there'}! 👋 How can I help you today?`
          : 'Hello! 👋 Please login to get personalized assistance.',
        timestamp: new Date()
      }]);
    }
  }, [show, isAuthenticated, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = {
      type: 'user',
      text: question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    // Simulate AI response (can be replaced with actual API call)
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that. You can find products by using the search bar or browsing categories.",
        "I'd be happy to help! For shopping lists, go to the Shopping Lists page and click 'Create New List' or use 'Generate AI List' for smart suggestions.",
        "To set up your profile, click on your name in the top right corner and select 'Profile'. There you can add your photo, dietary preferences, and more!",
        "For recipe recommendations, visit the Recipes page. If you're logged in, you'll see personalized recommendations based on your preferences.",
        "You can track your spending in the Financial Dashboard. Add transactions to see your cashflow statement and download PDF reports.",
        "Subscriptions allow you to set up regular deliveries. Go to Subscriptions page to create one and save with automatic deliveries!",
        "To compare prices, browse the Products page. Each product shows prices from different stores so you can find the best deal.",
        "Need help with something specific? Feel free to ask me anything about SmartBasket features!"
      ];

      const botResponse = {
        type: 'bot',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
    }, 1000);
  };

  const quickQuestions = [
    "How do I create a shopping list?",
    "Where can I find recipes?",
    "How do I set up my profile?",
    "How does price comparison work?"
  ];

  const handleQuickQuestion = (q) => {
    setQuestion(q);
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" style={{ width: '400px' }}>
      <Offcanvas.Header closeButton style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
        <Offcanvas.Title>
          <span className="floating-icon">💬</span> Ask Me Anything
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        padding: 0,
        backgroundColor: 'var(--bg-dark-neon-blue)'
      }}>
        {/* Messages Area */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '1rem',
          backgroundColor: 'rgba(0, 26, 51, 0.5)'
        }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '75%',
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem',
                  backgroundColor: msg.type === 'user' 
                    ? 'var(--accent-purple)' 
                    : 'rgba(0, 102, 255, 0.3)',
                  color: 'white',
                  border: msg.type === 'bot' ? '1px solid var(--primary-color)' : 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div style={{ fontSize: '0.9rem' }}>{msg.text}</div>
                <div style={{ 
                  fontSize: '0.7rem', 
                  opacity: 0.7, 
                  marginTop: '0.25rem',
                  textAlign: 'right'
                }}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                backgroundColor: 'rgba(0, 102, 255, 0.3)',
                color: 'white'
              }}>
                <span className="pulse">💭 Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div style={{ padding: '1rem', borderTop: '1px solid rgba(0, 102, 255, 0.3)' }}>
            <div style={{ color: 'white', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <strong>💡 Quick Questions:</strong>
            </div>
            <div className="d-flex flex-column gap-2">
              {quickQuestions.map((q, idx) => (
                <Button
                  key={idx}
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleQuickQuestion(q)}
                  style={{
                    textAlign: 'left',
                    borderColor: 'var(--accent-purple)',
                    color: 'var(--secondary-color)'
                  }}
                >
                  {q}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div style={{ 
          padding: '1rem', 
          borderTop: '1px solid rgba(0, 102, 255, 0.3)',
          backgroundColor: 'rgba(0, 26, 51, 0.8)'
        }}>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder={isAuthenticated ? "Ask me anything..." : "Login to ask questions"}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={!isAuthenticated || loading}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'var(--accent-purple)',
                  color: 'white'
                }}
              />
              <Button
                variant="primary"
                type="submit"
                disabled={!isAuthenticated || loading || !question.trim()}
                style={{ borderColor: 'var(--accent-purple)' }}
              >
                ➤
              </Button>
            </InputGroup>
            {!isAuthenticated && (
              <div className="text-center mt-2">
                <small style={{ color: 'var(--secondary-color)' }}>
                  <a href="/login" style={{ color: 'var(--accent-purple)' }}>Login</a> to use the assistant
                </small>
              </div>
            )}
          </Form>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;

