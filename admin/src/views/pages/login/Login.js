import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import { LogIn } from "../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { logoOnly } from "../../../assets/images";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loginError = {}, loadLoading, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const onLogin = (e) => {
    e.preventDefault();
    if ([email, password].includes("")) return;

    dispatch(LogIn({ email, password }));
  };
  return (
    <>
      {loadLoading || (
        <div className="c-app c-default-layout flex-row align-items-center">
          {isAuthenticated && <Redirect to="/admin/dashboard" />}
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="8">
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={onLogin}>
                        <h1>Admin Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <CInputGroup className="">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            autoComplete="email"
                          />
                        </CInputGroup>
                        {loginError.email && (
                          <>
                            <div className="errorText ">{loginError.email}</div>
                          </>
                        )}
                        <CInputGroup className="mt-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            autoComplete="current-password"
                          />
                        </CInputGroup>
                        {loginError.password && (
                          <>
                            <div className="errorText ">
                              {loginError.password}
                            </div>
                          </>
                        )}
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              onClick={onLogin}
                              color="primary"
                              className="px-4 mt-4"
                              type="submit"
                            >
                              Login
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                  <CCard
                    className="text-white bg-primary py-5 d-md-down-none"
                    style={{ width: "44%" }}
                  >
                    <div className="centerFlex">
                      {/* <img
                        src={logoOnly}
                        style={{ width: "80%" }}
                        alt="logo"
                      ></img> */}
                    </div>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      )}
    </>
  );
}

export default Login;
