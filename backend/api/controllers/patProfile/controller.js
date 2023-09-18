const PatProfoileService = require("../../services/patprofile.service");
const DocProfoileService = require("../../services/docprofile.service");
const DocFormServices = require("../../services/docform.service");
const BookingServices = require("../../services/booking.service");
const userService = require("../../services/user.service");

const APIFeatures = require("../../../helpers/apiFeatures");
const NotificationService = require("../../services/notification.service");
const PaymentService = require("../../services/payment.service");
const ReviewService = require("../../services/review.service");

const DocForm = require("../../models/docform");

const DocProfile = require("../../models/docprofile");
const PatProfile = require("../../models/patprofile");

const { doctorForm } = require("../../../helpers/emails");
const User = require("../../models/user");
const patprofile = require("../../models/patprofile");

const user = require("../../models/user");

// Get Single Pat Profile that are logged in => /api/v1/patprofile/
exports.getPatProfile = async (req, res, next) => {
  try {
    const id = req.user._id;

    const userDoc = await userService.getUserById(id);

    const patProfileDoc = await PatProfoileService.getPatProfileByEmail(
      userDoc.email
    ).lean();

    const profile = {
      ...patProfileDoc,
      url: req.user.image.url,
    };

    if (!patProfileDoc.userId) {
      await PatProfile.updateOne(
        { email: userDoc.email },
        {
          $set: {
            userId: id,
          },
        }
      );
    }

    await res.status(200).json({ data: profile });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Pat Profile
exports.updatePatProfile = async (req, res, next) => {
  try {
    // const patProfile = await PatProfoileService.updatePatProfile(
    //   req.params.id,
    //   req.body
    // );
    const { contactNo, aboutMe, name } = req.body;
    const userId = req.user?._id;
    const patProfile = await patprofile.findOneAndUpdate(
      { userId },
      {
        contactNo,
        aboutMe,
        name,
      }
    );

    const user = await User.findOneAndUpdate(
      { _id: req.user?._id },
      {
        contactNo,
        aboutMe,
        name,
      }
    );

    //await userService.updateUserName(req.params.id, req.body.name);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Get Notifications
exports.getNotifications = async (req, res, next) => {
  try {
    // const notifications = await NotificationService.getNotificationsByPatId(
    //   req.user._id
    // ).lean();
    // const notificationArr = await notifications.reduce(async (acc, curr, i) => {
    //   const patientData = await userService.getUserById(curr.booking.patientId);
    //   const doctorData = await userService.getUserById(curr.booking.doctorId);
    //   const accP = await acc;
    //   return [...accP, { ...curr.booking, patientData, doctorData }];
    // }, Promise.resolve([]));
    // res.status(200).json(notificationArr);

    let id = req.user._id;
    let seen = req.query.seen;
    let dataArr = [];

    let notifications = await NotificationService.getPatNotifications(id, seen);

    for (notify of notifications) {
      let doctor = await userService.getUserById(notify.booking.doctorId);

      let data = {
        ...notify,
        doctorData: {
          name: doctor.name,
        },
      };

      dataArr.push(data);
    }

    return res.status(200).json(dataArr);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Payments Details => /api/v1/patprofile/get-payments
exports.getPayments = async (req, res, next) => {
  const role = req.user.role;
  const count = req.query.count;
  try {
    const payments = await (role === "patient"
      ? PaymentService.getPaymentByPatId(req.user.id, count).lean()
      : PaymentService.getPaymentByDocId(req.user.id, count).lean());

    let allPayments = [];

    for (let payment of payments) {
      const userData = await User.findById(
        role === "patient" ? payment.doctorId : payment.patientId,
        {
          image: 1,
          name: 1,
          status: role === "patient" ? "Paid" : "Recieved",
        }
      ).lean();
      allPayments.push({ ...userData, ...payment });
    }

    return res.status(200).json(allPayments);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
