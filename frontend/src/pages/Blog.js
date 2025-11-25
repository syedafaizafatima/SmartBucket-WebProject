import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert, Spinner } from 'react-bootstrap';
import { getBlogs, getFeaturedBlogs, createBlog } from '../services/blogService';
import { useAuth } from '../context/AuthContext';

const Blog = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagsFilter, setTagsFilter] = useState('');
  
  // Form state for creating blog
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    tags: [],
    featured: false
  });

  useEffect(() => {
    loadBlogs();
    loadFeaturedBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (tagsFilter) params.tags = tagsFilter;
      
      const response = await getBlogs(params);
      setBlogs(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const loadFeaturedBlogs = async () => {
    try {
      const response = await getFeaturedBlogs();
      setFeaturedBlogs(response.data.data || []);
    } catch (err) {
      console.error('Failed to load featured blogs:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadBlogs();
  };

  const openBlogModal = (blog) => {
    setSelectedBlog(blog);
    setShowBlogModal(true);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await createBlog(formData);
      setSuccess('Blog post created successfully!');
      setShowCreateModal(false);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        image: '',
        tags: [],
        featured: false
      });
      loadBlogs();
      loadFeaturedBlogs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog post');
    }
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData({
          ...formData,
          tags: [...formData.tags, newTag]
        });
      }
      e.target.value = '';
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
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
          <h2>Blog</h2>
          <p className="text-muted">Read our latest articles and tips</p>
        </Col>
        {user && user.role === 'admin' && (
          <Col className="text-end">
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              Create Blog Post
            </Button>
          </Col>
        )}
      </Row>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      {/* Search and Filter */}
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Filter by tags (comma-separated)"
                    value={tagsFilter}
                    onChange={(e) => setTagsFilter(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Button variant="primary" type="submit" className="w-100">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Featured Blogs */}
      {featuredBlogs.length > 0 && (
        <>
          <h4 className="mb-3">Featured Posts</h4>
          <Row className="mb-5">
            {featuredBlogs.map((blog) => (
              <Col key={blog._id} md={6} className="mb-4">
                <Card className="h-100 border-primary">
                  {blog.image && (
                    <Card.Img
                      variant="top"
                      src={blog.image}
                      alt={blog.title}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                  )}
                  <Card.Body>
                    <Badge bg="primary" className="mb-2">Featured</Badge>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {blog.excerpt || blog.content?.substring(0, 150)}...
                    </Card.Text>
                    <div className="mb-2">
                      {blog.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} bg="secondary" className="me-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        👁️ {blog.views || 0} views
                      </small>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => openBlogModal(blog)}
                      >
                        Read More
                      </Button>
                    </div>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <small>
                      By {blog.author?.name || 'Anonymous'} • {new Date(blog.publishDate).toLocaleDateString()}
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* All Blog Posts */}
      <h4 className="mb-3">All Posts</h4>
      <Row>
        {blogs.length === 0 ? (
          <Col>
            <Alert variant="info">No blog posts found. Check back later for new content!</Alert>
          </Col>
        ) : (
          blogs.map((blog) => (
            <Col key={blog._id} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                {blog.image && (
                  <Card.Img
                    variant="top"
                    src={blog.image}
                    alt={blog.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {blog.excerpt || blog.content?.substring(0, 100)}...
                  </Card.Text>
                  <div className="mb-2">
                    {blog.tags?.slice(0, 3).map((tag) => (
                      <Badge key={tag} bg="secondary" className="me-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      👁️ {blog.views || 0} views
                    </small>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => openBlogModal(blog)}
                    >
                      Read More
                    </Button>
                  </div>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <small>
                    By {blog.author?.name || 'Anonymous'} • {new Date(blog.publishDate).toLocaleDateString()}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Blog Detail Modal */}
      <Modal show={showBlogModal} onHide={() => setShowBlogModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedBlog?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog && (
            <>
              {selectedBlog.image && (
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="img-fluid mb-3 rounded"
                  style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                />
              )}
              
              <div className="mb-3">
                <small className="text-muted">
                  By {selectedBlog.author?.name || 'Anonymous'} • {new Date(selectedBlog.publishDate).toLocaleDateString()} • {selectedBlog.views || 0} views
                </small>
              </div>

              <div className="mb-3">
                {selectedBlog.tags?.map((tag) => (
                  <Badge key={tag} bg="secondary" className="me-1">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
                {selectedBlog.content}
              </div>

              {selectedBlog.author?.biography && (
                <Card className="mt-4 bg-light">
                  <Card.Body>
                    <h6>About the Author</h6>
                    <div className="d-flex align-items-start">
                      {selectedBlog.author.photo && (
                        <img
                          src={selectedBlog.author.photo}
                          alt={selectedBlog.author.name}
                          className="rounded-circle me-3"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                      )}
                      <div>
                        <strong>{selectedBlog.author.name}</strong>
                        <p className="mb-0 mt-1">{selectedBlog.author.biography}</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBlogModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Blog Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Blog Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateBlog}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Enter blog post title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Excerpt (Short Description)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief summary of the blog post"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                placeholder="Write your blog post content here..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Featured Image URL</Form.Label>
              <Form.Control
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                onKeyDown={handleTagInput}
                placeholder="Type a tag and press Enter"
              />
              <Form.Text className="text-muted">
                Press Enter to add each tag
              </Form.Text>
              {formData.tags.length > 0 && (
                <div className="mt-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      bg="secondary"
                      className="me-1"
                      style={{ cursor: 'pointer' }}
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Mark as Featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Publish Blog Post
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Blog;

