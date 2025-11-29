import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, ListGroup, Badge, Alert, Spinner, Tabs, Tab } from 'react-bootstrap';
import { getRecipes, getRecommendedRecipes, createRecipe } from '../services/recipeService';
import { useAuth } from '../context/AuthContext';
import { getProducts } from '../services/productService';

const Recipes = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('');
  
  // Form state for creating recipe
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    instructions: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    ingredients: [],
    dietaryTags: [],
    image: ''
  });

  useEffect(() => {
    loadRecipes();
    loadProducts();
    if (user) {
      loadRecommendedRecipes();
    }
  }, [user]);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (dietaryFilter) params.dietaryTags = dietaryFilter;
      
      const response = await getRecipes(params);
      // Handle API response structure
      let recipesData = [];
      if (response) {
        if (response.success && response.data && Array.isArray(response.data)) {
          recipesData = response.data;
        } else if (response.data && Array.isArray(response.data)) {
          recipesData = response.data;
        } else if (Array.isArray(response)) {
          recipesData = response;
        }
      }
      setRecipes(recipesData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  const loadRecommendedRecipes = async () => {
    try {
      const response = await getRecommendedRecipes();
      // Handle API response structure
      let recipesData = [];
      if (response) {
        if (response.success && response.data && Array.isArray(response.data)) {
          recipesData = response.data;
        } else if (response.data && Array.isArray(response.data)) {
          recipesData = response.data;
        } else if (Array.isArray(response)) {
          recipesData = response;
        }
      }
      setRecommendedRecipes(recipesData);
    } catch (err) {
      console.error('Failed to load recommended recipes:', err);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      // Handle API response structure
      let productsData = [];
      if (response) {
        if (response.success && response.data && Array.isArray(response.data)) {
          productsData = response.data;
        } else if (response.data && Array.isArray(response.data)) {
          productsData = response.data;
        } else if (Array.isArray(response)) {
          productsData = response;
        }
      }
      setProducts(productsData);
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadRecipes();
  };

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  };

  const addIngredient = (productId) => {
    const product = products.find(p => p._id === productId);
    if (product && !formData.ingredients.find(i => i.productId === productId)) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, {
          productId: productId,
          name: product.name,
          quantity: '',
          unit: ''
        }]
      });
    }
  };

  const removeIngredient = (productId) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter(i => i.productId !== productId)
    });
  };

  const updateIngredient = (productId, field, value) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.map(i =>
        i.productId === productId ? { ...i, [field]: value } : i
      )
    });
  };

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await createRecipe(formData);
      setSuccess('Recipe created successfully!');
      setShowCreateModal(false);
      setFormData({
        name: '',
        description: '',
        instructions: '',
        prepTime: '',
        cookTime: '',
        servings: '',
        ingredients: [],
        dietaryTags: [],
        image: ''
      });
      loadRecipes();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create recipe');
    }
  };

  const toggleDietaryTag = (tag) => {
    if (formData.dietaryTags.includes(tag)) {
      setFormData({
        ...formData,
        dietaryTags: formData.dietaryTags.filter(t => t !== tag)
      });
    } else {
      setFormData({
        ...formData,
        dietaryTags: [...formData.dietaryTags, tag]
      });
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
          <h2 className="fade-in">🍳 Recipes</h2>
          <p className="text-muted">Discover delicious recipes and cooking ideas</p>
        </Col>
        {user && user.role === 'admin' && (
          <Col className="text-end">
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              ➕ Create Recipe
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
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Select
                    value={dietaryFilter}
                    onChange={(e) => setDietaryFilter(e.target.value)}
                  >
                    <option value="">All Dietary Preferences</option>
                    <option value="gluten-free">Gluten-Free</option>
                    <option value="vegan">Vegan</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="keto">Keto</option>
                    <option value="paleo">Paleo</option>
                    <option value="dairy-free">Dairy-Free</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Button variant="primary" type="submit" className="w-100">
                  🔍 Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Recipe Tabs */}
      <Tabs defaultActiveKey="all" className="mb-4">
        <Tab eventKey="all" title="All Recipes">
          <Row>
            {recipes.length === 0 ? (
              <Col>
                <Alert variant="info">No recipes found. Try adjusting your filters.</Alert>
              </Col>
            ) : (
              recipes.map((recipe) => (
                <Col key={recipe._id} md={6} lg={4} className="mb-4">
                  <Card className="h-100 product-card">
                    {recipe.image ? (
                      <Card.Img
                        variant="top"
                        src={recipe.image}
                        alt={recipe.name}
                        className="product-image"
                        style={{ height: '200px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = `https://source.unsplash.com/300x200/?recipe,${encodeURIComponent(recipe.name)}`;
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          height: '200px',
                          background: `linear-gradient(135deg, var(--primary-color), var(--accent-purple))`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          fontSize: '3rem'
                        }}
                      >
                        🍳
                      </div>
                    )}
                    <Card.Body>
                      <Card.Title>{recipe.name}</Card.Title>
                      <Card.Text className="text-muted">
                        {recipe.description?.substring(0, 100)}...
                      </Card.Text>
                      <div className="mb-2">
                        {recipe.dietaryTags?.map((tag) => (
                          <Badge key={tag} bg="success" className="me-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="d-flex justify-content-between text-muted small">
                        <span>⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                        <span>🍽️ {recipe.servings} servings</span>
                      </div>
                      <Button
                        variant="outline-primary"
                        className="mt-3 w-100"
                        onClick={() => openRecipeModal(recipe)}
                      >
                        View Recipe
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Tab>

        {user && (
          <Tab eventKey="recommended" title="Recommended For You">
            <Row>
              {recommendedRecipes.length === 0 ? (
                <Col>
                  <Alert variant="info">
                    No personalized recommendations yet. Add items to your shopping list to get recipe suggestions!
                  </Alert>
                </Col>
              ) : (
                recommendedRecipes.map((recipe) => (
                  <Col key={recipe._id} md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                      {recipe.image && (
                        <Card.Img
                          variant="top"
                          src={recipe.image}
                          alt={recipe.name}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                      )}
                      <Card.Body>
                        <Card.Title>{recipe.name}</Card.Title>
                        <Card.Text className="text-muted">
                          {recipe.description?.substring(0, 100)}...
                        </Card.Text>
                        <div className="mb-2">
                          {recipe.dietaryTags?.map((tag) => (
                            <Badge key={tag} bg="success" className="me-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          variant="outline-primary"
                          className="mt-3 w-100"
                          onClick={() => openRecipeModal(recipe)}
                        >
                          View Recipe
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Tab>
        )}
      </Tabs>

      {/* Recipe Detail Modal */}
      <Modal show={showRecipeModal} onHide={() => setShowRecipeModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedRecipe?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRecipe && (
            <>
              {selectedRecipe.image && (
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.name}
                  className="img-fluid mb-3 rounded"
                  style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }}
                />
              )}
              <p>{selectedRecipe.description}</p>
              
              <div className="mb-3">
                <strong>Dietary Tags:</strong>{' '}
                {selectedRecipe.dietaryTags?.map((tag) => (
                  <Badge key={tag} bg="success" className="me-1">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Row className="mb-3">
                <Col>
                  <strong>Prep Time:</strong> {selectedRecipe.prepTime} min
                </Col>
                <Col>
                  <strong>Cook Time:</strong> {selectedRecipe.cookTime} min
                </Col>
                <Col>
                  <strong>Servings:</strong> {selectedRecipe.servings}
                </Col>
              </Row>

              <h5 className="mt-4">Ingredients</h5>
              <ListGroup className="mb-4">
                {selectedRecipe.ingredients?.map((ingredient, index) => (
                  <ListGroup.Item key={index}>
                    {ingredient.quantity} {ingredient.unit} {ingredient.productId?.name || ingredient.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <h5>Instructions</h5>
              <div style={{ whiteSpace: 'pre-line' }}>
                {selectedRecipe.instructions}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRecipeModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Recipe Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateRecipe}>
            <Form.Group className="mb-3">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Prep Time (min)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.prepTime}
                    onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Cook Time (min)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.cookTime}
                    onChange={(e) => setFormData({ ...formData, cookTime: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Servings</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.servings}
                    onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dietary Tags</Form.Label>
              <div>
                {['gluten-free', 'vegan', 'vegetarian', 'keto', 'paleo', 'dairy-free'].map(tag => (
                  <Form.Check
                    key={tag}
                    inline
                    type="checkbox"
                    label={tag}
                    checked={formData.dietaryTags.includes(tag)}
                    onChange={() => toggleDietaryTag(tag)}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Add Ingredients</Form.Label>
              <Form.Select onChange={(e) => e.target.value && addIngredient(e.target.value)}>
                <option value="">Select a product...</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {formData.ingredients.length > 0 && (
              <div className="mb-3">
                <h6>Ingredients:</h6>
                <ListGroup>
                  {formData.ingredients.map((ingredient) => (
                    <ListGroup.Item key={ingredient.productId}>
                      <Row>
                        <Col md={4}>
                          <strong>{ingredient.name}</strong>
                        </Col>
                        <Col md={3}>
                          <Form.Control
                            type="text"
                            placeholder="Quantity"
                            value={ingredient.quantity}
                            onChange={(e) => updateIngredient(ingredient.productId, 'quantity', e.target.value)}
                            size="sm"
                          />
                        </Col>
                        <Col md={3}>
                          <Form.Control
                            type="text"
                            placeholder="Unit"
                            value={ingredient.unit}
                            onChange={(e) => updateIngredient(ingredient.productId, 'unit', e.target.value)}
                            size="sm"
                          />
                        </Col>
                        <Col md={2}>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeIngredient(ingredient.productId)}
                          >
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                required
                placeholder="Enter cooking instructions, one step per line..."
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Create Recipe
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Recipes;

