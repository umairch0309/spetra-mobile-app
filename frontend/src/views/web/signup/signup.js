import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { SignUp } from "../../../redux/actions/authActions";
import { toCaptalize } from "../../../helpers/helpers";
import Header from "../../../components/web/body/Header";
import "../login/login.css";

export default function Signup() {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.auth);
  const [checkgender, setCheck] = useState("");
  const [active, setactive] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    mm: "",
    dd: "",
    yy: "",
    gender: "",
  });
  const {
    firstName,
    lastName,
    email,
    password,
    password2,
    mm,
    dd,
    yy,
    gender,
  } = user;
  const onchange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!active)
      return Swal.fire({
        icon: "error",
        text: "Please accept Terms And Conditions",
        showConfirmButton: false,
        timer: 2000,
      });

    if (password !== password2)
      return Swal.fire({
        icon: "error",
        text: "Password does not Match ",
        showConfirmButton: false,
        timer: 2000,
      });

    dispatch(
      SignUp({
        ...user,
        gender: checkgender,
        name: `${toCaptalize(user?.firstName)} ${toCaptalize(user?.lastName)}`,
        role: "patient",
      })
    );
  };

  return (
    <>
      <Header />
      <div className="headerPadding bg-light">
        <div className="patientSignUp">
          <div className="title">Create an account</div>
          <Link to="/login">
            <div className=" pointer textBlue  poppinsSb mt-2 mb-5 ">
              Already have one? Log in.
            </div>
          </Link>

          <form onSubmit={onSubmit}>
            <div className="inputDiv">
              <label className="label">Your Name</label>
              <div className="flexCenter">
                <input
                  className="textInput"
                  placeholder="First Name"
                  style={{ width: "50%" }}
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={onchange}
                  required
                ></input>
                <input
                  className="textInput"
                  placeholder="Last Name"
                  style={{ width: "50%" }}
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={onchange}
                  required
                ></input>
              </div>
            </div>
            <div className="inputDiv">
              <label className="label">E-mail</label>
              <div className="flexCenter">
                <input
                  className="textInput"
                  placeholder="Enter Email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={onchange}
                  required
                ></input>
              </div>
            </div>

            <div className="inputDiv">
              <label className="label">Password</label>
              <div className="flexCenter">
                <input
                  className="textInput"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onchange}
                  required
                ></input>
              </div>
            </div>
            <div className="inputDiv">
              <label className="label">Confirm Password</label>
              <div className="flexCenter">
                <input
                  className="textInput"
                  placeholder="Confirm Password"
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={onchange}
                  required
                ></input>
              </div>
            </div>

            <div className="inputDiv">
              <label className="label">Date of birth</label>
              <div className="d-flex">
                <input
                  className="textInput"
                  maxLength="2"
                  placeholder="MM"
                  type="text"
                  name="mm"
                  value={mm}
                  onChange={onchange}
                  required
                ></input>
                <input
                  className="textInput"
                  maxLength="2"
                  placeholder="DD"
                  type="text"
                  name="dd"
                  value={dd}
                  onChange={onchange}
                  required
                ></input>
                <input
                  className="textInput"
                  maxLength="4"
                  placeholder="YYYY"
                  type="text"
                  name="yy"
                  value={yy}
                  onChange={onchange}
                  required
                ></input>
              </div>
            </div>
            <RadioGroup
              row
              aria-label="sex"
              name="Sex"
              className="inputDiv"
              value={checkgender}
              onChange={(e, v) => setCheck(v)}
            >
              <lable className="label">Sex</lable>
              <div className="flexCenter w-100">
                <FormControlLabel
                  value="male"
                  className="radioDiv"
                  control={<Radio color="primary" size="small" />}
                  label="Male"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="femail"
                  className="radioDiv"
                  control={<Radio color="primary" size="small" />}
                  label="Femail"
                  labelPlacement="end"
                />
              </div>
            </RadioGroup>

            <div className="my-4">
              <CheckTerms active={active} setactive={setactive} />
            </div>

            <button className=" loginBtn signUpButton mb-4" disabled={loading}>
              {loading ? "Loading..." : " Save and continue"}
            </button>
          </form>
          <Link to="/doctor-form">
            <div className=" pointer textBlue mb-5  poppinsSb ">
              Are you a doctor ?
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

const CheckTerms = ({ setactive, active }) => {
  return (
    <div
      onClick={() => {
        setactive(!active);
      }}
      className="d-flex"
    >
      <div className={active ? "circle circleActive" : "circle"}></div>
      <div>
        I have read and accept Zocdoc's
        <span className="textBlue poppinsSb "> Terms of Use</span> and
        <span className="textBlue poppinsSb"> Privacy Policy.</span>
      </div>
    </div>
  );
};
