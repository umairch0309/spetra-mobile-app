const InsuranceForm = require("../../models/insuranceForm");
const user = require("../../models/user");
const User = require("../../models/user");
const userService = require("../../services/user.service");

exports.newInsuranceForm = async (req, res, next) => {
  const { user, body } = req;
  try {
    const newForm = new InsuranceForm({ userId: user?._id, ...body });

    const getuser = await InsuranceForm.findOne({ userId: user?._id });
    //const user = await userService.getUserById(id);

    if (!getuser) {
      await newForm.save();
      await User.findByIdAndUpdate(user?._id, {
        $set: { isInsuranceFormSubmitted: true },
      });
      return res.status(200).send(newForm);
    } else {
      return res.status(400).json({ message: "Form already added" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
exports.getInsuranceForm = async (req, res, next) => {
  const { status } = req.query;
  try {
    // const forms = await InsuranceForm.findOne({ userId: req.user?._id });
    const forms = await InsuranceForm.aggregate([
      { $match: { status } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $addFields: {
          role: "$user.role",
        },
      },
      {
        $project: {
          user: 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    return res.status(200).send(forms);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
exports.getInsuranceFormMobile = async (req, res, next) => {
  try {
    const forms = await InsuranceForm.findOne({ userId: req.user?._id });

    return res.status(200).send(forms);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
exports.updateInsuranceForm = async (req, res, next) => {
  const { id } = req.params;
  try {
    const forms = await InsuranceForm.findByIdAndUpdate(id, {
      $set: { ...req.body },
    });
    return res.status(200).send(forms);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getInsuranceForProfile = async (req, res, next) => {
  const { user } = req;
  try {
    const form = await InsuranceForm.findOne({ userId: user?._id });
    return res.status(200).send(form);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
