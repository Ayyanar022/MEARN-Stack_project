const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
  try {
    const filterList = req.body.filterList || [];
    const respose = await productModel.find({
      category: {
        $in: filterList,
      },
    });

    res.json({
      data: respose,
      error: false,
      success: true,
      message: "Filter product sucess",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: true,
      success: true,
    });
  }
};

module.exports = filterProductController;
