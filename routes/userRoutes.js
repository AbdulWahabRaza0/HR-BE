const express = require("express");
const router = express.Router();
const { protect, protectAdmin } = require("../middleware/auth.js");
const { register, login, allUsers } = require("../controller/user");
router.get("/", protect, protectAdmin, allUsers);
router.post("/register", register);
router.post("/login", login);
module.exports = router;
