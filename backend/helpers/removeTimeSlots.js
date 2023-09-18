const { isAfter, parseISO } = require("date-fns");
const Docprofile = require("../api/models/docprofile");

const removeTimeSlots = async () => {
  const allProfiles = await Docprofile.find();
  for (let profile of allProfiles) {
    const physicalTimeSlot = profile?.physicalTimeSlot;
    const videoTimeSlot = profile?.videoTimeSlot;
    if (physicalTimeSlot?.length > 0) {
      const filterdPhysicalTimeSlot = physicalTimeSlot.filter((el) => {
        if (isAfter(parseISO(el.start), new Date())) {
          return el;
        }
      });
      profile.physicalTimeSlot = filterdPhysicalTimeSlot;
    }
    if (videoTimeSlot?.length > 0) {
      const filterdVideoTimeSlot = videoTimeSlot.filter((el) => {
        if (isAfter(parseISO(el.start), new Date())) {
          return el;
        }
      });
      profile.videoTimeSlot = filterdVideoTimeSlot;
    }
    await profile.save();
  }
  console.log("time slot updated");
};

module.exports = removeTimeSlots;
