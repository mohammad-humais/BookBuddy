const express = require("express");
const userRoutes = require("./user.route");
const router = express.Router();
/**
 * GET v1/front
 */
router.use("/users", userRoutes);
module.exports = router;
