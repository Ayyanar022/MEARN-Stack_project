const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function editProductController(req, res) {
  try {
    // check current user is admin or not (only admin can upload or edit product)
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission denaid");
    }

    const { _id, ...restData } = req.body;

    const response = await productModel.findByIdAndUpdate(_id, restData, {
      new: true,
    });

    res.json({
      message: "product Updated Successfully..",
      error: false,
      success: true,
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: false,
      success: true,
    });
  }
}

module.exports = editProductController;
