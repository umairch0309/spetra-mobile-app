import AxiosBase from "../../config/AxiosBase";
import Swal from "sweetalert2";
import {
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../constants/userConstant";
import { headers } from "../../helpers/helpers";
import history from "../../helpers/history";

// SignIn action
export const SignUp = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    await AxiosBase.post(`/auth/signUp`, {
      ...formData,
    });

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: formData,
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "SignUp Successfull !",
      showConfirmButton: false,
      timer: 2000,
    });
    history.push("/login");
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response?.data,
    });
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "SignUp Failed !",
      text: error?.response?.data?.message,
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

// Login action
export const LogIn = (formData, path) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const response = await AxiosBase.post(path, {
      ...formData,
    });
    // Set token to localStorage
    const token = response.data.token;
    const user = response.data.user;
    if (token) localStorage.setItem("authToken", token);
    // Set token to Auth header
    headers();

    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Authentication Successfull !",
      showConfirmButton: false,
      timer: 2000,
    });

    history.push(
      user?.isInsuranceFormSubmitted ? "/dashboard" : "/insurance-form"
    );
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data,
    });
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Authentication Failed !",
      text: error?.response?.data?.message,
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

// Load user
export const loadUser = () => async (dispatch) => {
  const token = localStorage.authToken;
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const response = await AxiosBase.get(`/auth/me`, {
      headers: {
        "x-access-token": token || "",
      },
    });

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: response.data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      // payload: error.response.data.message,
    });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  const token = localStorage.authToken;

  try {
    if (token) {
      localStorage.removeItem("authToken");
    }
    dispatch({
      type: LOGOUT_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
    });
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Logout Failed",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};
