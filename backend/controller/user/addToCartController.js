const addToCartModule = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;

    console.log("check", productId, currentUser);

    const isProductAvilable = await addToCartModule.findOne({
      productId,
    });

    console.log("isproductavailable", isProductAvilable);

    if (isProductAvilable) {
      return res.json({
        message: "Already exist in cart",
        success: false,
        error: false,
        warning: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new addToCartModule(payload);
    const saveProduct = await newAddToCart.save();

    res.json({
      data: saveProduct,
      message: "Product Added In Cart",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err?.message,
      success: false,
      error: true,
    });
  }
};

module.exports = addToCartController;
