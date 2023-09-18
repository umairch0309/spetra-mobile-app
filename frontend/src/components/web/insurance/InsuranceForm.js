import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MenuItem } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import { Field, Form, Formik } from "formik";
import { Select } from "formik-material-ui";
import * as yup from "yup";
import { headers } from "../../../helpers/helpers";
import API from "../../../config/AxiosBase";
import Swal from "sweetalert2";
import history from "../../../helpers/history";
import { TextInput } from "../renderInputs";
import "../../../views/web/doctorForm/doctorForm.css";
export default function InsuranceForm({ data, status }) {
  const [isLoading, setisLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;
  // plan data
  const plans = [
    {
      name: "humana",
      plan: [
        "Medical Advantage",
        "Prescription drug plans",
        "Medicare supplements",
      ],
    },

    {
      name: "unitedHealthCare",
      plan: ["medicare", "medicaid", "supplement plans"],
    },

    {
      name: "cigna",
      plan: [
        "health Insurance",
        "Dental Insurance",
        "Medicine Advantage",
        "Medical Supplement",
        "International health",
      ],
    },
    {
      name: "blueCrossShield",
      plan: ["health of america", "BCBS Health program", "Racial Disparities"],
    },
    {
      name: "magellan",
      plan: [
        "Behavioral healthCare",
        "Advanced Imaging",
        "Cardiac",
        "physical Medical",
        "Genetic Testiny",
      ],
    },
  ];
  const find = (values) => {
    const ar = plans?.filter((plan) => {
      if (plan?.name === values.insuranceCompany) return plan;
    });
    const [first] = ar;
    const data = first.plan.map((x) => {
      return <MenuItem value={`${x}`}>{x}</MenuItem>;
    });
    return (
      <FormControl variant="outlined" className="textInput" id="planNameLabel">
        <InputLabel id="planNameLabel">Insurance Plans</InputLabel>
        <Field
          style={{
            height: 48,
            width: "100%",
          }}
          label="Plan Name"
          id="planNameLabel"
          component={Select}
          name="planName"
        >
          {data.map((sub) => sub)}
        </Field>
      </FormControl>
    );
  };

  // handleSubmit
  const handleSubmit = async (formValues) => {
    setisLoading(true);
    try {
      headers();
      await API[data ? "put" : "post"](
        data ? `/insurance/form/${data?._id}` : "/insurance/form",
        data ? { ...formValues, status: "pending" } : formValues
      );
      data
        ? status === "pending"
          ? Swal.fire({
              text: "Your insurance details will be added to your account after verification ",
              icon: "success",
              showConfirmButton: false,
            }).then(() => {
              history.push(role === "patient" ? "/dashboard" : "/doc");
            })
          : Swal.fire({
              title: "Profile Updated",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            })
        : Swal.fire({
            text: "Your insurance details will be added to your account after verification ",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            history.push(role === "patient" ? "/dashboard" : "/doc");
          });
    } catch (error) {
      Swal.fire({
        title: "Submit Form",
        icon: "error",
        showConfirmButton: false,
        timer: "3000",
      });
    }
    setisLoading(false);
  };
  return (
    <Formik
      initialValues={
        data
          ? {
              insuranceCompany: data?.insuranceCompany,
              planName: data?.planName,
              patientName: data?.patientName,
              primaryInsuranceName: data?.primaryInsuranceName,
              patientDOB: data?.patientDOB,
              primaryInsuranceDOB: data?.primaryInsuranceDOB,
              policyNo: data?.policyNo,
              groupNo: data?.groupNo,
            }
          : {
              insuranceCompany: "",
              planName: "",
              patientName: "",
              primaryInsuranceName: "",
              patientDOB: "",
              primaryInsuranceDOB: "",
              policyNo: "",
              groupNo: "",
            }
      }
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values }) => (
        <Form>
          <FormControl variant="outlined" className="textInput">
            <InputLabel id="demo-simple-select-filled-label">
              Insurance Company
            </InputLabel>
            <Field
              style={{
                height: 48,

                width: "100%",
              }}
              label="Insurance Company"
              component={Select}
              name="insuranceCompany"
              inputProps={{
                id: "age-simple",
              }}
            >
              <MenuItem value={"humana"}>Humana </MenuItem>
              <MenuItem value={"unitedHealthCare"}>United Health Care</MenuItem>
              <MenuItem value={"cigna"}>Cigna</MenuItem>
              <MenuItem value={"blueCrossShield"}>Blue Cross Shield</MenuItem>
              <MenuItem value={"magellan"}>Magellan Health</MenuItem>
            </Field>
          </FormControl>
          {errors.insuranceCompany && touched.insuranceCompany ? (
            <div className="errorText">{errors.insuranceCompany}</div>
          ) : null}

          {values.insuranceCompany && <div>{find(values)}</div>}
          {values.insuranceCompany && errors.planName && touched.planName ? (
            <div className="errorText">{errors.planName}</div>
          ) : null}

          <Field
            label="Patient Name"
            name="patientName"
            id="patientName1"
            component={TextInput}
          />

          <Field
            component={TextInput}
            name="patientDOB"
            type="date"
            label="Date of Birth"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Field
            component={TextInput}
            margin="dense"
            label="Primary Insurance Name"
            name="primaryInsuranceName"
          />

          {/* <Field
            component={TextInput}
            name="primaryInsuranceDOB"
            type="date"
            label="Date of Birth"
            InputLabelProps={{
              shrink: true,
            }}
          /> */}
          <Field
            component={TextInput}
            label="#policy"
            name="policyNo"
            type="number"
          />
          <Field
            component={TextInput}
            label="#Group"
            name="groupNo"
            type="number"
          />

          <button
            disabled={isLoading}
            type="submit"
            style={{ maxWidth: "648px" }}
            className="primaryDashboardBtn mt-5 mb-5"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

const validationSchema = yup.object({
  insuranceCompany: yup.string().required("Insurance company name is required"),
  planName: yup.string().required("Insurance plan is required"),
  patientName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .required(),

  primaryInsuranceName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .required("Patient Name is required"),
  patientDOB: yup.date().required("please enter the date of birth"),
  primaryInsuranceDOB: yup.date().required("please enter the date of birth"),
  groupNo: yup
    .number()
    .typeError("That doesn't look a number")
    .positive("A  number can't start with a minus")
    .integer("A  number can't include a decimal point")
    .min(4)
    .required("A group number is required"),

  policyNo: yup
    .number()
    .typeError("That doesn't look a number")
    .positive("A  number can't start with a minus")
    .integer("A  number can't include a decimal point")
    .min(4)
    .required("A policy number is required"),
});
