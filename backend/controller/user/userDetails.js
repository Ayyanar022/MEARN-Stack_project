const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
  try {
    // console.log("user id ", req.userId);
    const userDetails = await userModel.findById(req.userId);
    // console.log("userDetails", userDetails);
    res.status(200).json({
      data: userDetails,
      error: false,
      success: true,
      message: "User Details",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = userDetailsController;
