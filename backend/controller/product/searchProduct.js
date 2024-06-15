const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, "i", "g");
    const product = await productModel.find({
      $or: [{ productName: regex }, { category: regex }],
    });

    res.json({
      data: product,
      success: true,
      error: false,
      message: "product avilable",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: false,
      success: true,
    });
  }
};

module.exports = searchProduct;
