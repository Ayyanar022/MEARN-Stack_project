const addToCartModule = require("../../models/cartProduct");

const countCartController = async (req, res) => {
  try {
    const userId = req.userId;
    const count = await addToCartModule.countDocuments({ userId });
    res.json({
      data: {
        count: count,
      },
      error: false,
      success: true,
      warning: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      suucess: false,
      error: true,
      warning: false,
    });
  }
};

module.exports = countCartController;
