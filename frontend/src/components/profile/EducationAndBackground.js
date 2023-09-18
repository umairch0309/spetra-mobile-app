import React, { useState } from "react";
import ChipInput from "material-ui-chip-input";
import { TextField, InputAdornment } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import useProfileUpdate from "../../hooks/mutation/useProfileUpdate";
import API from "../../config/AxiosBase";
import { headers } from "../../helpers/helpers";
import { useSelector } from "react-redux";
import GetAllSpeciality from "../../components/common/GetAllSpeciality";

export default function EducationAndBackground({ data }) {
  const [speciality, setSpeciality] = useState(data?.speciality || []);
  const [education, setEducation] = useState(data?.education || []);
  const [experince, setExperince] = useState(Number(data?.experince) || 0);
  const [practices, setPracticies] = useState(data?.practices || []);
  const [hospital, setHospital] = useState(data?.hospital || []);

  // fatching user details
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  // update profile
  const updateProfileFun = (data) => {
    headers();
    return API.patch(`/docprofile/update/${userId}`, data);
  };
  //
  const profileUpdate = useProfileUpdate("profile", updateProfileFun, true);

  // options data
  const specialitiesOptions = GetAllSpeciality();

  //   multichip handlers
  const handleAddSpeciality = (v) => {
    setSpeciality([...speciality, v]);
  };
  const handleDeleteSpeciality = (v, index) => {
    const filterArr = speciality.filter((el) => el !== v);
    setSpeciality(filterArr);
  };
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

  //  on profile update
  const onUpdateProfile = () => {
    const postData = {
      speciality,
      practices,
      hospital,
      education,
      experince,
    };
    profileUpdate.mutate(postData);
  };
  //   main return
  return (
    <div>
      <div className="settitngLabel">Education & background</div>
      <div className="settitngSubLabel">Specialty & experience</div>
      <Autocomplete
        id="tags-outlined"
        options={specialitiesOptions}
        value={speciality}
        getOptionLabel={(option) => option.name}
        onChange={(e, v) => setSpeciality(v)}
        renderInput={(params) => (
          <TextField
            {...params}
            margin="dense"
            style={{ height: "40px" }}
            className="textInput mt-2"
            label="Primary Speciality"
            variant="outlined"
            placeholder="Primary Speciality"
          />
        )}
      />

      <TextField
        margin="dense"
        style={{ height: 40 }}
        label="Experince (years)"
        InputProps={{
          type: "number",
          endAdornment: <InputAdornment position="end">Year</InputAdornment>,
        }}
        value={experince}
        variant={"outlined"}
        className="textInput"
        onChange={(e) => setExperince(e.target.value)}
      />
      <div className="settitngSubLabel">Education & training</div>

      <ChipInput
        className="textInput"
        placeholder="Add multiple Education Details"
        variant={"outlined"}
        value={education}
        onAdd={(chip) => handleAddEducation(chip)}
        onDelete={(chip, index) => handleDeleteEducation(chip, index)}
      />
      <div className="settitngSubLabel">Practice names</div>

      <ChipInput
        className="textInput"
        placeholder="Add multiple Practice names"
        variant={"outlined"}
        value={practices}
        onAdd={(chip) => handleAddPractices(chip)}
        onDelete={(chip, index) => handleDeletePractices(chip, index)}
      />
      <div className="settitngSubLabel">Hospital affiliations</div>

      <ChipInput
        className="textInput"
        placeholder="Add multiple Hospital affiliations"
        variant={"outlined"}
        value={hospital}
        onAdd={(chip) => handleAddHospital(chip)}
        onDelete={(chip, index) => handleDeleteHospital(chip, index)}
      />
      <button
        style={{ maxWidth: "645px" }}
        onClick={onUpdateProfile}
        className=" primaryDashboardBtn mb-5 mt-3"
      >
        Update Education Info
      </button>
    </div>
  );
}
