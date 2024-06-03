const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function uploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denaid");
    }
    console.log("req,body", req.body);
    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "Product Upload Successfull..",
      success: true,
      error: false,
      data: saveProduct,
    });

    // const
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: false,
      success: true,
      data: {},
    });
  }
}

module.exports = uploadProductController;
