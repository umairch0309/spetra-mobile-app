import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FacebookIcon from "@material-ui/icons/Facebook";
import EmailIcon from "@material-ui/icons/Email";
import GoogleIcon from "@material-ui/icons/Google";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Header from "../../../components/web/body/Header";
import { LogIn } from "../../../redux/actions/authActions";
import "./login.css";
// function
export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const onchange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(LogIn({ ...user }, `/auth/signIn`));
  };

  // on google success
  const onGoogleSuccess = (res) => {
    const profile = res?.profileObj;
    const { imageUrl, name, email, googleId } = profile;
    const data = {
      name,
      url: imageUrl,
      email,
      socialId: googleId,
      type: "google",
    };
    dispatch(LogIn(data, `/auth/socialLogin`));
  };
  // on google success
  const onGoogleError = (res) => {};

  // facebook response
  const facebookResponse = (res) => {};

  // return
  return (
    <>
      <Header />

      <div className="headerPadding bg-light">
        <div className="loginRow">
          <div>
            <div className="title">Log in with email</div>
            <form onSubmit={onSubmit}>
              <div className="inputDiv">
                <label className="label">E-mail</label>
                <div className="flexCenter">
                  <input
                    className="textInput"
                    placeholder="Enter Email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={onchange}
                    required
                  ></input>
                </div>
              </div>

              <div className="inputDiv">
                <label className="label">Password</label>
                <div className="flexCenter">
                  <input
                    className="textInput"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onchange}
                    required
                  ></input>
                </div>
              </div>
              <button className="loginBtn  signUpButton" disabled={loading}>
                {loading ? "Loading..." : "Sign In"}
              </button>
            </form>
            <Link to="/auth/forget">
              <div className=" pointer textBlue text-center poppinsSb my-3">
                Forget your password ?
              </div>
            </Link>
            <Link to={"/patient/signup"}>
              <button className=" loginBtn loginButton">
                <EmailIcon /> Sign up with email
              </button>
            </Link>
            <GoogleLogin
              clientId="269241505697-0gt6j7467ttk73mbl7oud2vvopartnf8.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className=" loginBtn loginButton googleButton "
                >
                  <GoogleIcon /> Sign in with google
                </button>
              )}
              onSuccess={onGoogleSuccess}
              onFailure={onGoogleError}
              cookiePolicy="single_host_origin"
            />
            <FacebookLogin
              appId="806250436969121"
              autoLoad={false}
              fields="name,email,picture"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  className=" loginBtn loginButton facebookButton"
                >
                  <FacebookIcon /> Sign in with facebook
                </button>
              )}
              callback={facebookResponse}
            />
            ,
          </div>
        </div>
      </div>
    </>
  );
}

export const InputDiv = ({
  placeholder,
  label,
  onChange,
  defaultValue,
  type,
  textArea,
}) => {
  const handleChange = (e) => {
    onChange && onChange(e.target.value);
  };
  return (
    <div className="inputDiv">
      {label && <label className="label">{label}</label>}
      {textArea ? (
        <textarea
          onChange={handleChange}
          className="inputStyle"
          placeholder={placeholder}
          type={type || "text"}
          defaultValue={defaultValue}
          rows={3}
        ></textarea>
      ) : (
        <input
          onChange={handleChange}
          className="textInput"
          type={type || "text"}
          placeholder={placeholder}
          defaultValue={defaultValue}
        ></input>
      )}
    </div>
  );
};
