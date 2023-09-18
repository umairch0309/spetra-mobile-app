const express = require("express");
const controller = require("./controller");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const { sanitizeData } = require("../../../helpers/security");

router.post("/form", sanitizeData, auth, controller.newInsuranceForm);
router.get("/form", sanitizeData, auth, controller.getInsuranceForm);
router.get(
  "/formMobile",
  sanitizeData,
  auth,
  controller.getInsuranceFormMobile
);

router.put("/form/:id", sanitizeData, auth, controller.updateInsuranceForm);
router.get("/profile", sanitizeData, auth, controller.getInsuranceForProfile);

module.exports = router;
