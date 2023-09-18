import React from "react";
import { Link } from "react-router-dom";
import history from "../../helpers/history";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { profileImageURL } from "../../helpers/helpers";
export default function HeaderProfileImg() {
  const { user } = useSelector((state) => state.auth);
  const profileImage =
    user?.image?.url !== "None" ? profileImageURL + user?.image?.url : "";
  const dispatch = useDispatch();
  // signOut fun
  const signOut = () => {
    dispatch(logout());
    history.push("/");
  };
  return (
    <div className="headerProfile" style={{ minHeight: "fit-content" }}>
      <img
        src={profileImage || "/images/userIcon.png"}
        className="icon profileImg img pointer"
        style={{ height: "20px", width: "20px" }}
        alt="noit"
      ></img>

      <div className="dropDown" style={{ maxHeight: "auto !important" }}>
        <Link to="/">
          <div className="item">Home</div>
        </Link>
        <Link to={"/dashboard/setting"}>
          <div className="item">Profile Setting</div>
        </Link>

        <div className="divider"></div>
        <div onClick={signOut} className="item basicTitleSemiBold">
          Log out
        </div>
      </div>
    </div>
  );
}
