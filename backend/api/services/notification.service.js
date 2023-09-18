const Notification = require("../models/notification");
const DocNotification = require("../models/docNotification");
const PatNotification = require("../models/patNotification");
const {
  FlowValidateInstance,
} = require("twilio/lib/rest/studio/v2/flowValidate");

//New Doc Notification Object
const docNotificationObject = (req) => {
  return new DocNotification({
    ...req,
  });
};

//New Pat Notification Object
const patNotificationObject = (req) => {
  return new PatNotification({
    ...req,
  });
};

// Save Notification
const saveNotification = (notification) => {
  return notification.save();
};

// Get All Notification on Doc Side
const getDocNotifications = (id, seen) => {
  return DocNotification.find(
    seen ? { "booking.doctorId": id, seen: false } : { "booking.doctorId": id }
  )
    .sort({ createdAt: -1 })
    .lean();
};

// Get All Notification on Doc Side
const getPatNotifications = (id, seen) => {
  return PatNotification.find(
    seen
      ? { "booking.patientId": id, seen: false }
      : { "booking.patientId": id }
  )
    .sort({ createdAt: -1 })
    .lean();
};

// delete notification by id
const deleteDocNotifications = async (id) => {
  let notifications = await DocNotification.find({
    "booking.doctorId": id,
    seen: false,
  });

  for (let noti of notifications) {
    noti.seen = true;
    await noti.save();
  }
  return;
};

// delete notification by id
const deletePatNotifications = async (id) => {
  let notifications = await PatNotification.find({
    "booking.patientId": id,
    seen: false,
  });

  for (let noti of notifications) {
    noti.seen = true;
    await noti.save();
  }
  return;
};

// //New Notification Object
// const notificationObject = (req) => {
//   return new Notification({
//     ...req,
//   });
// };

// // Get All Notification on Doc Side
// const getNotificationsByDocId = (id) => {
//   return Notification.find({ "booking.doctorId": id })
//     .sort({ createdAt: -1 })
//     .lean();
// };

// // Get All Notification on Pat Side
// const getNotificationsByPatId = (id) => {
//   return Notification.find({ "booking.patientId": id })
//     .sort({ createdAt: -1 })
//     .lean();
// };

const NotificationServices = {
  saveNotification,
  deleteDocNotifications,
  deletePatNotifications,
  docNotificationObject,
  patNotificationObject,
  getDocNotifications,
  getPatNotifications,
};

module.exports = NotificationServices;
