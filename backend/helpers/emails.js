const User = require("../api/models/user");
const nodemailer = require("nodemailer");
const sendgridTransport = require("@sendgrid/mail");
// const sendgridTransport = require("nodemailer-sendgrid-transport");
const ejs = require("ejs");
var moment = require("moment");

sendgridTransport.setApiKey(
  "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"
);
// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key:
//         "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",
//     },
//   })
// );

// const sendingEmail = "alexiskyprianou1@gmail.com";
const sendingEmail = "msoban54@gmail.com";

const sendPasswordRecoveryEmail = async (user, req) => {
  // Get reset token
  const resetToken = user.generateVerificationToken();

  await user.save({ validateBeforeSave: false });

  // Create reset password url
  const resetUrl = `https://myclouddoc.com/auth/reset-password/${resetToken}`;

  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/PasswordRecovery.ejs",
    { resetUrl }
  );

  const data = {
    to: user.email,
    from: "msoban54@gmail.com",
    subject: "Password Recovery",
    html: emailTemplate,
  };

  await sendgridTransport.send(data);
};

const doctorForm = async (email) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/DoctorForm.ejs",
    { email }
  );

  const data = {
    to: email,
    from: "msoban54@gmail.com",
    subject: "Doctor Form Submitted",
    html: emailTemplate,
  };

  await sendgridTransport.send(data);
};

const ApprovedDoctorForm = async (email, password) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/ApproveDoctorForm.ejs",
    { email, password }
  );
  console.log(email, password);
  const data = {
    to: email,
    from: "msoban54@gmail.com",
    subject: "Doctor Form Approved",
    html: emailTemplate,
  };

  await sendgridTransport.send(data);
};

const DeclinedDoctorForm = async (email) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/DeclineDoctorForm.ejs",
    { email }
  );

  const data = {
    to: email,
    from: "msoban54@gmail.com",
    subject: "Doctor Form Declined",
    html: emailTemplate,
  };

  await sendgridTransport.send(data);
};

// Admin Add Patient
const AdminPatientAccount = async (name, email, password) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/AdminPatientAccount.ejs",
    { name, email, password }
  );

  const data = {
    to: email,
    from: "msoban54@gmail.com",
    subject: "Patient Account",
    html: emailTemplate,
  };

  await sendgridTransport.send(data);
};

// Admin Delete Patient Account
const AdminDeletePatient = async (name, email) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/AdminDeletePatient.ejs",
    { name, email }
  );

  const data = {
    to: email,
    from: "msoban54@gmail.com",
    subject: "Patient Account Deleted",
    html: emailTemplate,
  };

  await sendgridTransport.send(data);
};

// Admin Delete Doctor Account
const AdminDeleteDoctor = async (name, email) => {
  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/AdminDeleteDoctor.ejs",
    { name, email }
  );

  const data = {
    to: email,
    from: "msoban54@gmail.com",
    subject: "Doctor Account Deleted",
    html: emailTemplate,
  };

  await sendgridTransport.send(data);
};

// New Booking Mail
const newBookingEmail = async (
  visitType,
  slotId,
  doctor,
  patient,
  fee,
  date
) => {
  let subject = visitType === "video" ? "Consultation" : "Appointment";

  let startDate = moment(date.start).format("MMMM Do YYYY, h:mm:ss a");
  let endDate = moment(date.end).format("MMMM Do YYYY, h:mm:ss a");

  const emailTemplate = await ejs.renderFile(
    __dirname + "/EmailTemplates/NewBooking.ejs",
    {
      subject,
      slotId,
      doctorName: doctor.name,
      doctorEmail: doctor.email,
      patientName: patient.name,
      patientEmail: patient.email,
      fee,
      startDate,
      endDate,
    }
  );

  const data = {
    to: [doctor.email, patient.email],
    from: "msoban54@gmail.com",
    subject: subject,
    html: emailTemplate,
  };

  await sendgridTransport.send(data);
};

const sendVideoLink = async () => {
  const videoLink = `http://localhost:3000?name=ali&bookingId=1`;

  const data = {
    to: "abdullah.khan10032@gmail.com",
    from: "msoban54@gmail.com",
    subject: "Video Link",
    text: videoLink,
  };

  await sendgridTransport.send(data);
};

module.exports = {
  sendPasswordRecoveryEmail,
  doctorForm,
  ApprovedDoctorForm,
  DeclinedDoctorForm,
  sendVideoLink,
  newBookingEmail,
  AdminPatientAccount,
  AdminDeletePatient,
  AdminDeleteDoctor,
};
