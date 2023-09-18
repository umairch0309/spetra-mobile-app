const DocProfoileService = require("../../services/docprofile.service");
const NotificationService = require("../../services/notification.service");
const ChatRoomService = require("../../services/chatRoom.service");
const PatProfileService = require("../../services/patprofile.service");
const PaymentService = require("../../services/payment.service");
const DocFormServices = require("../../services/docform.service");
const BookingServices = require("../../services/booking.service");
const userService = require("../../services/user.service");
const APIFeatures = require("../../../helpers/apiFeatures");
const ReviewService = require("../../services/review.service");
const Review = require("../../models/review");
const Payment = require("../../models/payment");
const ChatRoom = require("../../models/chatRoom");
const Booking = require("../../models/booking");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongodb").ObjectID;
var saltround = 10;

const { format, parseISO } = require("date-fns");

const DocForm = require("../../models/docform");

const DocProfile = require("../../models/docprofile");

const { doctorForm, newBookingEmail } = require("../../../helpers/emails");
const User = require("../../models/user");
const docprofile = require("../../models/docprofile");
const { clearConfigCache } = require("prettier");

var accountSid = "ACbd9333bf5196f302a78c00dc57177707"; // Your Account SID from www.twilio.com/console
var authToken = "8569100d52db692852f7c3705294ce51"; // Your Auth Token from www.twilio.com/console
var serviceId = "VA2a775e844e7963708dc1625922595974";

const client = require("twilio")(accountSid, authToken);

