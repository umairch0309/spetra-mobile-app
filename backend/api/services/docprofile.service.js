/* eslint-disable prettier/prettier */
const DocProfile = require("../models/docprofile");
const User = require("../models/user");

//New Doc Object
const docprofileObject = (req) => {
  return new DocProfile({
    ...req,
  });
};

//Get DOc Profile By userID
const getDocProfile = (userId) => {
  return DocProfile.findOne({ userId });
};

//Get DOc Profile By email
const getDocProfileByEmail = (email) => {
  return DocProfile.findOne({ email });
};

//get Doc Profile By Id
const getDocProfileById = (id) => {
  return DocProfile.findById(id);
};

//Get All Docs Profiles
const getAllDocsProfile = () => {
  return DocProfile.find();
};

//Save Doc Profile
const saveDocProfile = (docprofile) => {
  return docprofile.save();
};

//Update Doc Profile By userId
const updateDocProfile = async (id, docprofile) => {
  return await DocProfile.findOneAndUpdate(
    { userId: id },
    {
      $set: docprofile,
    }
  );
};
const updateDocProfileById = async (id, docprofile) => {
  return await DocProfile.findByIdAndUpdate(
    { id },
    {
      $set: docprofile,
    }
  ).lean();
};

//Update Doc Profile phone Number By userId
const updateDocProfileNumber = (id, phoneNo) => {
  const doc = DocProfile.findOneAndUpdate(
    { userId: id },
    {
      $set: {
        phoneNo,
      },
    }
  );
  return doc;
};

//Update userId in Doc profile by email
const updateDocUserIdByEmail = (email) => {
  return DocProfile.updateOne(
    { email },
    {
      $set: {
        userId: id,
      },
    }
  );
};

//Delete Doc Profile by Email
const deleteDocProfileByEmail = (email) => {
  return DocProfile.findOneAndDelete({ email: email });
};

//Update Events in Doc Profile
const updateEvent = (email, body) => {
  const { physicalTimeSlot, videoTimeSlot } = body;
  return DocProfile.updateOne(
    { email },
    {
      $set: physicalTimeSlot
        ? {
            physicalTimeSlot,
          }
        : {
            videoTimeSlot,
          },
    }
  );
};

//Update Slot in Doc Profile
const updateSlot = async (visitType, slotId, eventDetail) => {
  let docProfile = await DocProfile.findOne(
    visitType === "video"
      ? {
          "videoTimeSlot._id": slotId,
        }
      : {
          "physicalTimeSlot._id": slotId,
        }
  );
  if (visitType === "physical") {
    let newSlots = docProfile.physicalTimeSlot.filter((slot) => {
      if (slot._id == slotId) {
        slot.isReserved = true;
        slot.eventDetail = eventDetail;
      }
      return slot;
    });

    docProfile.physicalTimeSlot = newSlots;
  } else {
    let newSlots = docProfile.videoTimeSlot.filter((slot) => {
      if (slot._id == slotId) {
        slot.isReserved = true;
        slot.eventDetail = eventDetail;
      }
      return slot;
    });

    docProfile.videoTimeSlot = newSlots;
  }

  console.log(docProfile);
  return docProfile.save();
};

const docService = {
  docprofileObject,
  getAllDocsProfile,
  getDocProfileById,
  saveDocProfile,
  getDocProfile,
  updateDocProfile,
  deleteDocProfileByEmail,
  getDocProfileByEmail,
  updateDocUserIdByEmail,
  updateDocProfileNumber,
  updateEvent,
  updateSlot,
};

module.exports = docService;
