const GroupBuy = require('../models/GroupBuy');
const Product = require('../models/Product');

// @desc    Get all active group buys
// @route   GET /api/group-buys
// @access  Public
exports.getGroupBuys = async (req, res) => {
  try {
    const { status, product, category } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    } else {
      // Default to active group buys
      query.status = 'active';
      query.expiresAt = { $gt: new Date() };
    }

    if (product) {
      query.product = product;
    }

    let groupBuys = await GroupBuy.find(query)
      .populate('product', 'name images category brand')
      .populate('creator', 'name profilePhoto')
      .populate('participants.user', 'name profilePhoto')
      .sort('-createdAt');

    // Filter by category if specified
    if (category) {
      groupBuys = groupBuys.filter(gb => gb.product?.category === category);
    }

    res.json({
      success: true,
      count: groupBuys.length,
      data: groupBuys
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single group buy
// @route   GET /api/group-buys/:id
// @access  Public
exports.getGroupBuy = async (req, res) => {
  try {
    const groupBuy = await GroupBuy.findById(req.params.id)
      .populate('product', 'name description images category brand basePrice')
      .populate('creator', 'name profilePhoto email')
      .populate('participants.user', 'name profilePhoto');

    if (!groupBuy) {
      return res.status(404).json({
        success: false,
        message: 'Group buy not found'
      });
    }

    res.json({
      success: true,
      data: groupBuy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create group buy
// @route   POST /api/group-buys
// @access  Private
exports.createGroupBuy = async (req, res) => {
  try {
    const {
      product,
      title,
      description,
      targetQuantity,
      originalPrice,
      groupPrice,
      expiresAt,
      deliveryDate,
      deliveryAddress,
      paymentMethod
    } = req.body;

    // Verify product exists
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Validate group price is less than original price
    if (groupPrice >= originalPrice) {
      return res.status(400).json({
        success: false,
        message: 'Group price must be less than original price'
      });
    }

    const groupBuy = await GroupBuy.create({
      product,
      creator: req.user.id,
      title,
      description,
      targetQuantity,
      originalPrice,
      groupPrice,
      expiresAt,
      deliveryDate,
      deliveryAddress,
      paymentMethod
    });

    const populatedGroupBuy = await GroupBuy.findById(groupBuy._id)
      .populate('product', 'name images category')
      .populate('creator', 'name profilePhoto');

    res.status(201).json({
      success: true,
      data: populatedGroupBuy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update group buy
// @route   PUT /api/group-buys/:id
// @access  Private
exports.updateGroupBuy = async (req, res) => {
  try {
    let groupBuy = await GroupBuy.findById(req.params.id);

    if (!groupBuy) {
      return res.status(404).json({
        success: false,
        message: 'Group buy not found'
      });
    }

    // Make sure user is creator
    if (groupBuy.creator.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this group buy'
      });
    }

    // Don't allow updates if already completed
    if (groupBuy.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update completed group buy'
      });
    }

    const {
      title,
      description,
      targetQuantity,
      expiresAt,
      deliveryDate,
      deliveryAddress,
      paymentMethod,
      status
    } = req.body;

    groupBuy = await GroupBuy.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        targetQuantity,
        expiresAt,
        deliveryDate,
        deliveryAddress,
        paymentMethod,
        status
      },
      {
        new: true,
        runValidators: true
      }
    )
      .populate('product', 'name images category')
      .populate('creator', 'name profilePhoto');

    res.json({
      success: true,
      data: groupBuy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete group buy
// @route   DELETE /api/group-buys/:id
// @access  Private
exports.deleteGroupBuy = async (req, res) => {
  try {
    const groupBuy = await GroupBuy.findById(req.params.id);

    if (!groupBuy) {
      return res.status(404).json({
        success: false,
        message: 'Group buy not found'
      });
    }

    // Make sure user is creator or admin
    if (
      groupBuy.creator.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this group buy'
      });
    }

    await groupBuy.remove();

    res.json({
      success: true,
      message: 'Group buy deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Join group buy
// @route   POST /api/group-buys/:id/join
// @access  Private
exports.joinGroupBuy = async (req, res) => {
  try {
    const groupBuy = await GroupBuy.findById(req.params.id);

    if (!groupBuy) {
      return res.status(404).json({
        success: false,
        message: 'Group buy not found'
      });
    }

    // Check if expired
    if (groupBuy.isExpired()) {
      return res.status(400).json({
        success: false,
        message: 'This group buy has expired'
      });
    }

    // Check if already full
    if (groupBuy.isFull()) {
      return res.status(400).json({
        success: false,
        message: 'This group buy is already full'
      });
    }

    // Check if user already joined
    const alreadyJoined = groupBuy.participants.some(
      p => p.user.toString() === req.user.id
    );

    if (alreadyJoined) {
      return res.status(400).json({
        success: false,
        message: 'You have already joined this group buy'
      });
    }

    const { quantity = 1 } = req.body;

    await groupBuy.addParticipant(req.user.id, quantity);

    const updatedGroupBuy = await GroupBuy.findById(groupBuy._id)
      .populate('product', 'name images category')
      .populate('creator', 'name profilePhoto')
      .populate('participants.user', 'name profilePhoto');

    res.json({
      success: true,
      data: updatedGroupBuy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Leave group buy
// @route   POST /api/group-buys/:id/leave
// @access  Private
exports.leaveGroupBuy = async (req, res) => {
  try {
    const groupBuy = await GroupBuy.findById(req.params.id);

    if (!groupBuy) {
      return res.status(404).json({
        success: false,
        message: 'Group buy not found'
      });
    }

    // Check if user is participant
    const isParticipant = groupBuy.participants.some(
      p => p.user.toString() === req.user.id
    );

    if (!isParticipant) {
      return res.status(400).json({
        success: false,
        message: 'You are not a participant in this group buy'
      });
    }

    // Creator cannot leave
    if (groupBuy.creator.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Creator cannot leave the group buy. Please delete it instead.'
      });
    }

    await groupBuy.removeParticipant(req.user.id);

    const updatedGroupBuy = await GroupBuy.findById(groupBuy._id)
      .populate('product', 'name images category')
      .populate('creator', 'name profilePhoto')
      .populate('participants.user', 'name profilePhoto');

    res.json({
      success: true,
      data: updatedGroupBuy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user's group buys
// @route   GET /api/group-buys/user/me
// @access  Private
exports.getUserGroupBuys = async (req, res) => {
  try {
    // Find group buys where user is creator or participant
    const groupBuys = await GroupBuy.find({
      $or: [
        { creator: req.user.id },
        { 'participants.user': req.user.id }
      ]
    })
      .populate('product', 'name images category')
      .populate('creator', 'name profilePhoto')
      .sort('-createdAt');

    res.json({
      success: true,
      count: groupBuys.length,
      data: groupBuys
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

