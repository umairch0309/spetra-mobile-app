import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import useProfileUpdate from "../../hooks/mutation/useProfileUpdate";
import API from "../../config/AxiosBase";
import { headers } from "../../helpers/helpers";

export default function ChangePassword() {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassowrd, setConfirmPassowrd] = useState("");

  // fatching user details
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  // update profile
  const updateProfileFun = (data) => {
    headers();
    return API.post(`/auth/update-password`, data);
  };
  //
  const profileUpdate = useProfileUpdate("profile", updateProfileFun, true);
  //   on update
  const onUpdateProfile = (e) => {
    e.preventDefault();
    if (!oldPassword || !confirmPassowrd || !newPassword) {
      Swal.fire("Please fill all the required details !", "", "error");
      return;
    }
    if (confirmPassowrd !== newPassword) {
      Swal.fire("Confirm Password doesn't match", "", "error");
      return;
    }
    const postData = {
      oldPassword,
      newPassword,
    };

    profileUpdate.mutateAsync(postData, {
      onError: (err) => {
        Swal.fire(`${err?.response?.data?.message}`, "", "error");
      },
    });
  };

  // main return
  return (
    <form>
      <div className="settitngLabel">Change Passowrd</div>
      <TextField
        margin="dense"
        style={{ height: 40 }}
        label="old Password"
        type="password"
        variant={"outlined"}
        className="textInput"
        value={oldPassword}
        onChange={(e) => setoldPassword(e.target.value)}
      />
      <TextField
        margin="dense"
        style={{ height: 40 }}
        label="New Password"
        type="password"
        variant={"outlined"}
        className="textInput"
        value={newPassword}
        onChange={(e) => setnewPassword(e.target.value)}
      />
      <TextField
        margin="dense"
        style={{ height: 40 }}
        label="Confirm Password"
        variant={"outlined"}
        className="textInput"
        type="password"
        value={confirmPassowrd}
        onChange={(e) => setConfirmPassowrd(e.target.value)}
      />

      <button
        style={{ maxWidth: "645px" }}
        onClick={onUpdateProfile}
        className=" primaryDashboardBtn mb-5 mt-3"
      >
        Update Password
      </button>
    </form>
  );
}
