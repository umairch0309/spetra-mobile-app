import {
  RESET_HEADER_TITLE,
  SET_HEADER_TITLE,
} from "../constants/dashboardConstant";

// Auth Reducer
export const dashboardReducers = (state = { title: "Dashboard" }, action) => {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case RESET_HEADER_TITLE:
      return {
        ...state,
        title: "Dashboard",
      };

    default:
      return state;
  }
};
