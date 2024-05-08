const mongoose = require("mongoose");
/**
 * Product Schema
 * @private
 */
const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    image: { type: Array },
    isSold: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
    tag: {
      type: String,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  },
  { timestamps: true }
);

/**
 * @typedef Product
 */
module.exports = mongoose.model("product", productSchema);
