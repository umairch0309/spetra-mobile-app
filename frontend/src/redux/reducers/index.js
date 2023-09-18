import { combineReducers } from "redux";
import { authReducer } from "./authReducers";
import { dashboardReducers } from "./dashboardReducer";

export default combineReducers({
  auth: authReducer,
  dashboard: dashboardReducers,
});
