import { TextField, InputAdornment } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import AxiosBase from "../../../config/AxiosBase";
import Swal from "sweetalert2";
import history from "../../../config/history";
import { Autocomplete } from "@material-ui/lab";
import ChipInput from "material-ui-chip-input";
import { languages, specialitiesOptions } from "../../../containers/constants";

const AddTeacher = () => {
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
    const token = localStorage.adminToken;
    try {
      await AxiosBase.post("/admin/new-doctor", postData, {
        headers: {
          "x-access-token": token,
        },
      });
      Swal.fire({
        title: "Your request received successfully!",
        icon: "success",
      }).then((res) => {
        history.push("/admin/dashboard");
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

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Add Doctor Account</h1>
                  <p className="text-muted">Create new account for Teacher</p>

                  <TextField
                    margin="dense"
                    style={{ height: 55 }}
                    fullWidth
                    label="Name"
                    variant={"outlined"}
                    className="textInput"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    error={errors?.name && true}
                    helperText={errors?.name}
                  />

                  <TextField
                    margin="dense"
                    style={{ height: 55 }}
                    fullWidth
                    label="Email"
                    name="email"
                    variant={"outlined"}
                    className="textInput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors?.email && true}
                    helperText={errors?.email}
                  />

                  <TextField
                    margin="dense"
                    style={{ height: 55 }}
                    fullWidth
                    label="NPI number"
                    name="number"
                    variant={"outlined"}
                    className="textInput"
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
                  <br />
                  <TextField
                    multiline
                    label="About yourslef"
                    fullWidth
                    rows={4}
                    variant={"outlined"}
                    value={aboutMe}
                    className="textInput "
                    InputProps={{ style: { height: "auto" } }}
                    onChange={(e) => setAboutUs(e.target.value)}
                    error={errors?.aboutMe && true}
                    helperText={errors?.aboutMe}
                  />
                  <br />
                  <br />
                  <h4 className="settitngLabel">Education & background</h4>
                  <br />
                  <h6 className="settitngSubLabel">Specialty & experience</h6>

                  <Autocomplete
                    id="tags-outlined"
                    options={specialitiesOptions}
                    value={speciality}
                    getOptionLabel={(option) => option}
                    onChange={(e, v) => setSpeciality(v)}
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
                    style={{ height: 60 }}
                    fullWidth
                    label="Experince (years)"
                    InputProps={{
                      type: "number",
                      endAdornment: (
                        <InputAdornment position="end">Year</InputAdornment>
                      ),
                    }}
                    value={experince}
                    variant={"outlined"}
                    className="textInput"
                    onChange={(e) => setExperince(e.target.value)}
                    error={errors?.experince && true}
                    helperText={errors?.experince}
                  />
                  <h6 className="settitngSubLabel">Education & training</h6>

                  <ChipInput
                    className="textInput"
                    placeholder="Add multiple Education Details"
                    fullWidth
                    variant={"outlined"}
                    value={education}
                    onAdd={(chip) => handleAddEducation(chip)}
                    onDelete={(chip, index) =>
                      handleDeleteEducation(chip, index)
                    }
                    error={errors?.education && true}
                    helperText={errors?.education}
                  />
                  <br />
                  <br />
                  <h6 className="settitngSubLabel">Practice names</h6>
                  <ChipInput
                    className="textInput"
                    placeholder="Add multiple Practice names"
                    fullWidth
                    variant={"outlined"}
                    value={practices}
                    onAdd={(chip) => handleAddPractices(chip)}
                    onDelete={(chip, index) =>
                      handleDeletePractices(chip, index)
                    }
                    error={errors?.practices && true}
                    helperText={errors?.practices}
                  />
                  <br />
                  <br />
                  <h6 className="settitngSubLabel">Hospital affiliations</h6>
                  <ChipInput
                    className="textInput"
                    placeholder="Add multiple Hospital affiliations"
                    fullWidth
                    variant={"outlined"}
                    value={hospital}
                    onAdd={(chip) => handleAddHospital(chip)}
                    onDelete={(chip, index) =>
                      handleDeleteHospital(chip, index)
                    }
                    error={errors?.hospital && true}
                    helperText={errors?.hospital}
                  />
                  <br />
                  <br />

                  <CButton
                    disabled={loading}
                    className="mt-3"
                    onClick={onSubmit}
                    color="success"
                    block
                    type="button"
                  >
                    Submit
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default AddTeacher;
