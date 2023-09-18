import React from "react";
import { TextField } from "@material-ui/core";
import { ErrorMessage } from "formik";
export function TextInput({ field, form: { errors, touched }, ...props }) {
  return (
    <div>
      <TextField
        margin="dense"
        style={{ height: 48, backgroundColor: "transparent" }}
        variant={"outlined"}
        className="textInput mb-0"
        inputProps={{ style: { backgroundColor: "#fff" } }}
        error={touched[field.name] && Boolean(errors[field.name])}
        helperText={touched[field.email] && errors[field.email]}
        {...props}
        {...field}
      />
      <ErrorMessage name={field.name} className="errorText mb-2">
        {(msg) => <div className="errorText">{msg} </div>}
      </ErrorMessage>
    </div>
  );
}
