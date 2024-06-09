const addToCartModule = require("../../models/cartProduct");

const deleteCartProduct = async (req, res) => {
  try {
    const currentUser = req.userId;
    const cartProductId = req.body._id;
    console.log("cartProductId", req.body);
    const response = await addToCartModule.deleteOne({ _id: cartProductId });
    res.json({
      message: "product Deleted",
      error: false,
      success: true,
      data: response,
    });
  } catch (err) {
    res.json({
      message: err.message,
      suucess: false,
      error: false,
    });
  }
};

module.exports = deleteCartProduct;
