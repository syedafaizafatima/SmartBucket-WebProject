import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tabs, Tab, Badge } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { getUserProfile, updateUserProfile, updatePassword } from '../services/userService';

const Profile = () => {
  const { user: contextUser, updateUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    photo: '',
    biography: '',
    dietaryPreferences: []
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const dietaryOptions = [
    'gluten-free',
    'vegan',
    'vegetarian',
    'keto',
    'paleo',
    'dairy-free',
    'nut-free',
    'halal',
    'kosher'
  ];

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await getUserProfile();
      const userData = response.data;
      setUser(userData);
      setProfileData({
        name: userData.name || '',
        email: userData.email || '',
        photo: userData.photo || '',
        biography: userData.biography || '',
        dietaryPreferences: userData.dietaryPreferences || []
      });
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleDietaryPreferenceToggle = (preference) => {
    const current = profileData.dietaryPreferences || [];
    const updated = current.includes(preference)
      ? current.filter(p => p !== preference)
      : [...current, preference];
    
    setProfileData({
      ...profileData,
      dietaryPreferences: updated
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await updateUserProfile(profileData);
      setUser(response.data);
      updateUser(response.data);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setSuccess('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    }
  };

  if (loading) {
    return (
      <Container className="my-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={8} className="mx-auto">
          <h2 className="mb-4">My Profile</h2>
          
          {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
          {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

          <Tabs defaultActiveKey="profile" className="mb-4">
            {/* Profile Tab */}
            <Tab eventKey="profile" title="Profile Information">
              <Card>
                <Card.Body>
                  <Form onSubmit={handleProfileSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Profile Photo URL</Form.Label>
                      <Form.Control
                        type="url"
                        name="photo"
                        value={profileData.photo}
                        onChange={handleProfileChange}
                        placeholder="https://example.com/photo.jpg"
                      />
                      {profileData.photo && (
                        <div className="mt-2">
                          <img 
                            src={profileData.photo} 
                            alt="Profile" 
                            style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Biography</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="biography"
                        value={profileData.biography}
                        onChange={handleProfileChange}
                        placeholder="Tell us about yourself..."
                        maxLength={500}
                      />
                      <Form.Text className="text-muted">
                        {profileData.biography.length}/500 characters
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Dietary Preferences</Form.Label>
                      <div className="d-flex flex-wrap gap-2">
                        {dietaryOptions.map((option) => (
                          <Badge
                            key={option}
                            bg={profileData.dietaryPreferences.includes(option) ? 'primary' : 'secondary'}
                            style={{ cursor: 'pointer', fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                            onClick={() => handleDietaryPreferenceToggle(option)}
                          >
                            {option}
                          </Badge>
                        ))}
                      </div>
                      <Form.Text className="text-muted">
                        Click to select/deselect your dietary preferences
                      </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Update Profile
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>

            {/* Password Tab */}
            <Tab eventKey="password" title="Change Password">
              <Card>
                <Card.Body>
                  <Form onSubmit={handlePasswordSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength={6}
                      />
                      <Form.Text className="text-muted">
                        Must be at least 6 characters
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength={6}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Update Password
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
