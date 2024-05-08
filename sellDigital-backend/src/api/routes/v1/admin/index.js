const express = require("express");
const CategoryRoutes = require("./book.route");
const router = express.Router();
/**
 * GET v1/admin
 */
router.use("/category", CategoryRoutes);
module.exports = router;
