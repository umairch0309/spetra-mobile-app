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
import history from "../../../config/history";
import Swal from "sweetalert2";

const AddPatient = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");
  const [rePassword, setRePassoword] = useState("");
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    submit && validate();
    return () => {};
  }, [name, email, password, rePassword]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const valid = validate();
    if (valid > 0) return;

    const formData = {
      name,
      email,
      password,
    };
    const token = localStorage.adminToken;
    try {
      const response = await AxiosBase.post(`/admin/new-patient`, formData, {
        headers: {
          "x-access-token": token,
        },
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Patient Added",
        showConfirmButton: false,
        timer: 2000,
      });
      history.push("/admin/parent");
    } catch (error) {
      let err = error?.response?.data?.message;
      if (err) setErrors(err);
      if (err)
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Check Error",
          showConfirmButton: false,
          timer: 2000,
        });
    }
  };

  const validate = () => {
    let errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (password !== rePassword)
      errors.rePassword = "re-password is not matched";
    if (!password) errors.password = "Password is required";
    if (!rePassword) errors.rePassword = "Re-Password is required";

    setErrors(errors);
    return Object.keys(errors).length;
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Add Patient Account</h1>
                  <p className="text-muted">Create new account for Parent</p>
                  <CInputGroup className="">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      autoComplete="name"
                    />
                  </CInputGroup>
                  {errors.name && (
                    <div className="errorText">{errors.name}</div>
                  )}
                  <CInputGroup className="mt-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </CInputGroup>
                  {errors.email && (
                    <div className="errorText">{errors.email}</div>
                  )}
                  <CInputGroup className="mt-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      onChange={(e) => setPassoword(e.target.value)}
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  {errors.password && (
                    <div className="errorText">{errors.password}</div>
                  )}
                  <CInputGroup className="mt-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      onChange={(e) => setRePassoword(e.target.value)}
                      type="password"
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

export default AddPatient;
