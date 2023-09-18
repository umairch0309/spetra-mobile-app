import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import { Field, Form, Formik } from "formik";
import { RadioGroup, Select } from "formik-material-ui";
import * as yup from "yup";
import AppWrapper from "../../../components/CloudDoc/AppWrapper";
import TextInput from "./TextInput";
import { FormControlLabel } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
const validationSchema = yup.object({
  insurance: yup.string().required(),
  PatientName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .required(),
  staffName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .required(),
  companyName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .required(),
  PrimaryName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .required(),
  todayDate: yup.date().required(),
  dob: yup.date().required(),
  effectiveDate: yup.date().required(),
  dob1: yup.date().required(),
  group: yup
    .number()
    .typeError("That doesn't look a number")
    .positive("A  number can't start with a minus")
    .integer("A  number can't include a decimal point")
    .min(1)
    .max(20)
    .required("A group number is required"),
  phoneNumber: yup
    .number()
    .typeError("That doesn't look a number")
    .positive("A  number can't start with a minus")
    .integer("A  number can't include a decimal point")
    .min(1)
    .max(20)
    .required("A phone number is required"),
  amountMet: yup
    .number()
    .typeError("That doesn't look a number")
    .positive("A  number can't start with a minus")
    .integer("A  number can't include a decimal point")
    .min(1)
    .max(20)
    .required("A amount met is required"),
  oopMax: yup
    .number()
    .typeError("That doesn't look a number")
    .positive("A  number can't start with a minus")
    .integer("A  number can't include a decimal point")
    .min(1)
    .max(20)
    .required("A oopMax is required"),
  oopMin: yup
    .number()
    .typeError("That doesn't look a number")
    .positive("A  number can't start with a minus")
    .integer("A  number can't include a decimal point")
    .min(1)
    .max(20)
    .required("A  oopMin is required"),
  copayAmount: yup
    .number()
    .typeError("That doesn't look a number")
    .positive("A  number can't start with a minus")
    .integer("A  number can't include a decimal point")
    .min(1)
    .max(20)
    .required("A copayAmount is required"),
  insuranceAmount: yup
    .number()
    .typeError("That doesn't look a number")
    .positive("A  number can't start with a minus")
    .integer("A  number can't include a decimal point")
    .min(1)
    .max(20)
    .required("A insurance Amount is required"),
  deductible: yup
    .number()
    .typeError("That doesn't look a number")
    .positive("A  number can't start with a minus")
    .integer("A  number can't include a decimal point")
    .min(1)
    .max(20)
    .required("A deductible is required"),
  policy: yup
    .number()
    .typeError("That doesn't look a number")
    .positive("A  number can't start with a minus")
    .integer("A  number can't include a decimal point")
    .min(1)
    .max(20)
    .required("A policy number is required"),
  dollarAmount: yup
    .number()
    .typeError("That doesn't look a number")
    .positive("A  number can't start with a minus")
    .integer("A  number can't include a decimal point")
    .min(1)
    .max(20)
    .required("Dollar amount is required"),
  visits: yup
    .number()
    .typeError("That doesn't look a number")
    .positive("A  number can't start with a minus")
    .integer("A  number can't include a decimal point")
    .min(1)
    .max(20)
    .required("Number of visits is required"),
  fsa: yup.string().required("A radio option is required"),
  hra: yup.string().required("A radio option is required"),
  yearType: yup.string().required("A radio option is required"),
  xray: yup.string().required("A radio option is required"),
  mri: yup.string().required("A radio option is required"),
  acn: yup.string().required("A radio option is required"),
  cmt: yup.string().required("A radio option is required"),
  plan: yup.string().required("A radio option is required"),
  copayVisits: yup.string().required("A radio option is required"),
});

