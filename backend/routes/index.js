const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/userSignup");
const userSignInController = require("../controller/userSignin");
const userDetailsController = require("../controller/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/userLogout");
const AllUsers = require("../controller/allUsers");
const userRoleUpdate = require("../controller/userRoleUpdate");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/logout", userLogout);

//admin pannesl
router.get("/all-users", authToken, AllUsers);
router.post("/userRole-update", authToken, userRoleUpdate);

module.exports = router;
