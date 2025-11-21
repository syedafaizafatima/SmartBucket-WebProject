const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getFeaturedBlogs
} = require('../controllers/blogController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getBlogs);
router.get('/featured', getFeaturedBlogs);
router.get('/:id', getBlog);
router.post('/', protect, admin, createBlog);
router.put('/:id', protect, admin, updateBlog);
router.delete('/:id', protect, admin, deleteBlog);

module.exports = router;

