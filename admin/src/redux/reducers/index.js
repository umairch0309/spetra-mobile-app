import { combineReducers } from "redux";
import { authReducer } from "./authReducers";

const initialState = {
  sidebarShow: "responsive",
};
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};
export default combineReducers({
  sideBarState: changeState,
  auth: authReducer,
});