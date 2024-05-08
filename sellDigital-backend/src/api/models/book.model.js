const mongoose = require("mongoose");
/**
 * Category Schema
 * @private
 */
const categorySchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Category
 */

module.exports = mongoose.model("Category", categorySchema);
