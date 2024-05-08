const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/admin/book.controller.js");
const {
  categoryUpload,
  applicationUpload,
  cpUpload,
} = require("../../../utils/upload.js");

router.route("/create").post(categoryUpload, controller.createCategory);
router.route("/add-book").post(cpUpload, controller.addBook);
router.route("/product/create").post(applicationUpload, controller.product);
router
  .route("/sub-category/create")
  .post(categoryUpload, controller.subCategory);
router.route("/product-detail/:productID").get(controller.getProductDetail);
router.route("/list").get(controller.listCategories);
router.route("/get-current-books").get(controller.getCurrentBooks);
router.route("/get-plan-to-read-books").get(controller.getPlanToRead);
router.route("/get-completed-books").get(controller.getCompletedBooks);
router.route("/change-status").put(controller.changeStatus);
router.route("/delete-book").delete(controller.deleteBook);
module.exports = router;
