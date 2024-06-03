const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/user/userSignup");
const userSignInController = require("../controller/user/userSignin");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const AllUsers = require("../controller/user/allUsers");
const userRoleUpdate = require("../controller/user/userRoleUpdate");
const uploadProductController = require("../controller/product/uploadProduct");
const getProductConstructor = require("../controller/product/getProduct");
const editProductController = require("../controller/product/EditProduct");
const categoryProduct = require("../controller/product/categoryProduct");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/logout", userLogout);

//admin pannesl
router.get("/all-users", authToken, AllUsers);
router.post("/userRole-update", authToken, userRoleUpdate);

// product upload and fetch
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-allproduct", getProductConstructor);
router.post("/edit-product", editProductController);
router.get("/get-distinctproduct", categoryProduct);

module.exports = router;
