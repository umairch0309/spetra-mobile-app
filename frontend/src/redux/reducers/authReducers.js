import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstant";

// Auth Reducer
export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuth: false,
      };
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuth: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuth: true,
        loginError: {},
        signInError: {},
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuth: true,
        loginError: {},
        signInError: {},
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuth: false,
        loginError: {},
        signInError: {},
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuth: false,
        user: {},
        error: action.payload,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loginError: action.payload,
        user: null,
        isAuth: false,
      };

    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        signInError: action.payload,
        user: null,
        isAuth: false,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        isAuth: false,
        user: {},
      };

    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loginError: null,
        signInError: null,
      };
    default:
      return state;
  }
};
