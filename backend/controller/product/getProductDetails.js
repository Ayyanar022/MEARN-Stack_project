const productModel = require("../../models/productModel");

const getProductDetails = async (req, res) => {
  try {
    const { peoductId } = req.body;
    console.log("id", peoductId);

    const response = await productModel.findById(peoductId);
    res.json({ data: response, message: "OK", success: true, error: false });
   } catch (err) {
    res.json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};

module.exports = getProductDetails;
