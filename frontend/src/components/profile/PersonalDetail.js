import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import { cameraIcon } from "../../assets";
import FileBtn from "../../components/common/FileBtn";
import API from "../../config/AxiosBase";
import { headers } from "../../helpers/helpers";
import GetAllLanguages from "../../components/common/GetAllLanguages";
import { getImageUrl } from "../../helpers/helpers";
import useProfileUpdate from "../../hooks/mutation/useProfileUpdate";
import { loadUser } from "../../redux/actions/authActions";
import { useQueryClient } from "react-query";
import AddPhoneNumber from "../web/book/AddPhoneNumber";
import "../../views/web/bookAndReview/BookAndReview.css";
export default function PersonalDetail({ data }) {
  const { user, isAuth, loading } = useSelector((state) => state.auth);
  const profileImg = getImageUrl(user?.image?.url);

  const userName = user?.name;
  const userId = user?._id;
  const role = user?.role;
  // states
  const [name, setName] = useState(userName || "");
  const [contactNo, setContactNo] = useState(data?.contactNo || "");
  const [aboutMe, setAboutUs] = useState(data?.aboutMe || "");
  const [lang, setLang] = useState(data?.languages || []);
  const [fileSrc, setFileSrc] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const queryClient = useQueryClient();
  // options
  const languages = GetAllLanguages();

  // update Name
  useEffect(() => {
    isAuth && setName(userName);
  }, [isAuth]);
  // dispatch
  // profielupdate fun
  const updateProfileFun = (data) => {
    headers();
    return API.patch(
      role === "patient"
        ? `/patprofile/update/${userId}`
        : `/docprofile/update/${userId}`,
      data
    );
  };
  const updateProfilePicture = (data) => {
    headers();
    return API.patch(`/auth/updatePic/${userId}`, data);
  };
  //
  const profileUpdate = useProfileUpdate("profile", updateProfileFun, true);
  const profilePicUpdate = useProfileUpdate("profile", updateProfilePicture);
  const dispatch = useDispatch();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleLangChange = (e, value) => {
    setLang(value);
  };

  //   on file upload
  const onFileUpload = (src, url) => {
    const formData = new FormData();
    formData.append("file", src);
    setFileSrc(src);
    setFileUrl(url);
    profilePicUpdate.mutate(formData, {
      onSuccess: () => {
        dispatch(loadUser());
      },
    });
  };

  //  onUpdate
  const onUpdateProfile = () => {
    const postData = {
      name,
      contactNo,
      aboutMe,
      languages: lang,
    };
    profileUpdate.mutate(postData);
  };

  //   main return
  return (
    <>
      <div className="imageWrapper">
        <img
          className="profileImg"
          src={fileUrl || profileImg}
          alt="default"
        ></img>
        <div className="uploadBtnDivWrapper">
          <FileBtn handleFile={onFileUpload}>
            <div className="uploadBtnDiv">
              <img src={cameraIcon} className="icon" alt="icon"></img>
            </div>
          </FileBtn>
        </div>
      </div>

      <div className="settitngLabel">Personal info</div>
      <TextField
        margin="dense"
        style={{ height: 40 }}
        label="Name"
        variant={"outlined"}
        className="textInput"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {loading || role === "patient" ? (
        <div style={{ maxWidth: "645px" }}>
          <AddPhoneNumber
            enableEdit
            callBack={(v) => {
              setContactNo(v);

              queryClient.invalidateQueries("profile");
            }}
            value={contactNo}
          />
        </div>
      ) : (
        <TextField
          margin="dense"
          style={{ height: 40 }}
          label="NPI number"
          variant={"outlined"}
          className="textInput"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
        />
      )}

      {role === "doctor" && (
        <Autocomplete
          multiple
          id="tags-outlined"
          options={languages}
          value={lang}
          getOptionLabel={(option) => option.name}
          filterSelectedOptions
          disableCloseOnSelect
          onChange={handleLangChange}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              style={{ height: "40px" }}
              className="textInput"
              label="languages"
              variant="outlined"
              placeholder="Languages"
            />
          )}
        />
      )}
      <br />
      <TextField
        multiline
        rows={4}
        label="About yourslef"
        variant={"outlined"}
        value={aboutMe}
        className="textInput"
        InputProps={{ style: { height: "auto" } }}
        onChange={(e) => setAboutUs(e.target.value)}
      />

      <button
        style={{ maxWidth: "645px" }}
        onClick={onUpdateProfile}
        className=" primaryDashboardBtn mb-5 mt-3"
      >
        Update Personal Info
      </button>
    </>
  );
}
