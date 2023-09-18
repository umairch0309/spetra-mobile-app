import React, { useState } from "react";
import Swal from "sweetalert2";
import AppWrapper from "../../../components/web/wrapper/AppWrapper";
import API from "../../../config/AxiosBase";
import { headers } from "../../../helpers/helpers";
import history from "../../../helpers/history";
import { InputDiv } from "../login/login";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      headers();
      await API.post("/auth/forgotPassword", { email });
      Swal.fire({
        title: "Request Sent",
        text: "You will receive an email to reset your password shorty !",
        icon: "success",
      }).then((res) => {
        history.push("/");
      });
    } catch (error) {
      Swal.fire({
        title: "Request Failed",
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
          <div className="text">
            We'll email you a link to make a brand new password.
          </div>
          <div>
            <InputDiv onChange={(v) => setEmail(v)} label="Email" />
          </div>
          <button type="submit" className="btnPrimary contBtn">
            Continue
          </button>
        </form>
      </div>
    </AppWrapper>
  );
}
