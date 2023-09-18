import Swal from "sweetalert2";
import { differenceInMinutes, formatDistance } from "date-fns";
import API from "../config/AxiosBase";
import history from "./history";
import { defalutProfile } from "../assets";

export const headers = () => {
  const token = localStorage.authToken;
  const bookingToken = localStorage.bookingToken;
  if (token) {
    API.defaults.headers.common["x-access-token"] = token;
    if (bookingToken) {
      API.defaults.headers.common["x-booking-token"] = bookingToken;
    }

    return API;
  } else {
    return API.defaults.headers;
  }
};
// ---
export const formatDate = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
// ---
export function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
}
// --=
export const profileImageURL = process.env.REACT_APP_IMAGE_URL;

export const getImageUrl = (url) => {
  if (url) {
    return url != "None" ? profileImageURL + url : defalutProfile;
  } else return defalutProfile;
};

// ---
export function toCaptalize(str) {
  var firstLetter = str.substr(0, 1);
  return firstLetter.toUpperCase() + str.substr(1);
}
// ---
export const handleJoinMeeting = (item, userId, showAlert = true) => {
  const date = new Date(item.bookingDate.start);
  const currentTime = new Date();
  const timeDifference = differenceInMinutes(date, currentTime);

  const timeDifferenceFormat = formatDistance(date, currentTime, {
    includeSeconds: false,
  });

  if (timeDifference <= 15 && timeDifference > -90) {
    history.push(`/video-chat?roomId=${item._id}&&name=${userId}`);
    return true;
  } else if (timeDifference < -90) {
    showAlert &&
      Swal.fire({
        titleText: `Meeintg time is Over
        `,
        icon: "error",
      });
    return false;
  } else {
    showAlert &&
      Swal.fire({
        titleText: `you can join consulation 
          15 minutes before the starting time
           ${timeDifferenceFormat} remaning
          `,
        icon: "error",
      });
    return false;
  }
};
