import { ErrorToast, SuccessToast } from "../../containers/Toast";
import AxiosBase, { setAuthToken } from "../../config/AxiosBase";
import Swal from "sweetalert2";
import history from "../../config/history";
import {
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
} from "../constants/userConstant";

// Login action
export const LogIn = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const response = await AxiosBase.post(`/admin/logIn`, {
      ...formData,
    });
    // Set token to localStorage
    const { token } = response.data;

    localStorage.setItem("adminToken", token);
    // Set token to Auth header
    setAuthToken(token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Authentication Successfull !",
      showConfirmButton: false,
      timer: 2000,
    });

    if (response.data.user.userStatus === "Admin") {
      history.push("/admin/dashboard");
    }
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
  const token = localStorage.adminToken;
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const response = await AxiosBase.get(`/admin/me`, {
      headers: {
        "x-access-token": token || "",
      },
    });

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: response.data,
    });

    if (response.data.user.userStatus === "Admin") {
      history.push("/admin/dashboard");
    }
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      // payload: error.response.data.message,
    });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  const token = localStorage.adminToken;

  try {
    if (token) {
      localStorage.removeItem("adminToken");
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
