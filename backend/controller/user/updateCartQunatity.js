const addToCartModule = require("../../models/cartProduct");

const updateCartquantity = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const productId = req?.body?._id;
    const qty = req.body.quantity;
    const response = await addToCartModule.updateOne(
      { _id: productId },
      {
        ...(qty && { quantity: qty }),
      }
    );

    res.json({
      message: "qunttity updated succesfully",
      data: response,
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

module.exports = updateCartquantity;
