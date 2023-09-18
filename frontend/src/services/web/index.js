import API from "../../config/AxiosBase";
import { headers } from "../../helpers/helpers";
import axios from "axios";

export const getIpLookup = () => {
  return axios.get("https://extreme-ip-lookup.com/json/");
};
export const newBooking = (data) => {
  headers();
  return API.post(`/docprofile/new-booking`, data);
};
export const getSocialLinks = () => {
  return API.get(`/admin/get-social-links`);
};
export const getDashboardCounts = () => {
  headers();
  return API.get(`/auth/dashboard-counts`);
};
export const getFeaturedSpecialties = () => {
  headers();
  return API.get(`/admin/all-speciality?featured=true`);
};
export const getAllSpecialties = () => {
  headers();
  return API.get(`/admin/all-speciality`);
};
export const getPatProfile = () => {
  headers();
  return API.get(`/patprofile`);
};
export const getInsuranceDetails = () => {
  headers();
  return API.get(`/insurance/profile`);
};