function InsuranceForm() {
  return (
    <AppWrapper>
      <div>
        <div className="headerPadding bg-light">
          <div className="basicRow doctorFormWrapper">
            <div className="basicLandingTitle text-center">
              Insurance Verfication Form
            </div>
            <div className="settitngLabel">Starting detail</div>
            <label style={{ marginBottom: "0" }}>Today date</label>
            <Formik
              initialValues={{
                insurance: "",
                todayDate: "",
                staffName: "",
                PatientName: "",
                PrimaryName: "",
                dob: "",
                dob1: "",
                policy: "",
                group: "",
                companyName: "",
                effectiveDate: "",
                phoneNumber: "",
                deductible: "",
                amountMet: "",
                oopMax: "",
                oopMin: "",
                copayAmount: "",
                insuranceAmount: "",
                fsa: "",
                hra: "",
                yearType: "",
                dollarAmount: "",
                visits: "",
                mri: "",
                xray: "",
                acn: "",
                cmt: "",
                plan: "",
                copayVisits: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    name="todayDate"
                    type="date"
                    id="todayDate"
                    component={TextInput}
                  />

                  <Field
                    label="Staff Name"
                    name="staffName"
                    id="staffName"
                    component={TextInput}
                  />
                  <Field
                    label="Patient Name"
                    name="PatientName"
                    id="PatientName"
                    component={TextInput}
                  />
                  <label style={{ marginBottom: "0" }}>Date of Birth</label>
                  <Field component={TextInput} name="dob" type="date" />
                  <Field
                    component={TextInput}
                    margin="dense"
                    label="Primary Insurance Name"
                    name="PrimaryName"
                  />

                  <label style={{ marginBottom: "0" }}>Date of Birth</label>
                  <Field component={TextInput} name="dob1" type="date" />
                  <Field
                    component={TextInput}
                    label="#policy"
                    name="policy"
                    type="number"
                  />
                  <Field
                    component={TextInput}
                    label="#Group"
                    name="group"
                    type="number"
                  />
                  <div className="settitngLabel" style={{ marginTop: "15px" }}>
                    Primary Insurance Data
                  </div>
                  <Field
                    label="Company name"
                    name="companyName"
                    id="companyName"
                    component={TextInput}
                  />
                  <label style={{ marginBottom: "0" }}>Effective Date</label>
                  <Field
                    name="effectiveDate"
                    type="date"
                    id="effectiveDate"
                    component={TextInput}
                  />
                  <Field
                    label="phoneNumber"
                    name="phoneNumber"
                    type="number"
                    id="phoneNumber"
                    component={TextInput}
                  />
                  <Field
                    label="deductible"
                    name="deductible"
                    type="number"
                    id="deductible"
                    component={TextInput}
                  />
                  <Field
                    label="Amount met"
                    name="amountMet"
                    type="number"
                    id="amountMet"
                    component={TextInput}
                  />
                  <Field
                    label="OOP MAx"
                    name="oopMax"
                    type="number"
                    id="oopMax"
                    component={TextInput}
                  />
                  <Field
                    label="OOP Min"
                    name="oopMin"
                    type="number"
                    id="oppMin"
                    component={TextInput}
                  />
                  <Field
                    label="Copay Amount"
                    name="copayAmount"
                    type="number"
                    id="copayAmount"
                    component={TextInput}
                  />
                  <Field
                    label="Co insurance Amount"
                    name="insuranceAmount"
                    type="number"
                    id="insuranceAmount"
                    component={TextInput}
                  />
                  <label style={{ marginBottom: "0" }}>
                    Does patient have a Health Savings Account or Health
                    Reimbursement (FSA) account?
                  </label>
                  <Field component={RadioGroup} name="fsa">
                    <FormControlLabel
                      style={{ marginBottom: "0" }}
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      style={{ marginBottom: "0" }}
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </Field>
                  {errors.fsa && touched.fsa ? (
                    <div style={{ color: "red" }}>{errors.fsa}</div>
                  ) : null}
                  <label style={{ marginBottom: "0" }}>
                    Does insurance company pay out of HRA account or do we
                    collect from patient?
                  </label>
                  <Field component={RadioGroup} name="hra">
                    <FormControlLabel
                      style={{ marginBottom: "0" }}
                      value="Insurance"
                      control={<Radio />}
                      label="Insurance"
                    />
                    <FormControlLabel
                      value="Patient"
                      control={<Radio />}
                      label="Patient"
                    />
                  </Field>
                  {errors.hra && touched.hra ? (
                    <div style={{ color: "red" }}>{errors.hra}</div>
                  ) : null}
                  <label style={{ marginBottom: "0" }}>
                    Is policy based on a calendar year or contract year?
                  </label>
                  <Field component={RadioGroup} name="yearType">
                    <FormControlLabel
                      style={{ marginBottom: "0" }}
                      value="calender year"
                      control={<Radio />}
                      label="Calender year"
                    />
                    <FormControlLabel
                      style={{ marginBottom: "0" }}
                      value="contract year"
                      control={<Radio />}
                      label="Contract year"
                    />
                  </Field>
                  {errors.yearType && touched.yearType ? (
                    <div style={{ color: "red" }}>{errors.yearType}</div>
                  ) : null}
                  <Field
                    label="Number of visits per year"
                    name="visits"
                    type="number"
                    id="visits"
                    component={TextInput}
                  />
                  <Field
                    label="Dollar amount per year"
                    name="dollarAmount"
                    type="number"
                    id="phoneNumber"
                    component={TextInput}
                  />
                  <label style={{ marginBottom: "0" }}>
                    Any per authorization for advanced imaging:
                  </label>
                  <h6 style={{ marginBottom: "0", marginTop: "5px" }}>X-RAY</h6>
                  <Field component={RadioGroup} name="xray">
                    <FormControlLabel
                      style={{ marginBottom: "0" }}
                      value="true"
                      control={<Radio />}
                      label="yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </Field>
                  {errors.xray && touched.xray ? (
                    <div style={{ color: "red" }}>{errors.xray}</div>
                  ) : (
                    ""
                  )}
                  <h6 style={{ marginBottom: "0" }}>MRI</h6>
                  <Field component={RadioGroup} name="mri">
                    <FormControlLabel
                      style={{ marginBottom: "0" }}
                      value="true"
                      control={<Radio />}
                      label="yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </Field>
                  {errors.xray && touched.xray ? (
                    <div style={{ color: "red" }}>{errors.mri}</div>
                  ) : (
                    ""
                  )}
                  <label style={{ marginBottom: "0" }}>
                    ACN form required?
                  </label>
                  <Field component={RadioGroup} name="acn">
                    <FormControlLabel
                      style={{ marginBottom: "0" }}
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      style={{ marginBottom: "0" }}
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </Field>
                  {errors.acn && touched.acn ? (
                    <div style={{ color: "red" }}>{errors.acn}</div>
                  ) : null}

                  <label style={{ marginBottom: "0" }}>
                    Is there a limit on modalities when billed with a CMT code?
                  </label>
                  <Field component={RadioGroup} name="cmt">
                    <FormControlLabel
                      style={{ marginBottom: "0" }}
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      style={{ marginBottom: "0" }}
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </Field>
                  {errors.cmt && touched.cmt ? (
                    <div style={{ color: "red" }}>{errors.acn}</div>
                  ) : null}
                  <label style={{ marginBottom: "0" }}>
                    Is there a double copay for visits with exams or re‐exams?
                  </label>
                  <Field component={RadioGroup} name="copayVisits">
                    <FormControlLabel
                      style={{ marginBottom: "0" }}
                      value="exam"
                      control={<Radio />}
                      label="exam"
                    />
                    <FormControlLabel
                      style={{ marginBottom: "0" }}
                      value="re-exam"
                      control={<Radio />}
                      label="re-exam"
                    />
                  </Field>
                  {errors.copayVisits && touched.copayVisits ? (
                    <div style={{ color: "red" }}>{errors.copayVisits}</div>
                  ) : null}

                  <label style={{ marginBottom: "0" }}>
                    Is this plan self‐funded or ERISA? _
                  </label>
                  <Field component={RadioGroup} name="plan">
                    <FormControlLabel
                      style={{ marginBottom: "0" }}
                      value="self-funded"
                      control={<Radio />}
                      label="self-funded"
                    />
                    <FormControlLabel
                      style={{ marginBottom: "0" }}
                      value="erisa"
                      control={<Radio />}
                      label="ERISA"
                    />
                  </Field>

                  {errors.plan && touched.plan ? (
                    <div style={{ color: "red" }}>{errors.plan}</div>
                  ) : null}
                  <FormControl
                    variant="filled"
                    style={{ margin: "5px", width: "12rem" }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Insurance Company
                    </InputLabel>
                    <Field
                      style={{
                        height: 48,
                        backgroundColor: "transparent",
                        width: "12rem",
                      }}
                      label="Insurance Company"
                      component={Select}
                      name="insurance"
                      inputProps={{
                        id: "age-simple",
                      }}
                    >
                      <MenuItem value={"humana"}>Humana </MenuItem>
                      <MenuItem value={"united heath care"}>
                        United Health Care
                      </MenuItem>
                      <MenuItem value={"Cigna"}>Cigna</MenuItem>
                      <MenuItem value={"blue cross shield"}>
                        Blue Cross Shield
                      </MenuItem>
                      <MenuItem value={"Magellan"}>Magellan Health</MenuItem>
                    </Field>
                  </FormControl>

                  <button
                    type="submit"
                    style={{ maxWidth: "648px" }}
                    className="primaryDashboardBtn mt-5 mb-5"
                  >
                    submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
}
export default InsuranceForm;
