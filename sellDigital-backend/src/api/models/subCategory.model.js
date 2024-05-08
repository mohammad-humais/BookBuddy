const mongoose = require("mongoose");
/**
 * SubCategory Schema
 * @private
 */
const subCategorySchema = new mongoose.Schema(
  {
    title: { type: String },
  },
  { timestamps: true }
);

/**
 * @typedef Product
 */
module.exports = mongoose.model("SubCategory", subCategorySchema);
