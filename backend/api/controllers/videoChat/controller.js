const { sendVideoLink } = require("../../../helpers/emails");
const { videoToken } = require("../../../helpers/videoChatTokens");

exports.videoToken = async (req, res, next) => {
  try {
    const identity = req.body.name;
    const room = req.body.bookingId;
    const token = videoToken(identity, room);

    //   await sendVideoLink();

    return res.status(200).send({
      token: token.toJwt(),
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.participantVideoToken = async (req, res, next) => {
  try {
    const identity = req.body.name;
    const room = req.body.bookingId;
    const token = videoToken(identity, room);

    return res.status(200).send({
      token: token.toJwt(),
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
