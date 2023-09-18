/* eslint-disable prettier/prettier */
const User = require("../models/user");

//New User Object
const userObject = (userObj) => {
  return new User({
    ...userObj,
  });
};

//Register User
const registerUser = (user) => {
  return user.save();
};

//Save User
const saveUser = (user) => {
  return user.save();
};

const getUserByResetToken = (resetPasswordToken) => {
  return User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
};

//Get User by Email
const getUserByEmail = (email) => {
  return User.findOne({ email });
};

//Get User By Id
const getUserById = (id) => {
  return User.findById(id);
};
const getUserByToken = (id) => {
  return User.findById(id);
};

//Get User All Users
const getAllUsers = () => {
  return User.find();
};

// Update User By Id
const updateUser = (id, user) => {
  return User.updateOne(
    { _id: id },
    {
      $set: user,
    }
  );
};

//Update User Name only by Id
const updateUserName = (id, name, contactNo, aboutMe) => {
  if (name === undefined || contactNo === undefined || aboutMe === undefined) {
    return;
  } else {
    return User.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          contactNo: contactNo,
          aboutMe: aboutMe,
        },
      }
    );
  }
};
//Update User Name only by Id
const updateContactNoAbout = (id, contactNo, aboutMe) => {
  if (contactNo === undefined || aboutMe === undefined) {
    return;
  } else {
    return User.updateOne(
      { _id: id },
      {
        $set: {
          contactNo: contactNo,
          aboutMe: aboutMe,
        },
      }
    );
  }
};

// Delete User
const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

//Update Passsword
const updatePassword = (id, password) => {
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

const userService = {
  registerUser,
  getUserByEmail,
  getUserById,
  getUserByToken,

  updateUser,
  userObject,
  getAllUsers,
  deleteUser,
  saveUser,
  getUserByResetToken,
  updateUserName,
  updateContactNoAbout,
  updatePassword,
};

module.exports = userService;
