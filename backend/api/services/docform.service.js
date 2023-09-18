const DocForm = require("../models/docform");

//New Doc Form Object
const docFormObject = (req) => {
  return new DocForm({
    ...req,
  });
};

//Get Doc Form By id
const getDocFormById = (id) => {
  return DocForm.findById(id);
};

//Get All Docs Forms
const getAllDocsForm = () => {
  return DocForm.find();
};

//Save Doc Form
const saveDocForm = (docform) => {
  return docform.save();
};

//Delete Doc Form
const deleteDocForm = (id) => {
  return DocForm.findByIdAndDelete(id);
};

//Delete Doc Form by Email
const deleteDocFormByEmail = (email) => {
  return DocForm.findOneAndDelete({ email: email });
};

module.exports = {
  docFormObject,
  getDocFormById,
  getAllDocsForm,
  saveDocForm,
  deleteDocForm,
  deleteDocFormByEmail,
};
