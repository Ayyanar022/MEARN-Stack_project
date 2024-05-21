const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

async function userSignUpController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      throw new Error("Plsease provide Name");
    }

    if (!email) {
      throw new Error("Plsease provide Name");
    }

    if (!password) {
      throw new Error("Plsease provide Name");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Somthing worng with hash password creation..");
    }

    const payLoad = {
      ...req.body,
      password: hashPassword,
    };
    const userData = userModel(payLoad);
    const saveUser = userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: true,
      message: "User Created Successfully..",
    });
  } catch (error) {
    res.json({
      message: error,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
