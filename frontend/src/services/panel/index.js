import API from "../../config/AxiosBase";
import { headers } from "../../helpers/helpers";

// notification
export const getNewNotification = () => {
  headers();
  return API.get(`/notification/?seen=true`);
};
export const getNotification = () => {
  headers();
  return API.get(`/notification/`);
};
export const markSeenAllNotification = () => {
  headers();
  return API.delete(`/notification/`);
};
// dashboard counts
export const getDashboardCounts = () => {
  headers();
  return API.get(`/auth/dashboard-counts`);
};

// profile
export const getDocProfile = () => {
  headers();
  return API.get(`/docprofile`);
};
export const getPatProfile = () => {
  headers();
  return API.get(`/patprofile`);
};
export const updateSlot = (data) => {
  let resData =
    data?.type === "physical"
      ? { physicalTimeSlot: data.slots }
      : { videoTimeSlot: data.slots };

  headers();
  return API.put(`/docprofile/update-event`, resData);
};

// Appointments
export const getAppointments = ({ queryKey }) => {
  const count = queryKey[1];
  headers();
  return API.get(`/booking/?visitType=physical&&count=${count}`);
};
// consulation
export const getConsulations = ({ queryKey }) => {
  const count = queryKey[1];
  headers();
  return API.get(`/booking/?visitType=video&&count=${count}`);
};

// chat
export const getChatToken = async () => {
  headers();
  const response = await API.get("/chat/token");
  const { data } = response;
  return data;
};

// payment history
export const getPaymentHistory = ({ queryKey }) => {
  const count = queryKey[1];
  headers();
  return API.get(`/patprofile/get-payments?count=${count}`);
};
