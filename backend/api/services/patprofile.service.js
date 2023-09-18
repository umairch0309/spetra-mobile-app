/* eslint-disable prettier/prettier */
const PatProfile = require("../models/patprofile");

//New Pat Object
const patprofileObject = (req) => {
  return new PatProfile({
    ...req,
  });
};

//Get Pat Profile By userID
const getPatProfile = (userId) => {
  return PatProfile.findOne({ userId });
};

//Get Pat Profile By email
const getPatProfileByEmail = (email) => {
  return PatProfile.findOne({ email });
};

//get Pat Profile By Id
const getPatProfileById = (id) => {
  return PatProfile.findById(id);
};

//Get All Pats Profiles
const getAllPatsProfile = () => {
  return PatProfile.find();
};

//Save Doc Profile
const savePatProfile = (patprofile) => {
  return patprofile.save();
};

//Update Pat Profile By userId
const updatePatProfile = (id, patprofile) => {
  return PatProfile.findOneAndUpdate(
    { userId: id },
    {
      $set: patprofile,
    }
  );
};

//Update userId in Pat profile by email
const updatePatUserIdByEmail = (email) => {
  return PatProfile.updateOne(
    { email },
    {
      $set: {
        userId: id,
      },
    }
  );
};

//Delete Pat Profile by Email
const deletePatProfileByEmail = (email) => {
  return PatProfile.findOneAndDelete({ email: email });
};

// Update Pat Phone No
const updatePatPhoneNo = (email, contactNo) => {
  return PatProfile.updateOne(
    { email },
    {
      $set: {
        contactNo,
        aboutMe,
      },
    }
  );
};

const patService = {
  patprofileObject,
  getPatProfile,
  getPatProfileByEmail,
  getPatProfileById,
  getAllPatsProfile,
  savePatProfile,
  updatePatProfile,
  updatePatUserIdByEmail,
  deletePatProfileByEmail,
  updatePatPhoneNo,
};

module.exports = patService;
