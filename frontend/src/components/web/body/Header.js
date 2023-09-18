import React, { useState, useEffect } from "react";
import HeaderSideBar from "./HeaderSideBar";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClickAwayListener } from "@material-ui/core";
import HeaderProfileImg from "./HeaderDropDown";
import "./header.css";
function Header(props) {
  const { loading, isAuth } = useSelector((state) => state.auth);
  // sideBar state
  const [active, setHandleActive] = useState(false);
  // const transparent Bg state
  const [transparent, setTransparent] = useState(false);
  // const active login Bg state
  const [activeLogin, setActiveLogin] = useState(false);
  // path name value
  const { location } = props;
  const path = location.pathname;

  //   close sideBar
  const closeSideBar = () => {
    setHandleActive(false);
  };

  const scrollFun = () => {
    var scrollValue = window.scrollY;

    if (scrollValue > 100) setTransparent(false);
    else setTransparent(true);
  };

  // check if the path changes then transparent navBar
  useEffect(() => {
    if (path === "/") {
      setTransparent(true);
      document.addEventListener("scroll", scrollFun);
    } else setTransparent(false);

    return () => {
      document.removeEventListener("scroll", scrollFun);
    };
  }, [path]);

  //   main return
  return (
    <>
      <div>
        <nav
          className={
            transparent === true
              ? "navbar navbar-expand-md navbar-light bg-transparent"
              : "navbar navbar-expand-md navbar-light bg-navColor"
          }
        >
          <Link className="navbar-brand" to="/">
            <img
              src={
                transparent ? "/images/logoWhite.svg" : "/images/logoBlue.svg"
              }
              className="logo"
              alt="logo"
            ></img>
          </Link>
          {/* HeaderSideBar Component*/}
          <div className=" d-inline d-md-none">
            <HeaderSideBar activeSideBar={active} closeSideBar={closeSideBar} />
          </div>

          {/* SideBarButton */}
          <div className="d-inline d-md-none">
            <div
              onClick={() => setHandleActive(!active)}
              className={
                active ? " navaBarButton activeSideBar " : "navaBarButton"
              }
            >
              <div
                className={
                  transparent
                    ? "navBarLine navBarLineActive navBarLine1"
                    : "navBarLine navBarLine1"
                }
              ></div>
              <div
                className={
                  transparent
                    ? "navBarLine navBarLineActive navBarLine2"
                    : "navBarLine navBarLine2"
                }
              ></div>
              <div
                className={
                  transparent
                    ? "navBarLine navBarLineActive navBarLine3"
                    : "navBarLine navBarLine3"
                }
              ></div>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {loading || isAuth || (
                <li className="nav-item">
                  <Link
                    className={transparent ? "nav-link textWhite" : "nav-link"}
                    to="/doctor-form"
                  >
                    Join as a Doctor
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link
                  className={transparent ? "nav-link textWhite" : "nav-link"}
                  to="/contact-us"
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            <div className="loginBtnDiv">
              {loading || (isAuth && <HeaderProfileImg />)}
              {loading || isAuth || (
                <button
                  onClick={() => setActiveLogin(!activeLogin)}
                  className=" btnLogin"
                  type="button"
                >
                  Login/Sign Up
                </button>
              )}

              {activeLogin && (
                <ClickAwayListener
                  onClickAway={() => {
                    setActiveLogin(false);
                  }}
                >
                  <div
                    // onClick={() => setActiveLogin(false)}
                    className="loginDropDown"
                  >
                    <div className="flexCenter item">
                      <div className="title">Patients</div>

                      <Link to="/patient/signup">
                        <div className="text">Sign up</div>
                      </Link>
                      <Link to="/login">
                        <div className="text">Log In</div>
                      </Link>
                    </div>
                    <div className="flexCenter item">
                      <div className="title">Doctor</div>
                      <Link to="/login">
                        <div className="text">Log In</div>
                      </Link>
                    </div>
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
export default withRouter(Header);