// Get Single Doc Profile and Create if there is no profile
exports.getDocProfile = async (req, res, next) => {
  try {
    const id = req.user.id;

    const userDoc = await userService.getUserById(id);

    const docProfileDoc = await DocProfoileService.getDocProfileByEmail(
      userDoc.email
    );

    const profile = {
      ...docProfileDoc.toObject(),
      url: req.user.image.url,
      role: userDoc.role,
      image: userDoc.image,
    };

    if (!docProfileDoc.userId) {
      await DocProfile.updateOne(
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

// Create Doc Form
exports.createDocForm = async (req, res, next) => {
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
      return res.status(401).json({ message: "Email already exits." });
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

    const docFormObject = new DocForm(data);
    const docForm = await docFormObject.save();
    await doctorForm(email);
    return res
      .status(200)
      .json({ message: "Profile Created Successfully", data: docForm });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDocPersonal = async (req, res) => {
  try {
    const { aboutMe, contactNo, name, languages } = req.body;
    await User.findOneAndUpdate(
      { _id: req.user?._id },
      { aboutMe, contactNo, name }
    );
    const updatedData = req.body;
    const options = { new: true };
    delete req.body.role;

    const doc = await DocProfile.findOneAndUpdate(
      { userId: req.user?._id },
      {
        ...updatedData,
        options,
      }
    );
    return res.status(200).json({ data: doc });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// Update Doc Profile
exports.updateDocProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const docprofile = await DocProfoileService.updateDocProfile(id, req.body);
    const updatedData = req.body;
    delete req.body.role;
    const options = { new: true };
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...updatedData, options }
    );

    return res.status(200).json({ data: docprofile });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
exports.updateDocProfileMobile = async (req, res, next) => {
  try {
    const profile = await DocProfoileService.getDocProfileById(
      ObjectId(req.params.id)
    );
    if (req.body.name)
      await userService.updateUserName(req.params.id, req.body.name);
    Object.keys(req.body).map((key) => {
      profile[key] = req.body[key];
    });

    await DocProfoileService.saveDocProfile(profile);

    const user = await userService.getUserById(profile.userId);

    return res
      .status(200)
      .json({ data: { ...profile._doc, role: user.role, image: user.image } });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Gatt All Doc Profiles
exports.getDocsProfiles = async (req, res, next) => {
  try {
    let allDoctors = [];

    const apiFeatures = new APIFeatures(
      DocProfoileService.getAllDocsProfile(),
      req.query
    )
      .searchOne()
      .searchTwo()
      .count()
      .videoFilter()
      .dateFilter();

    let doctors = await apiFeatures.query;

    for (let doctor of doctors) {
      const docprofile = await DocProfoileService.getDocProfileByEmail(
        doctor.email
      );
      const userDoc = await userService.getUserByEmail(doctor.email);

      let profile = {
        ...docprofile.toObject(),
        url: userDoc.image.url,
      };

      allDoctors.push(profile);
    }

    // const docprofile = await DocProfoileService.getAllDocsProfile();
    return res.status(200).json({ data: allDoctors });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get Single Doc
exports.singleDocProfile = async (req, res, next) => {
  try {
    const docprofile = await DocProfoileService.getDocProfileById(
      req.params.id
    ).lean();
    const userDoc = await userService.getUserByEmail(docprofile.email);

    const profile = {
      ...docprofile,
      url: userDoc.image.url,
    };

    return res.status(200).json({ data: profile });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Update Event
exports.updateEvent = async (req, res, next) => {
  try {
    await DocProfoileService.updateEvent(req.user.email, req.body).lean();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// Update Event
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const bookingId = req.body.bookingId;
    await Booking.findOneAndUpdate({ _id: bookingId }, { status: "completed" });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Send Code on Phone Number => /api/v1/docprofile/send-code
exports.sendCode = async (req, res, next) => {
  try {
    await client.verify.services(serviceId).verifications.create({
      to: `+${req.query.phoneNo}`,
      // channel: req.query.channel === "call" ? "call" : "sms",
      channel: req.query.channel,
    });
    return res.status(200).json({
      success: true,
      message: "Verification is sent!!",
      phonenumber: req.query.phoneNo,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Verify Phone Number => /api/v1/docprofile/verify-number
exports.verifyNumber = async (req, res, next) => {
  const phoneNo = `+${req.query.phoneNo}`;
  try {
    const data = await client.verify
      .services(serviceId)
      .verificationChecks.create({
        to: phoneNo,
        code: req.query.code,
      });

    if (data.status === "approved") {
      await PatProfileService.updatePatPhoneNo(req.user.email, phoneNo);
    }
    return res
      .status(200)
      .json({ success: true, message: "User is Verified!!", data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Verify Phone Number => /api/v1/docprofile/video
exports.video = async (req, res, next) => {
  try {
    client.video
      .rooms("DailyStandup")
      .fetch()
      .then((room) => console.log(room.uniqueName));

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// New Booking
exports.newBooking = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.body.doctorEmail);
    const {
      bookingDate,
      visitType,
      seenBefore,
      reasonOfVisit,
      patientId,
      noteForDoctor,
      fee,
      phoneNumber,
      slotId,
      location,
    } = req.body;
    const data = {
      doctorId: user._id,
      bookingDate,
      visitType,
      seenBefore,
      reasonOfVisit,
      patientId,
      noteForDoctor,
      fee,
      slotId,
      phoneNumber,
      location,
    };

    const doc = await docprofile.findOne({ userId: user._id });
    if (visitType === "video" && doc) {
      let checkSlotExist = doc.videoTimeSlot.find(
        (slot) =>
          slot._id.toString() === slotId.toString() && slot.isReserved === true
      );
      if (checkSlotExist)
        return res.status(401).json({ error: "Slot Already Reserved" });
    }
    if (visitType === "physical" && doc) {
      let checkSlotExist = doc.physicalTimeSlot.find(
        (slot) =>
          slot._id.toString() === slotId.toString() && slot.isReserved === true
      );
      if (checkSlotExist)
        return res.status(402).json({ error: "Slot Already Reserved" });
    }

    // Booking Object
    const bookingObj = await BookingServices.bookingObject(data);
    //Save Booking
    const booking = await BookingServices.saveBooking(bookingObj);
    // Payment Object
    const paymentObj = await PaymentService.paymentObj({
      doctorId: user._id,
      patientId,
      bookingId: booking._id,
      fee,
      condition: reasonOfVisit,
    });

    // Save Payment
    await PaymentService.savePayment(paymentObj);
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(404).json({ error: error?.message });
  }
};
// Update Booking
exports.updateBooking = async (req, res, next) => {
  try {
    const { bookingId, visitType } = req.body;
    if (!bookingId) {
      return res.status(400).json({ message: "please enter bookingId" });
    }
    const booking = await Booking.findById(bookingId);
    const user = await userService.getUserByEmail(req.body.doctorEmail);
    const doc = await docprofile({ userId: user._id });
    if (visitType === "video" && doc) {
      doc.videoTimeSlot.forEach((slot) => {
        slot._id.toString() === slotId &&
          slot.isReserved === true &&
          res.status(400).json({ message: "Slot Already Reserved" });
      });
    }
    if (visitType === "physical" && doc) {
      doc.physicalTimeSlot.forEach((slot) => {
        if (slot._id.toString() === slotId && slot.isReserved === true) {
          return res.status(400).json({ message: "Slot Already Reserved" });
        }
      });
    }
    const docNotificationObject =
      await NotificationService.docNotificationObject({
        bookingId,
        booking,
      });

    // Save Notification
    await NotificationService.saveNotification(docNotificationObject);

    //Pat
    const patNotificationObject =
      await NotificationService.patNotificationObject({
        bookingId,
        booking,
      });

    // Save Notification
    await NotificationService.saveNotification(patNotificationObject);

    // -----------------

    // Payment Object
    const paymentObj = await Payment.findOneAndUpdate(
      {
        bookingId,
      },
      {
        status: "paid",
      }
    );

    const eventDetail = {
      name: req.user.name,
      phoneNo: booking.phoneNumber,
      bookingStatus: booking.status,
    };

    //-----------------------------
    // Chat Room Object

    const chatObj = await ChatRoomService.chatRoomObject({
      patientId: booking.patientId,
      bookingId: booking._id,

      doctorId: user._id,
      patCondition: booking.reasonOfVisit,
      chatRoomType: booking.visitType,
    });
    await ChatRoomService.saveChatRoom(chatObj);

    // ----------------------
    await Booking.findOneAndUpdate(
      { _id: bookingId },
      { chatRoomId: chatObj._id, paymentStatus: "paid" }
    );
    // Reserve Slot on doctor profile
    await DocProfoileService.updateSlot(
      booking.visitType,
      booking.slotId,
      eventDetail
    );

    await newBookingEmail(
      booking.visitType,
      booking.slotId,
      user,
      req.user,
      booking.fee,
      booking.bookingDate
    );

    return res.status(200).json(booking);
  } catch (error) {
    return res.status(404).json({ error: error?.message });
  }
};
// unpaid Booking
exports.unpaidBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).json({ error: "please enter bookingId" });
    }
    const payment = await Payment.findOneAndUpdate(
      { bookingId },
      { status: "pending" }
    );
    const booking = await Booking.findById(bookingId)
      .lean()
      .select("doctorId slotId");
    if (booking.visitType === "physical") {
      await docprofile.findOneAndUpdate(
        {
          userId: booking?.doctorId,
          "physicalTimeSlot._id": booking?.slotId,
        },
        {
          $set: {
            "physicalTimeSlot.$.isReserved": false,
          },
        },
        { new: true }
      );
    } else booking.visitType === "video";
    {
      await docprofile.findOneAndUpdate(
        {
          userId: booking?.doctorId,
          "videoTimeSlot._id": booking?.slotId,
        },
        {
          $set: {
            "videoTimeSlot.$.isReserved": false,
          },
        },
        { new: true }
      );
    }

    await ChatRoom.findOneAndUpdate(
      { _id: bookingId },
      { $set: { isDeleted: true } }
    );

    return res.status(200).json({ message: "your booking is pending" });
  } catch (error) {
    return res.status(404).json({ error: error?.message });
  }
};

// Get All Payments Details => /api/v1/docprofile/get-payments
exports.getPayments = async (req, res, next) => {
  try {
    const payments = await PaymentService.getPaymentByDocId(req.user.id);

    let allPayments = [];

    for (let payment of payments) {
      const userData = await User.findById(payment.patientId, {
        image: 1,
        name: 1,
      }).lean();
      allPayments.push({ ...userData, ...payment });
    }

    return res.status(200).json(allPayments);
  } catch (error) {
    return res.status(404).json({ error: error?.message });
  }
};

// Post Review  => /api/v1/docprofile/new-review
exports.newReview = async (req, res, next) => {
  try {
    const { rating, message, patientId, bookingId, waitingRating } = req.body;
    const alreadyExit = await ReviewService.getReviewByBookingId(bookingId);

    if (alreadyExit.length > 0) {
      return res.status(400).send({ message: "Already Reviewed The Doctor" });
    }
    const bookingDetails = await Booking.findById(bookingId, {
      doctorId: 1,
      visitType: 1,
    }).lean();
    await Booking.findByIdAndUpdate(bookingId, {
      $set: { status: "completed" },
    });
    const data = {
      doctorId: bookingDetails.doctorId,
      rating,
      message,
      visitType: bookingDetails.visitType,
      patientId,
      bookingId,
      waitingRating,
    };
    const reviewObject = await ReviewService.reviewObj(data);

    await ReviewService.saveReview(reviewObject);

    const doc = await DocProfoileService.getDocProfile(bookingDetails.doctorId);

    let oldWaitingRating = Number(doc.waitingRating);
    let oldRating = Number(doc.rating);

    let noOfReview = Number(doc.noOfReview) + 1;

    doc.waitingRating = Number((oldWaitingRating + waitingRating) / noOfReview);
    doc.rating = Number((oldRating + rating) / noOfReview);

    doc.noOfReview = doc.noOfReview + 1;

    await doc.save();

    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(404).json({ error: error?.message });
  }
};

// Get Review => /api/v1/docProfile/get-reviews/:doctorId
exports.getReviews = async (req, res, next) => {
  // const reviews = await ReviewService.getReviewByDocId(id);
  try {
    let doctorId = req.params.doctorId;

    const reviews = await Review.aggregate([
      { $match: { doctorId: ObjectId(`${doctorId}`) } },
      {
        $lookup: {
          from: "users",
          localField: "patientId",
          foreignField: "_id",
          as: "patient",
        },
      },
      {
        $unwind: "$patient",
      },
      {
        $project: {
          "patient.role": 0,
          "patient.type": 0,
          "patient._id": 0,
          "patient.email": 0,
          "patient.password": 0,
          "patient.createdAt": 0,
          "patient.updatedAt": 0,
          "patient.__v": 0,
        },
      },
    ]);

    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(404).json({ error: error?.message });
  }
};
