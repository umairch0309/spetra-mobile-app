const twilio = require("twilio");
const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

const generateToken = () => {
  return new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );
};

const chatToken = (identity) => {
  const token = generateToken();
  token.identity = identity;

  const chatGrant = new ChatGrant({
    serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
  });
  token.addGrant(chatGrant);

  return token;
};

module.exports = { chatToken };
