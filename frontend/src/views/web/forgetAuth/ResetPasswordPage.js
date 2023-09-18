import React, { useState } from "react";
import Swal from "sweetalert2";
import AppWrapper from "../../../components/web/wrapper/AppWrapper";
import API from "../../../config/AxiosBase";
import { headers } from "../../../helpers/helpers";
import history from "../../../helpers/history";
import { InputDiv } from "../login/login";

export default function ResetPasswordPage(props) {
  // states
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //   token
  const token = props.match.params.token;
  //   onSubmit fun
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) return;
    if (password !== confirmPassword) {
      Swal.fire({
        title: "Wrong Password",
        text: "confirm password doesn't match with new password",
        icon: "error",
        timer: "2000",
        showConfirmButton: false,
      });
      return;
    }

    try {
      headers();
      await API.put(`/auth/password/reset/${token}`, { password });
      Swal.fire({
        title: "Password Reset",
        text: "You can now login with your new password!",
        icon: "success",
      }).then((res) => {
        history.push("/login");
      });
    } catch (error) {
      Swal.fire({
        title: "Password Reset Failed",
        text: error?.response?.data?.message,
        icon: "error",
      });
    }
  };

  // main return
  return (
    <AppWrapper>
      <div className="headerPadding bg-light">
        <form onSubmit={onSubmit} className="forgetRow">
          <div className="title">Create a new password</div>
          <div className="text">Set your brand new passowrd</div>
          <div>
            <InputDiv
              type="password"
              onChange={(v) => setPassowrd(v)}
              label="New Password"
            />
            <InputDiv
              onChange={(v) => setConfirmPassword(v)}
              type="password"
              label="Confirm Password"
            />
          </div>
          <button type="submit" className="btnPrimary contBtn">
            Reset Password
          </button>
        </form>
      </div>
    </AppWrapper>
  );
}
