const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { auth } = require("../../middlewares/auth");
const { upload, image } = require("../../../helpers/multer");
const { userBruteforce, sanitizeData } = require("../../../helpers/security");

//Auth
router.post("/signUp", sanitizeData, controller.signUp);
router.post("/signIn", sanitizeData, controller.signIn);
router.post("/socialLogin", sanitizeData, controller.socialLogin);
router.get("/me", auth, controller.myProfile);
// -------------------------------------

//Dashboard
router.get("/dashboard-counts", auth, controller.dashboardCounts);
// -------------------------------------

//Settings
router.post("/forgotPassword", sanitizeData, controller.forgotPassword);
router.put("/password/reset/:token", sanitizeData, controller.resetPassword);
router.patch(
  "/updatePic",
  sanitizeData,
  auth,
  upload.single("file"),
  controller.updatePicture
);
router.post("/update-password", sanitizeData, auth, controller.updatePassword);

module.exports = router;
