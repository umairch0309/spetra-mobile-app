import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/authActions";
import history from "../../../helpers/history";

export default function HeaderSideBar(props) {
  // getting userData
  const { user, isAuth } = useSelector((state) => state.auth);
  const role = user?.role;

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    props.closeSideBar();
  };
  // main return
  return (
    <div
      className={
        props.activeSideBar
          ? "headerSideBar headerSideBarActive"
          : "headerSideBar"
      }
    >
      <div className="sideBarItemDiv">
        {isAuth || (
          <>
            <Link to="/patient/signup">
              <button className="primaryBtn btnSignUp">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="primaryBtn btnLogin">Login</button>
            </Link>
          </>
        )}

        {isAuth && (
          <div
            onClick={() => {
              role === "doctor" ? history.push("/doc") : history.push("/pat");
              props.closeSideBar();
            }}
            className="sideBarItem"
          >
            Dashboard
          </div>
        )}
        <div
          onClick={() => {
            history.push("/");
            props.closeSideBar();
          }}
          className="sideBarItem"
        >
          Home
        </div>
        <div
          onClick={() => {
            history.push("/about-us");
            props.closeSideBar();
          }}
          className="sideBarItem"
        >
          About Us
        </div>
        <div
          onClick={() => {
            history.push("/search");
            props.closeSideBar();
          }}
          className="sideBarItem"
        >
          Doctors
        </div>
        <div
          onClick={() => {
            history.push("/contact-us");
            props.closeSideBar();
          }}
          className="sideBarItem"
        >
          Contact Us
        </div>

        {isAuth && (
          <button
            style={{
              position: "absolute",
              bottom: "30px",
              width: "80%",
              left: "50%",
              marginLeft: "-40%",
            }}
            className="primaryBtn btnSignUp mt-5"
            onClick={handleLogout}
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
}
