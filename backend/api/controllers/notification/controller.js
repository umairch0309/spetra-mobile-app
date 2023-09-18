const NotificationService = require("../../services/notification.service");
const userService = require("../../services/user.service");

//Get Notifications
exports.getNotifications = async (req, res, next) => {
  try {
    let id = req.user._id;
    const role = req.user.role;
    let seen = req.query.seen;
    let dataArr = [];
    let notifications = await (role === "patient"
      ? NotificationService.getPatNotifications(id, seen)
      : NotificationService.getDocNotifications(id, seen));
    for (notify of notifications) {
      let patient = await userService.getUserById(notify.booking.patientId);
      let doctor = await userService.getUserById(notify.booking.doctorId);
      let data = {
        ...notify,
        patientData: {
          name: patient.name,
        },
        doctorData: {
          name: doctor.name,
        },
      };

      dataArr.push(data);
    }

    return res.status(200).json(dataArr);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Delete Notification
exports.deletetNotifications = async (req, res, next) => {
  try {
    let id = req.user._id;
    const user = await userService.getUserById(id);

    if (user.role === "doctor") {
      await NotificationService.deleteDocNotifications(id);
    } else {
      await NotificationService.deletePatNotifications(id);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
exports.myNotifications = async (req, res) => {
  try {
    const data = await Notification.find()
      .sort("-updatedAt")
      .populate({ path: "data", populate: { path: "chatRoomId patientId" } })
      .limit(req.query.limit);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({}, { isSeen: true });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
