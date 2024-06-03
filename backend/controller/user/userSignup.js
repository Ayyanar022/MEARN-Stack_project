const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { name, email, password } = req.body;

    // check all datas are available
    if (!name) {
      throw new Error("Plsease provide Name");
    }

    if (!email) {
      throw new Error("Plsease provide Name");
    }

    if (!password) {
      throw new Error("Plsease provide Name");
    }

    // to check email alredy available
    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("User alredy avilable . try diffrent Email..");
    }

    // password bcrypt and save
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Somthing worng with hash password creation..");
    }

    // inserting database

    const payLoad = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };
    const userData = userModel(payLoad);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Created Successfully..",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
