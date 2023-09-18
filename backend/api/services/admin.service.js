const User = require("../models/user");
const DocForms = require("../models/docform");
const DocProfile = require("../models/docprofile");
const Speciality = require("../models/speciality");
const Language = require("../models/language");
const Booking = require("../models/booking");

//Get User by Email
const getUserByEmail = (email) => {
  return User.findOne({ email });
};

//Get User by Id
const getUserById = (id) => {
  return User.findById(id);
};

//Get All Patients
const getAllPatients = () => {
  return User.find({ role: "patient" });
};

//Get All Doctors
const getAllDoctors = () => {
  return User.find({ role: "doctor" });
};

//Get All Pending Doctors
const getAllPendingDoctors = () => {
  return DocForms.find({ status: "inReview" });
};

//Get All Declined Doctors
const getAllDeclinedDoctors = () => {
  return DocForms.find({ status: "declined" });
};

//Get All Doctor Forms
const getAllDocForms = () => {
  return DocForms.find();
};

//Get Doctor Form By Id
const getDocFormById = (id) => {
  return DocForms.findById(id);
};

//Update Passsword
const updateAdminPassword = (id, password) => {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        password,
      },
    }
  );
};

//Update Doc form Status
const updateDocFormStatus = (id, status) => {
  return DocForms.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        status,
      },
    }
  );
};

//Remove Doc Form
const removeDocForm = (docForms) => {
  return docForms.remove();
};

//Get All Specialities
const getAllSpecialities = (featured) => {
  return featured ? Speciality.find({ featured: true }) : Speciality.find();
};

// Save Speciality
const saveSpeciality = (speciality) => {
  return speciality.save();
};

// Update Specialities
const updateSpecialities = (id, featured) => {
  return Speciality.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        featured,
      },
    }
  );
};

//find speciality by Id
const getSpecialityById = (id) => {
  return Speciality.findById(id);
};

//Speciality new Obj
const specialityObject = (req) => {
  return new Speciality({
    ...req,
  });
};

// ----------------

//Get All Languages
const getAllLanguages = () => {
  return Language.find();
};

// Save Language
const saveLanguage = (language) => {
  return language.save();
};

// Update Language
const updateLanguage = (id, featured) => {
  return Language.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        featured,
      },
    }
  );
};

//find Language by Id
const getLanguageById = (id) => {
  return Language.findById(id);
};

//Speciality new Obj
const languageObject = (name) => {
  return new Language({
    name,
    featured: false,
  });
};

/// All Consultations
const allConsultations = async () => {
  let bookings = await Booking.find({
    visitType: "video",
  });

  let arr = [];

  for (let booking of bookings) {
    let doc = await User.findById(booking.doctorId);
    let pat = await User.findById(booking.patientId);

    let obj = {
      ...booking.toObject(),
      doctorName: doc.name,
      patientName: pat.name,
    };

    arr.push(obj);
  }

  return arr;
};

/// All Appointments
const allAppointments = async () => {
  let bookings = await Booking.find({
    visitType: "physical",
  });

  let arr = [];

  for (let booking of bookings) {
    let doc = await User.findById(booking.doctorId);
    let pat = await User.findById(booking.patientId);

    let obj = {
      ...booking.toObject(),
      doctorName: doc.name,
      patientName: pat.name,
    };

    arr.push(obj);
  }

  return arr;
};

module.exports = {
  getUserByEmail,
  getUserById,
  getAllPatients,
  getAllDoctors,
  getAllDocForms,
  updateAdminPassword,
  getDocFormById,
  removeDocForm,
  updateDocFormStatus,
  getAllSpecialities,
  // deleteSpeciality,
  saveSpeciality,
  updateSpecialities,
  specialityObject,
  getSpecialityById,
  getAllPendingDoctors,
  getAllDeclinedDoctors,
  getAllLanguages,
  saveLanguage,
  updateLanguage,
  getLanguageById,
  languageObject,
  allConsultations,
  allAppointments,
};
