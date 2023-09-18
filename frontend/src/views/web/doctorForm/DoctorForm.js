import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import Swal from "sweetalert2";
import { Autocomplete } from "@material-ui/lab";
import ChipInput from "material-ui-chip-input";
import AppWrapper from "../../../components/web/wrapper/AppWrapper";
import API from "../../../config/AxiosBase";
import history from "../../../helpers/history";
import GetAllSpeciality from "../../../components/common/GetAllSpeciality";
import GetAllLanguages from "../../../components/common/GetAllLanguages";
import "./doctorForm.css";

export default function DoctorForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [aboutMe, setAboutUs] = useState("");
  const [lang, setLang] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [education, setEducation] = useState([]);
  const [experince, setExperince] = useState("");
  const [practices, setPracticies] = useState([]);
  const [hospital, setHospital] = useState([]);

  // options data
  const specialitiesOptions = GetAllSpeciality();
  const languages = GetAllLanguages();
  // form validation helper
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  // loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    submit && validate();
  }, [
    name,
    email,
    contactNo,
    aboutMe,
    lang,
    speciality,
    education,
    experince,
    practices,
    hospital,
  ]);

  //   multichip handlers

  const handleAddEducation = (v) => {
    setEducation([...education, v]);
  };
  const handleDeleteEducation = (v, index) => {
    const filterArr = education.filter((el) => el !== v);
    setEducation(filterArr);
  };
  const handleAddPractices = (v) => {
    setPracticies([...practices, v]);
  };
  const handleDeletePractices = (v, index) => {
    const filterArr = practices.filter((el) => el !== v);
    setPracticies(filterArr);
  };
  const handleAddHospital = (v) => {
    setHospital([...hospital, v]);
  };
  const handleDeleteHospital = (v, index) => {
    const filterArr = hospital.filter((el) => el !== v);
    setHospital(filterArr);
  };

  // validates the forms
  const validate = () => {
    let errors = {};

    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!contactNo) errors.contactNo = "NPi number is required";
    if (!aboutMe) errors.aboutMe = "About yourself is required";
    if (!experince) errors.experince = "Experince is required";
    if (lang?.length === 0)
      errors.lang = "At least one language detail is required";
    if (speciality?.length === 0)
      errors.speciality = "At least one speciality detail is required";
    if (education?.length === 0)
      errors.education = "At least one education detail is required";
    if (practices?.length === 0)
      errors.practices = "At least one practices detail is required";
    if (hospital?.length === 0)
      errors.hospital = "At least one hosipital affilation detail is required";

    setErrors(errors);
    const validity = Object.keys(errors).length > 0;
    return validity;
  };

  // onsubmiting form

  const onSubmit = async () => {
    setSubmit(true);
    const validity = validate();
    if (validity) return;
    const postData = {
      name,
      email,
      contactNo,
      aboutMe,
      languages: lang,
      speciality,
      education,
      experince,
      practices,
      hospital,
    };
    setLoading(true);
    try {
      await API.post("/docprofile/new-docform", postData);
      Swal.fire({
        title: "Your request received successfully!",
        icon: "success",
      }).then((res) => {
        history.push("/");
      });
    } catch (error) {
      Swal.fire({
        title: "Opps , there are some errors",
        icon: "error",
      });
      const errorsMessage = error?.response?.data?.message;

      if (errorsMessage) setErrors({ email: errorsMessage });
    }
    setLoading(false);
  };

  // main return
  return (
    <AppWrapper>
      <div>
        <div className="headerPadding bg-light">
          <div className="basicRow doctorFormWrapper">
            <div className="basicLandingTitle text-center">Doctor's Form</div>

            <div className="settitngLabel">Personal info</div>
            <TextField
              margin="dense"
              style={{ height: 48, backgroundColor: "transparent" }}
              label="Name"
              variant={"outlined"}
              className="textInput"
              value={name}
              inputProps={{ style: { backgroundColor: "#fff" } }}
              name="name"
              onChange={(e) => setName(e.target.value)}
              error={errors?.name && true}
              helperText={errors?.name}
            />

            <TextField
              margin="dense"
              style={{ height: 48, backgroundColor: "transparent" }}
              label="Email"
              name="email"
              variant={"outlined"}
              className="textInput"
              inputProps={{ style: { backgroundColor: "#fff" } }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors?.email && true}
              helperText={errors?.email}
            />

            <TextField
              margin="dense"
              style={{ height: 48, backgroundColor: "transparent" }}
              label="NPI number"
              name="number"
              variant={"outlined"}
              className="textInput"
              inputProps={{ style: { backgroundColor: "#fff" } }}
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              error={errors?.contactNo && true}
              helperText={errors?.contactNo}
            />

            <Autocomplete
              multiple
              id="tags-outlined"
              options={languages}
              value={lang}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              disableCloseOnSelect
              onChange={(e, v) => setLang(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={errors?.lang && true}
                  helperText={errors?.lang}
                  className="textInput mt-2"
                  label="languages"
                  variant="outlined"
                  placeholder="Languages"
                />
              )}
            />

            <TextField
              multiline
              label="About yourself"
              rows={4}
              variant={"outlined"}
              style={{ backgroundColor: "transparent" }}
              value={aboutMe}
              className="textInput "
              InputProps={{
                style: { height: "auto", backgroundColor: "#fff" },
              }}
              onChange={(e) => setAboutUs(e.target.value)}
              error={errors?.aboutMe && true}
              helperText={errors?.aboutMe}
            />

            <div className="settitngLabel">Education & background</div>
            <div className="settitngSubLabel">Specialty & experience</div>

            <Autocomplete
              id="tags-outlined"
              options={specialitiesOptions}
              value={speciality}
              getOptionLabel={(option) => option.name}
              onChange={(e, v) => {
                setSpeciality(v);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={errors?.speciality && true}
                  helperText={errors?.speciality}
                  className="textInput mt-2"
                  label="Primary Speciality"
                  variant="outlined"
                  placeholder="Primary Speciality"
                />
              )}
            />

            <TextField
              margin="dense"
              style={{ height: 48, backgroundColor: "transparent" }}
              label="Experince (years)"
              InputProps={{
                type: "number",
                endAdornment: (
                  <InputAdornment position="end">Year</InputAdornment>
                ),
                style: { backgroundColor: "#fff" },
              }}
              value={experince}
              variant={"outlined"}
              className="textInput"
              onChange={(e) => setExperince(e.target.value)}
              error={errors?.experince && true}
              helperText={errors?.experince}
            />
            <div className="settitngSubLabel">Education & training</div>

            <ChipInput
              className="textInput"
              placeholder="Add multiple Education Details"
              variant={"outlined"}
              value={education}
              onAdd={(chip) => handleAddEducation(chip)}
              onDelete={(chip, index) => handleDeleteEducation(chip, index)}
              error={errors?.education && true}
              helperText={errors?.education}
            />
            <div className="settitngSubLabel">Practice names</div>

            <ChipInput
              className="textInput"
              placeholder="Add multiple Practice names"
              variant={"outlined"}
              value={practices}
              onAdd={(chip) => handleAddPractices(chip)}
              onDelete={(chip, index) => handleDeletePractices(chip, index)}
              error={errors?.practices && true}
              helperText={errors?.practices}
            />
            <div className="settitngSubLabel">Hospital affiliations</div>

            <ChipInput
              className="textInput"
              placeholder="Add multiple Hospital affiliations"
              variant={"outlined"}
              value={hospital}
              onAdd={(chip) => handleAddHospital(chip)}
              onDelete={(chip, index) => handleDeleteHospital(chip, index)}
              error={errors?.hospital && true}
              helperText={errors?.hospital}
            />
            <br />
            <button
              disabled={loading}
              onClick={onSubmit}
              style={{ maxWidth: "648px" }}
              className="primaryDashboardBtn mt-5 mb-5"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
}
