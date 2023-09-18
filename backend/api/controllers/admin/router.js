const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { upload, image } = require("../../../helpers/multer");

const { auth } = require("../../middlewares/auth");

const { userBruteforce, sanitizeData } = require("../../../helpers/security");

//Auth
router.post(
  "/logIn",
  sanitizeData,
  // userBruteforce.prevent,
  controller.adminLogIn
);
router.get("/me", auth, controller.adminProfile);
// --------------------------------------------------

//Dashboard
router.get("/counts", auth, controller.adminCounts);
// --------------------------------------------------

//Setting
router.post(
  "/update-password",
  sanitizeData,
  auth,
  controller.adminUpdatePassword
);
// --------------------------------------------------

// Patient
router.get("/all-patients", auth, controller.allPatients);
router.post("/new-patient", sanitizeData, auth, controller.addPatient);
router.put("/deactive-user/:id", sanitizeData, auth, controller.deactivateUser);
// --------------------------------------------------

//Doctor Form
router.get("/all-docforms", auth, controller.allDocForms);
router.put(
  "/approve-doc-form/:docformId",
  sanitizeData,
  auth,
  controller.approveDocForm
);
router.put(
  "/decline-doc-form/:docformId",
  sanitizeData,
  auth,
  controller.declineDocForm
);
// --------------------------------------------------

//Doctor
router.get("/pending-doctors", auth, controller.pendingDoctors);
router.get("/declined-doctors", auth, controller.declinedDoctors);

router.get("/active-doctors", auth, controller.activeDoctors);
router.post("/new-doctor", sanitizeData, auth, controller.addDoctor);

// --------------------------------------------------

//Speciality
router.get("/all-speciality", controller.getAllSpeciality);
router.post(
  "/new-speciality",
  sanitizeData,
  auth,
  upload.single("image"),
  controller.newSpeciality
);
router.put(
  "/update-speciality/:specialityId",
  sanitizeData,
  auth,
  controller.updateSpeciality
);
router.delete(
  "/delete-speciality/:specialityId",
  sanitizeData,
  auth,
  controller.deleteSpeciality
);
// --------------------------------------------------

//language
router.get("/all-languages", controller.getAllLanguages);
// router.put("/featured-language", auth, controller.featuredlanguage);
router.post("/new-language", sanitizeData, auth, controller.newLanguage);
router.put(
  "/update-language/:languageId",
  sanitizeData,
  auth,
  controller.updateLanguage
);
router.delete(
  "/delete-language/:languageId",
  sanitizeData,
  auth,
  controller.deleteLanguage
);
// --------------------------------------------------

//Consulation
router.get("/all-consultations", auth, controller.allConsultations);
// --------------------------------------------------

//Appointments
router.get("/all-appointments", auth, controller.allAppointments);
// --------------------------------------------------

// social links
router.post("/update-social-links", auth, controller.updateSocialLinks);
router.get(
  "/get-social-links",

  controller.getSocialLinks
);

module.exports = router;
