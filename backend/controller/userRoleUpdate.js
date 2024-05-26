const userModel = require("../models/userModel");

async function userRoleUpdate(req, res) {
  try {
    const { name, email, role, userId } = req.body;

    const currentUser = req.userId;

    const userCheck = await userModel.findById(currentUser);
    // console.log("user.role", userCheck.role, "role", role);

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const updateUser = await userModel.findByIdAndUpdate(userId, payload);
    // const data = await updateUser.json();
    console.log("updateUser", updateUser);
    console.log("payload", payload);

    res.json({
      data: updateUser,
      message: "User updated successfully ..",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = userRoleUpdate;
