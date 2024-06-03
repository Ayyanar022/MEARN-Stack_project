const productModel = require("../../models/productModel");

const categoryProduct = async (req, res) => {
  try {
    const productCategory = await productModel.distinct("category");

    // Array to store one product from each category
    const productByCategory = [];

    for (const category of productCategory) {
      const product = await productModel.findOne({ category: category });

      if (product) {
        productByCategory.push(product);
      }
    }

    res.json({
      message: "Product Category",
      data: productByCategory,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};

module.exports = categoryProduct;
