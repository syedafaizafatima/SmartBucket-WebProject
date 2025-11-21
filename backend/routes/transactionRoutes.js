const express = require('express');
const router = express.Router();
const {
  getTransactions,
  getTransaction,
  createTransaction,
  getCashflowStatement,
  generateCashflowPDF
} = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getTransactions);
router.get('/statement', protect, getCashflowStatement);
router.get('/statement/pdf', protect, generateCashflowPDF);
router.get('/:id', protect, getTransaction);
router.post('/', protect, createTransaction);

module.exports = router;

