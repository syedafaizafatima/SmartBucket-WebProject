import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tabs, Tab, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getUserProfile, updateUserProfile, updatePassword } from '../services/userService';

const Profile = () => {
  const { user: contextUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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
      const userData = response.data || response;
      setUser(userData);
      setProfileData({
        name: userData.name || '',
        email: userData.email || '',
        photo: userData.photo || '',
        biography: userData.biography || '',
        dietaryPreferences: userData.dietaryPreferences || []
      });
      if (userData.photo) {
        setImagePreview(userData.photo);
      }
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setUploadingImage(true);
    setError('');

    try {
      // Convert image to base64 for now (in production, upload to cloud storage)
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        
        // For now, we'll use a data URL. In production, upload to S3/Cloudinary/etc
        // and get the URL back
        setImagePreview(base64Image);
        setProfileData({
          ...profileData,
          photo: base64Image
        });
        setUploadingImage(false);
        setSuccess('Image uploaded successfully! Click Save Profile to update.');
      };
      reader.onerror = () => {
        setError('Failed to read image file');
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to upload image');
      setUploadingImage(false);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setProfileData({
      ...profileData,
      photo: url
    });
    if (url) {
      setImagePreview(url);
    }
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
      const updatedUser = response.data || response;
      setUser(updatedUser);
      updateUser(updatedUser);
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
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5 fade-in">
      {/* Back Button */}
      <Button 
        variant="outline-secondary" 
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </Button>

      <Row>
        <Col md={10} className="mx-auto">
          <div className="text-center mb-5">
            <div className="position-relative d-inline-block">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt={user?.name}
                  style={{ 
                    width: '180px', 
                    height: '180px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    border: '5px solid var(--accent-purple)',
                    boxShadow: '0 0 30px rgba(204, 0, 255, 0.6)',
                    marginBottom: '1rem'
                  }}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name || 'User')}&background=0066ff&color=fff&size=180`;
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary-color), var(--accent-purple))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    margin: '0 auto 1rem',
                    border: '5px solid var(--accent-purple)',
                    boxShadow: '0 0 30px rgba(204, 0, 255, 0.6)'
                  }}
                >
                  {profileData.name ? profileData.name.charAt(0).toUpperCase() : '👤'}
                </div>
              )}
            </div>
            <h2 className="mb-2 text-white">
              {user?.name || 'My Profile'}
            </h2>
            <p className="text-muted">{user?.email}</p>
          </div>
          
          {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
          {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

          <Tabs defaultActiveKey="profile" className="mb-4">
            {/* Profile Tab */}
            <Tab eventKey="profile" title="📝 Profile Information">
              <Card className="glow-effect">
                <Card.Body>
                  <Form onSubmit={handleProfileSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label className="text-white fw-bold">📷 Profile Picture</Form.Label>
                      <div className="d-flex flex-column gap-3">
                        <div>
                          <Form.Label className="btn btn-outline-primary w-100" style={{ cursor: 'pointer' }}>
                            {uploadingImage ? '⏳ Uploading...' : '📤 Upload Image'}
                            <Form.Control
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              style={{ display: 'none' }}
                              disabled={uploadingImage}
                            />
                          </Form.Label>
                        </div>
                        <div className="text-center text-muted small">OR</div>
                        <Form.Control
                          type="url"
                          name="photo"
                          value={profileData.photo}
                          onChange={handleImageUrlChange}
                          placeholder="Enter image URL (e.g., https://example.com/photo.jpg)"
                        />
                        <Form.Text className="text-muted">
                          💡 Upload an image file or paste an image URL. Max size: 5MB
                        </Form.Text>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-white">👤 Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-white">📧 Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        required
                        placeholder="Enter your email"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-white">📖 Biography</Form.Label>
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

                    <Form.Group className="mb-4">
                      <Form.Label className="text-white">🥗 Dietary Preferences</Form.Label>
                      <div className="d-flex flex-wrap gap-2">
                        {dietaryOptions.map((option) => (
                          <Badge
                            key={option}
                            bg={profileData.dietaryPreferences.includes(option) ? 'primary' : 'secondary'}
                            style={{ 
                              cursor: 'pointer', 
                              fontSize: '0.9rem', 
                              padding: '0.5rem 1rem',
                              transition: 'all 0.3s ease'
                            }}
                            onClick={() => handleDietaryPreferenceToggle(option)}
                            className={profileData.dietaryPreferences.includes(option) ? 'glow-effect' : ''}
                          >
                            {option}
                          </Badge>
                        ))}
                      </div>
                      <Form.Text className="text-muted">
                        Click to select/deselect your dietary preferences
                      </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 glow-effect" size="lg">
                      💾 Save Profile
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>

            {/* Password Tab */}
            <Tab eventKey="password" title="🔒 Change Password">
              <Card className="glow-effect">
                <Card.Body>
                  <Form onSubmit={handlePasswordSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-white">🔑 Current Password</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={showCurrentPassword ? "text" : "password"}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          required
                          placeholder="Enter your current password"
                          style={{ paddingRight: '45px' }}
                        />
                        <button
                          type="button"
                          className="btn btn-link position-absolute"
                          style={{
                            right: '5px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--accent-purple)',
                            padding: '0.25rem 0.5rem',
                            cursor: 'pointer',
                            zIndex: 10
                          }}
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? '🙈' : '👁️'}
                        </button>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-white">🆕 New Password</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                          minLength={6}
                          placeholder="Enter your new password"
                          style={{ paddingRight: '45px' }}
                        />
                        <button
                          type="button"
                          className="btn btn-link position-absolute"
                          style={{
                            right: '5px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--accent-purple)',
                            padding: '0.25rem 0.5rem',
                            cursor: 'pointer',
                            zIndex: 10
                          }}
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? '🙈' : '👁️'}
                        </button>
                      </div>
                      <Form.Text className="text-muted">
                        Must be at least 6 characters
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-white">✅ Confirm New Password</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                          minLength={6}
                          placeholder="Confirm your new password"
                          style={{ paddingRight: '45px' }}
                        />
                        <button
                          type="button"
                          className="btn btn-link position-absolute"
                          style={{
                            right: '5px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--accent-purple)',
                            padding: '0.25rem 0.5rem',
                            cursor: 'pointer',
                            zIndex: 10
                          }}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? '🙈' : '👁️'}
                        </button>
                      </div>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 glow-effect" size="lg">
                      🔒 Update Password
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
