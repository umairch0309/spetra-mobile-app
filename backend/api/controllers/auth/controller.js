const userService = require("../../services/user.service");
const PatProfoileService = require("../../services/patprofile.service");
const EmailHelpers = require("../../../helpers/emails");
const User = require("../../models/user");
const crypto = require("crypto");
const ErrorHandler = require("../../middlewares/error.handler");
const DocProfile = require("../../models/docprofile");
const BookingServices = require("../../services/booking.service");

const { sendPasswordRecoveryEmail } = require("../../../helpers/emails");

// Sign Up User => /api/v1/auth/signUp
exports.signUp = async (req, res, next) => {
  try {
    const user = await userService.getUserByEmail(req.body.email.toLowerCase());

    if (user) {
      return res.status(401).json({ message: "Email already exits" });
    }

    const userObj = {
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      type: req.body.type,
    };

    const newUser = userService.userObject(userObj);

    await userService.registerUser(newUser);
    const userData = userService.getUserByEmail(userObj.email);
    const newPat = PatProfoileService.patprofileObject({
      ...userObj,
      userId: userData._id,
    });

    await PatProfoileService.savePatProfile(newPat);

    return res.status(201).json({
      success: true,
      message: "Account is successfully created.",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Social Login => /api/v1/auth/socialLogin
exports.socialLogin = async (req, res, next) => {
  try {
    const { name, email, socialId, url, type } = req.body;

    const user = await User.findOne({
      socialId,
    });

    if (user) {
      const token = user.generateJWT();
      res.status(200).json({
        message: "successfully logged in",
        data: {
          user,
          token,
        },
      });
    } else {
      const picture = {
        name: name,
        url: url,
        mimeType: "image/jpg",
      };

      const userObj = {
        name,
        email,
        image: picture,
        type,
        socialId,
      };

      const newUser1 = userService.userObject(userObj);

      const newUser = await userService.registerUser(newUser1);

      const token = newUser.generateJWT();
      return res.status(200).json({
        user: newUser,
        token,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Sign In User => /api/v1/auth/signIn
exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email.toLowerCase());

    if (user) {
      if (!user.comparePassword(password)) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      if (user.status === "deactivate") {
        return res.status(400).json({
          message:
            "your Account has been deactivated. Contact us for more support",
        });
      }
      const token = user.generateJWT();

      return res.status(200).json({
        user,
        token,
      });
    } else {
      return res.status(400).json({
        message: "Email doesn't not exists",
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Forgot Password => /api/v1/auth/forgotPassword
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userService.getUserByEmail(email);
    if (!user)
      return res.status(401).json({
        message:
          "The email address " +
          req.body.email +
          " is not associated with any account",
      });

    await EmailHelpers.sendPasswordRecoveryEmail(user, req);

    return res.status(200).json({
      success: true,
      message: `Email sent to : ${user.email}`,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Reset Password => /api/v1/auth/password/reset/:token
exports.resetPassword = async (req, res, next) => {
  try {
    // Hash URL Token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await userService.getUserByResetToken(resetPasswordToken);

    if (!user) {
      return res.status(401).json({
        message: "Password Reset Token is Invalid or has been Expired",
      });
    }

    // Setup new Password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await userService.saveUser(user);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully, Sign in to continue",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get Load User => /api/v1/auth/me
exports.myProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id);
    if (user.role === "doctor") {
      const doc = await DocProfile.aggregate([
        { $match: { userId: req.user?._id } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $addFields: {
            role: {
              $arrayElemAt: ["$user.role", 0],
            },
          },
        },
        {
          $addFields: {
            image: {
              $arrayElemAt: ["$user.image", 0],
            },
          },
        },
        {
          $addFields: {
            _id: {
              $arrayElemAt: ["$user._id", 0],
            },
          },
        },
        {
          $project: {
            _id: 1,
            conversationId: 1,
            role: 1,
            image: 1,
            name: 1,
            aboutMe: 1,
            languages: 1,
            email: 1,
            contactNo: 1,
            hospital: 1,
            education: 1,
            practices: 1,
            experince: 1,
            rating: 1,
            waitngRating: 1,
            noOfReview: 1,
            speciality: 1,
            //  _id: 0,
          },
        },
      ]);
      return res.status(200).json({ user: doc[0] });
    }
    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Update Picture
exports.updatePicture = async (req, res, next) => {
  try {
    let image = {};

    if (req.file) {
      const { path, mimetype, originalname } = req.file;
      image = {
        name: originalname,
        url: req.file.path.replace(/\\/g, "/"),
        mimeType: mimetype,
      };
    }
    const id = req.user?.id;
    const userDoc = await userService.getUserByToken(id);

    userDoc.image = image;
    await userDoc.save();
    return res.status(201).json({
      success: true,
      data: "Profile Picture Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Dashboard Counts => /api/v1/dashboard-counts
exports.dashboardCounts = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await userService.getUserById(userId);
    let counts;

    if (user.role === "doctor") {
      counts = await BookingServices.getDocDashboardCounts(userId);
    }

    if (user.role === "patient") {
      counts = await BookingServices.getPatDashboardCounts(userId);
    }

    return res.status(200).json(counts);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Update Password => /api/v1/auth/update-password
exports.updatePassword = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await userService.getUserById(userId);
    const oldPassowrd = req.body.oldPassword;

    const isMatched = await user.comparePassword(oldPassowrd);

    if (!isMatched) {
      return res.status(400).json({ message: "Old Password is incorrect" });
    }

    user.password = req.body.newPassword;

    await userService.saveUser(user);

    return res.status(200).json({ message: "Password Updated Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
