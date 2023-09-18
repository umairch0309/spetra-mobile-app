import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../../../helpers/helpers";
import { logout } from "../../../redux/actions/authActions";

export default function HeaderProfileImg() {
  const { user } = useSelector((state) => state.auth);

  // dispatcher for actions
  const dispatch = useDispatch();

  // signOut fun

  const signOut = () => {
    dispatch(logout());
  };
  return (
    <div className="headerProfile">
      <img
        src={getImageUrl(user?.image?.url)}
        className="img pointer"
        alt="headerProfile"
      ></img>

      <div className="dropDown" style={{ maxHeight: "auto !important" }}>
        <Link to="/dashboard">
          <div className="item">Dasboard</div>
        </Link>

        <Link to="/dashboard/consulation">
          <div className="item">Consulations</div>
        </Link>
        <Link to="/dashboard/appointment">
          <div className="item">Appointments</div>
        </Link>

        <div className="divider"></div>
        <div onClick={signOut} className="item basicTitleSemiBold">
          Log out
        </div>
      </div>
    </div>
  );
}
