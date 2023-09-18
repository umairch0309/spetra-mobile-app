const questionModel = require("../../models/question");

//----------------------------------------------------------------------
//-------------------- CREATE AS QUESTION -------------------------
//----------------------------------------------------------------------

exports.askQuestion = async (req, res) => {
  try {
    const { name, email, message = "" } = req?.body;
    const questObj = { name, email, message };
    await questionModel.create(questObj);
    return res
      .status(200)
      .json({ message: "Question sent, wait for response" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
