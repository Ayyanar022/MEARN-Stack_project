const addToCartModule = require("../../models/cartProduct");

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req.userId;
    const allProduct = await addToCartModule
      .find({
        userId: currentUser,
      })
      .populate("productId");

    res.json({
      data: allProduct,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartViewProduct;
