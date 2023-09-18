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
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import {
  getSocial,
  updatePassword,
  updateSocial,
} from "../../../containers/ApiFun";
import history from "../../../config/history";

const SettingPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instaLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const { user } = useSelector((state) => state.auth.user);

  const { data: socialData, isLoading } = useQuery("social", getSocial);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (socialData) {
      setFacebookLink(socialData.data.facebook);
      setInstagramLink(socialData.data.instagram);
      setTwitterLink(socialData.data.twitter);
    }

    return () => {};
  }, [socialData]);

  const updatePassowrdFun = useMutation(updatePassword, {
    onSuccess: (data, val, context) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Passowrd Updated",
        showConfirmButton: false,
        timer: 2000,
      });
      setRePassword("");
      setOldPassword("");
      setNewPassword("");
      setSubmit(false);
      setErrors({});
      history.push("/admin/parent");
    },
  });
  const updateSocialFun = useMutation(updateSocial, {
    onSuccess: (data, val, context) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Socaial Updated",
        showConfirmButton: false,
        timer: 2000,
      });

      queryClient.invalidateQueries("social");

      setSubmit(false);
      setErrors({});
    },
  });
  //  for validations
  useEffect(() => {
    submit && validate();
    return () => {};
  }, [oldPassword, newPassword, rePassword]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const valid = validate();
    if (valid > 0) return;

    const formData = {
      password: newPassword,
    };
    updatePassowrdFun.mutate(formData);
  };

  const validate = () => {
    let errors = {};

    if (newPassword !== rePassword)
      errors.rePassword = "re-password is not matched";
    if (oldPassword !== user?.password)
      errors.oldPassword = "Old Password is incorrect";
    if (!newPassword) errors.newPassword = "New Password is required";
    if (!oldPassword) errors.oldPassword = "Old Password is required";
    if (!rePassword) errors.rePassword = "Re-Password is required";

    setErrors(errors);
    return Object.keys(errors).length;
  };

  // on social submit
  const onSocialSubmit = async (e) => {
    e.preventDefault();

    const valid = validateSocial();
    if (valid > 0) return;

    const formData = {
      facebook: facebookLink,
      instagram: instaLink,
      twitter: twitterLink,
    };
    updateSocialFun.mutate(formData);
  };

  //  validate social
  const validateSocial = () => {
    let errors = {};

    if (!facebookLink) errors.fb = "Facebook Link is required";
    if (!instaLink) errors.insta = "Instagram Link is required";
    if (!twitterLink) errors.twitter = "Twitter Link is required";

    setErrors(errors);
    return Object.keys(errors).length;
  };

  // main return

  return (
    <div className="c-app c-default-layout flex-row ">
      <CContainer>
        <CRow>
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Password Setting</h1>

                  <CInputGroup className="mt-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      onChange={(e) => setOldPassword(e.target.value)}
                      type="password"
                      value={oldPassword}
                      placeholder="Old Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  {errors.oldPassword && (
                    <div className="errorText">{errors.oldPassword}</div>
                  )}
                  <CInputGroup className="mt-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      onChange={(e) => setNewPassword(e.target.value)}
                      type="password"
                      value={newPassword}
                      placeholder="New Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  {errors.newPassword && (
                    <div className="errorText">{errors.newPassword}</div>
                  )}
                  <CInputGroup className="mt-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      onChange={(e) => setRePassword(e.target.value)}
                      type="password"
                      value={rePassword}
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  {errors.rePassword && (
                    <div className="errorText">{errors.rePassword}</div>
                  )}
                  <CButton
                    className="mt-3"
                    onClick={onSubmit}
                    color="success"
                    block
                    disabled={updatePassowrdFun.isLoading}
                    type="button"
                  >
                    {updatePassowrdFun.isLoading
                      ? "Loading..."
                      : "Update Password"}
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Social Account Setting</h1>

                  <CInputGroup className="mt-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cib-facebook" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      onChange={(e) => setFacebookLink(e.target.value)}
                      type="text"
                      value={facebookLink}
                      placeholder="Facebook social account link"
                    />
                  </CInputGroup>
                  {errors.fb && <div className="errorText">{errors.fb}</div>}
                  <CInputGroup className="mt-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cib-instagram" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      onChange={(e) => setInstagramLink(e.target.value)}
                      type="text"
                      value={instaLink}
                      placeholder="Instagram social account link"
                    />
                  </CInputGroup>
                  {errors.insta && (
                    <div className="errorText">{errors.insta}</div>
                  )}
                  <CInputGroup className="mt-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cib-twitter" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      onChange={(e) => setTwitterLink(e.target.value)}
                      type="text"
                      value={twitterLink}
                      placeholder="Twitter social account link"
                    />
                  </CInputGroup>
                  {errors.twitter && (
                    <div className="errorText">{errors.twitter}</div>
                  )}

                  <CButton
                    className="mt-3"
                    onClick={onSocialSubmit}
                    color="success"
                    block
                    type="button"
                    disabled={updateSocialFun?.isLoading}
                  >
                    {updateSocialFun?.isLoading
                      ? "Loading..."
                      : "Update Social"}
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

export default SettingPage;
