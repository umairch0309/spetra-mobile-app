const adminServices = require("../../services/admin.service");
const DocProfoileService = require("../../services/docprofile.service");
const DocFormService = require("../../services/docform.service");
const userService = require("../../services/user.service");
const SocialLink = require("../../models/socialLink");
const PatProfoileService = require("../../services/patprofile.service");
const Speciality = require("../../models/speciality");
const bcrypt = require("bcryptjs");

const {
  ApprovedDoctorForm,
  DeclinedDoctorForm,
  AdminPatientAccount,
  AdminDeletePatient,
  AdminDeleteDoctor,
} = require("../../../helpers/emails");

//Sign In User => /api/v1/admin/logIn
exports.adminLogIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email.toLowerCase());

    if (user) {
      if (!user.comparePassword(password)) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = user.generateJWT();
      return res.status(200).json({
        success: true,
        user,
        token,
      });
    } else {
      return res.status(400).json({
        message: "Email doesn't not exists",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get currently logged in admin profile detail  =>  /api/v1/admin/me
exports.adminProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user._id);

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Dashboard Counts =>  /api/v1/admin/counts
exports.adminCounts = async (req, res, next) => {
  try {
    const patients = await adminServices.getAllPatients();
    const doctors = await adminServices.getAllDoctors();
    const pendingDoctors = await adminServices.getAllPendingDoctors();
    const doctorForms = await adminServices.getAllDocForms();

    return res.status(200).json({
      doctors: doctors.length,
      patients: patients.length,
      doctorForms: doctorForms.length,
      pendingDoctors: pendingDoctors.length,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Update Password => /api/v1/admin/update-password
exports.adminUpdatePassword = async (req, res, next) => {
  try {
    await adminServices.updateAdminPassword(req.user._id, req.body.password);

    return res.status(200).json({ message: "Password Updated Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Get All Doctor Forms => /api/v1/admin/doc-forms
exports.allDocForms = async (req, res, next) => {
  try {
    const docForms = await adminServices.getAllDocForms();

    return res.status(200).send({ data: docForms });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Approve Doc form => /api/v1/admin/approve-doc-form/:docformId
exports.approveDocForm = async (req, res, next) => {
  try {
    const docFormDoc = await adminServices.getDocFormById(req.params.docformId);
    const docStatus = "approved";
    const data = { ...docFormDoc.toObject(), status: "active" };

    const randomNumber = Math.random().toString(36).substring(3);

    // const new_hashed_password = await bcrypt.hash(randomNumber, 10);

    const docprofileObject = DocProfoileService.docprofileObject(data);

    const userObj = {
      name: docFormDoc.name,
      email: docFormDoc.email.toLowerCase(),
      password: randomNumber,
      type: "local",
      role: "doctor",
    };

    const newUser = userService.userObject(userObj);

    //Create Doc Profile
    await DocProfoileService.saveDocProfile(docprofileObject);
    //Create User
    await userService.registerUser(newUser);
    // Update Form Status
    await adminServices.updateDocFormStatus(req.params.docformId, docStatus);

    await ApprovedDoctorForm(docFormDoc.email, randomNumber);

    res.status(200).send({ message: "Form Approved by Admin" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Decline Doc form => /api/v1/admin/decline-doc-form/:docformId
exports.declineDocForm = async (req, res, next) => {
  // const docStatus = "declined";
  try {
    const docForm = await adminServices.getDocFormById(req.params.docformId);

    await adminServices.removeDocForm(docForm);

    // // Update Form Status
    // await adminServices.updateDocFormStatus(req.params.docformId, docStatus);

    await DeclinedDoctorForm(docForm.email);

    return res.status(200).send({ message: "Form Declined by Admin" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Get All Patient => /api/v1/admin/all-patients
exports.allPatients = async (req, res, next) => {
  try {
    const patients = await adminServices.getAllPatients();

    return res.status(200).send({ data: patients });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Get All Patient => /api/v1/admin/active-doctors
exports.activeDoctors = async (req, res, next) => {
  try {
    const doctors = await adminServices.getAllDoctors();

    return res.status(200).send({ data: doctors });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Get All Pending Doctors => /api/v1/admin/pending-doctors
exports.pendingDoctors = async (req, res, next) => {
  try {
    const doctors = await adminServices.getAllPendingDoctors();

    return res.status(200).send({ data: doctors });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Get All Decliend Doctors => /api/v1/admin/declined-doctors
exports.declinedDoctors = async (req, res, next) => {
  const doctors = await adminServices.getAllDeclinedDoctors();

  res.status(200).send({ data: doctors });
};

//Add Patient Profile => /api/v1/admin/add-patient
exports.addPatient = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.getUserByEmail(email.toLowerCase());

    if (user) {
      return res.status(401).json({ message: "Email already exits" });
    }

    const userObj = {
      name,
      email: email.toLowerCase(),
      password,
      type: "local",
    };

    const newUser = userService.userObject(userObj);

    await userService.registerUser(newUser);

    await AdminPatientAccount(name, email, password);

    return res.status(201).json({
      success: true,
      message: "Patient Account Created Successfully.",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Add Doctor Profile => /api/v1/admin/add-doctor
exports.addDoctor = async (req, res, next) => {
  try {
    const {
      name,
      email,
      hospital,
      education,
      practices,
      speciality,
      experince,
      contactNo,
      languages,
      aboutMe,
    } = req.body;
    const user = await userService.getUserByEmail(req.body.email.toLowerCase());

    if (user) {
      return res.status(401).json({ message: "Email already exits" });
    }

    const data = {
      email: email.toLowerCase(),
      name,
      hospital,
      education,
      practices,
      speciality,
      experince,
      contactNo,
      languages,
      aboutMe,
    };

    const docprofileObject = DocProfoileService.docprofileObject(data);

    const userObj = {
      name: name,
      email: email.toLowerCase(),
      password: "123456789",
      type: "local",
      role: "doctor",
    };

    const newUser = userService.userObject(userObj);

    //Create Doc Profile
    await DocProfoileService.saveDocProfile(docprofileObject);
    //Create User
    await userService.registerUser(newUser);

    return res
      .status(200)
      .send({ message: "Doctor Profile Created Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Delete Patient Profile => /api/v1/admin/delete-patient/:id
exports.deactivateUser = async (req, res, next) => {
  try {
    const newStatus = req.body.status;
    const user = await userService.getUserById(req.params.id);
    const profile = await (user.role === "doctor"
      ? DocProfoileService.getDocProfileByEmail(user.email.toLowerCase())
      : PatProfoileService.getPatProfileByEmail(user.email.toLowerCase()));

    user.status = newStatus;
    profile.status = newStatus;
    await user.save();
    await profile.save();

    return res.status(200).send({ message: "profile deactive" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get all Specialities => /api/v1/admin/all-speciality?featured=true
exports.getAllSpeciality = async (req, res, next) => {
  try {
    const specialities = await adminServices.getAllSpecialities(
      req.query.featured
    );

    return res.status(200).send({ data: specialities });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Add new speciality => /api/v1/admin/new-speciality
exports.newSpeciality = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const { path, mimetype, originalname } = req.file;
    let image = {
      name: originalname,
      url: req.file.path.replace(/\\/g, "/"),
      mimeType: mimetype,
    };

    const newSpeciality = adminServices.specialityObject({
      name,
      description,
      image,
      featured: false,
    });

    await adminServices.saveSpeciality(newSpeciality);

    return res.status(200).send({ data: newSpeciality });
  } catch (error) {
    return res.status(400).json({ data: newSpeciality });
  }
};

//delete speciality => /api/v1/admin/delete-speciality/specialityId
exports.deleteSpeciality = async (req, res, next) => {
  try {
    const speciality = await adminServices.getSpecialityById(
      req.params.specialityId
    );

    await speciality.remove();

    return res.status(200).send({ message: "Speciality Removed Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update speciality => /api/v1/admin/update-speciality/specialityId
exports.updateSpeciality = async (req, res, next) => {
  try {
    await adminServices.updateSpecialities(
      req.params.specialityId,
      req.body.featured
    );

    return res.status(200).send({ message: "Speciality Updated Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//get all Languages => /api/v1/admin/all-languages
exports.getAllLanguages = async (req, res, next) => {
  try {
    const specialities = await adminServices
      .getAllLanguages()
      .sort([["createdAt", "descending"]]);

    return res.status(200).send({ data: specialities });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Add new language => /api/v1/admin/new-language
exports.newLanguage = async (req, res, next) => {
  const newSpeciality = adminServices.languageObject(req.body.name);

  await adminServices.saveLanguage(newSpeciality);

  res.status(200).send({ data: newSpeciality });
};

//delete speciality => /api/v1/admin/delete-language/:languageId
exports.deleteLanguage = async (req, res, next) => {
  try {
    const speciality = await adminServices.getLanguageById(
      req.params.languageId
    );

    await speciality.remove();

    return res.status(200).send({ message: "Language Removed Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update Language => /api/v1/admin/update-language/:languageId
exports.updateLanguage = async (req, res, next) => {
  try {
    await adminServices.updateLanguage(req.params.specialityId);

    return res.status(200).send({ message: "Language Updated Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//all consultations => /api/v1/admin/all-consultations
exports.allConsultations = async (req, res, next) => {
  try {
    const consultations = await adminServices.allConsultations();

    return res.status(200).send(consultations);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//all appointments => /api/v1/admin/all-appointments
exports.allAppointments = async (req, res, next) => {
  try {
    const appointments = await adminServices.allAppointments();

    return res.status(200).send(appointments);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Get Links  =>  /api/v1/admin/get-social-links
exports.getSocialLinks = async (req, res, next) => {
  try {
    const socialLink = await SocialLink.find();

    res.status(200).json(socialLink[0]);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Update Social Links => /api/v1/admin/update-social-links
exports.updateSocialLinks = async (req, res, next) => {
  try {
    const socialLink = await SocialLink.find();

    let links = {};

    if (socialLink.length === 0) {
      links = new SocialLink({
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
      });

      await links.save();
    } else {
      socialLink[0].facebook = req.body.facebook;
      socialLink[0].instagram = req.body.instagram;
      socialLink[0].twitter = req.body.twitter;
      await socialLink[0].save();
    }

    return res.status(200).json({
      messages: "Social Link Saved Successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
