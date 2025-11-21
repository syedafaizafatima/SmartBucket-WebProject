const Transaction = require('../models/Transaction');
let PDFDocument;
try {
  PDFDocument = require('pdfkit');
} catch (error) {
  console.warn('PDFKit not installed. PDF generation will not work.');
}

// @desc    Get all transactions for user
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = async (req, res, next) => {
  try {
    const query = { userId: req.user.id };
    
    // Filter by type
    if (req.query.type) {
      query.type = req.query.type;
    }
    
    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Date range
    if (req.query.startDate || req.query.endDate) {
      query.date = {};
      if (req.query.startDate) query.date.$gte = new Date(req.query.startDate);
      if (req.query.endDate) query.date.$lte = new Date(req.query.endDate);
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single transaction
// @route   GET /api/transactions/:id
// @access  Private
exports.getTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create transaction
// @route   POST /api/transactions
// @access  Private
exports.createTransaction = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    const transaction = await Transaction.create(req.body);

    res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get cashflow statement
// @route   GET /api/transactions/statement
// @access  Private
exports.getCashflowStatement = async (req, res, next) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date(new Date().getFullYear(), 0, 1);
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();

    const transactions = await Transaction.find({
      userId: req.user.id,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    // Calculate totals
    const credits = transactions
      .filter(t => t.type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const debits = transactions
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + t.amount, 0);

    const netCashflow = credits - debits;

    res.status(200).json({
      success: true,
      data: {
        period: {
          startDate,
          endDate
        },
        summary: {
          totalCredits: credits,
          totalDebits: debits,
          netCashflow
        },
        transactions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Generate cashflow PDF
// @route   GET /api/transactions/statement/pdf
// @access  Private
exports.generateCashflowPDF = async (req, res, next) => {
  try {
    if (!PDFDocument) {
      return res.status(503).json({
        success: false,
        message: 'PDF generation not available. Please install pdfkit: npm install pdfkit'
      });
    }
    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date(new Date().getFullYear(), 0, 1);
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();

    const transactions = await Transaction.find({
      userId: req.user.id,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    const User = require('../models/User');
    const user = await User.findById(req.user.id);

    // Calculate totals
    const credits = transactions
      .filter(t => t.type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const debits = transactions
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + t.amount, 0);

    const netCashflow = credits - debits;

    // Create PDF
    const doc = new PDFDocument();
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=cashflow-statement-${Date.now()}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // PDF Content
    doc.fontSize(20).text('Cashflow Statement', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`User: ${user.name}`, { align: 'left' });
    doc.text(`Email: ${user.email}`, { align: 'left' });
    doc.text(`Period: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`, { align: 'left' });
    doc.moveDown();

    // Summary
    doc.fontSize(16).text('Summary', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12);
    doc.text(`Total Credits: $${credits.toFixed(2)}`);
    doc.text(`Total Debits: $${debits.toFixed(2)}`);
    doc.text(`Net Cashflow: $${netCashflow.toFixed(2)}`, { underline: true });
    doc.moveDown();

    // Transactions
    doc.fontSize(16).text('Transactions', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(10);

    transactions.forEach((transaction, index) => {
      if (index > 0 && index % 25 === 0) {
        doc.addPage();
      }
      doc.text(`${transaction.date.toLocaleDateString()} | ${transaction.type.toUpperCase()} | $${transaction.amount.toFixed(2)} | ${transaction.description}`);
      doc.moveDown(0.3);
    });

    // Finalize PDF
    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

