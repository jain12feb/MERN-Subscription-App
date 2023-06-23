const express = require("express");
const {
  createUser,
  loginUser,
  currentUserDetails,
} = require("../controllers/user");
const { checkAuth } = require("../middlewares/checkAuth");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/me", checkAuth, currentUserDetails);

module.exports = router;
