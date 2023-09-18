import { SET_HEADER_TITLE } from "../constants/dashboardConstant";

export const setHeaderTitle = (title) => {
  return {
    type: SET_HEADER_TITLE,
    payload: title,
  };
};
