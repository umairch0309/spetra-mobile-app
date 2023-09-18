var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    contactNo: { type: String },
    aboutMe: { type: String },
    password: { type: String },
    socialId: { type: String },
    fcmToken: { type: String },

    image: {
      name: { type: String, default: "None" },
      url: { type: String, default: "None" },
      mimeType: { type: String, default: "None" },
    },
    type: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: "patient",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    status: { type: String, enum: ["active", "deactivate"], default: "active" },
    isInsuranceFormSubmitted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

// Generate password reset token
UserSchema.methods.generateVerificationToken = function () {
  // Generate the token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
