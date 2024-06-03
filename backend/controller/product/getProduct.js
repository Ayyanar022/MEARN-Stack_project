const productModel = require("../../models/productModel");

const getProductConstructor = async (req, res) => {
  try {
    const allProducts = await productModel.find().sort({ createAt: -1 });
    res.json({
      message: "All Products ",
      success: true,
      error: false,
      data: allProducts,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = getProductConstructor;
