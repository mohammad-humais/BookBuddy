const express = require("express");
const controller = require("../../../controllers/front/users.controller");
const router = express.Router();
const { cpUpload } = require("../../../utils/upload");
router.route("/register").post(controller.register);
router.route("/get-api").get(controller.gets);
router.route("/login").post(controller.login);
router.route("/verify-email/:id/:token").get(controller.verifyEmail);
router.route("/update-profile").patch(cpUpload, controller.updateProfile);
router.route("/forgot-password").post(controller.forgotPassword);
router.route("/reset-password").post(controller.resetPassword);
router.route("/verify-token").post(controller.verifyToken);
router.route("/link-expired").post(controller.linkExpired);
router.route("/get-profile-data").get(controller.getprofileData);
router.route("/reset-session-timer").get(controller.resetSessionTimer)
module.exports = router;
