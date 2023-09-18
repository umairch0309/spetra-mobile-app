import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import AppWrapper from "../../../components/web/wrapper/AppWrapper";
import "./aboutUs.css";
import "../login/login.css";
export default function ContactUsPage() {
  const [formState, setFormState] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  //   handle form Change
  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // validates the forms
  const validate = () => {
    let errors = {};

    const required = (value) => {
      if (!formState[value]) errors[value] = `${value} is required`;
    };
    required("name");
    required("email");
    required("message");

    setErrors(errors);
    const validity = Object.keys(errors).length > 0;
    return validity;
  };

  //   validate after submit
  useEffect(() => {
    submit && validate();
  }, [formState]);

  //   handle formsubmit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    const isNotValid = validate();
    if (isNotValid) return;
  };
  // main return
  return (
    <AppWrapper>
      <div className="headerPadding">
        <div className="basicLandingRow contactUsRow">
          <div className="centerFlex" style={{ height: "50vh" }}>
            <div>
              <div className="basicLandingTitle ">Get In Touch</div>
              <div className="text mt-2">
                If you’re a patient looking for precise and convenient
                healthcare options accessible from the comfort of your home, or
                a practitioner looking for new professional opportunities, get
                in touch to learn more about My Cloud Doc. We’re here to answer
                questions and walk you through a complete demonstration of the
                platform.
              </div>
            </div>
          </div>

          <form
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            className="contactUsForm"
          >
            <TextField
              margin="dense"
              style={{ height: 48, backgroundColor: "transparent" }}
              label="Name"
              name="name"
              variant={"outlined"}
              className="textInput"
              inputProps={{ style: { backgroundColor: "#fff" } }}
              error={errors?.name && true}
              helperText={errors?.name}
            />
            <TextField
              margin="dense"
              style={{ height: 48, backgroundColor: "transparent" }}
              label="Email"
              name="email"
              type="email"
              variant={"outlined"}
              className="textInput"
              inputProps={{ style: { backgroundColor: "#fff" } }}
              error={errors?.email && true}
              helperText={errors?.email}
            />
            <TextField
              multiline
              label="Message"
              name="message"
              rows={4}
              variant={"outlined"}
              style={{ backgroundColor: "transparent" }}
              className="textInput mt-2 "
              InputProps={{
                style: { height: "auto", backgroundColor: "#fff" },
              }}
              error={errors?.message && true}
              helperText={errors?.message}
            />

            <button
              className="loginBtn  signUpButton"
              type={"submit"}
              style={{ marginTop: "100px" }}
            >
              {" "}
              Submit{" "}
            </button>
          </form>
        </div>
        <div className="footerPadding"></div>
      </div>
    </AppWrapper>
  );
}
