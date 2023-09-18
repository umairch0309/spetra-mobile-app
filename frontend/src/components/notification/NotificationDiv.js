import { format as formatDate, parseISO } from "date-fns";
import { handleJoinMeeting } from "../../helpers/helpers";

const NotificationDiv = ({ item, userId, role }) => {
  return (
    <div className="flexBetweenCenter notificationDiv">
      <div className="flexCenter">
        <img src="/images/notiBell.png" className="img" alt="noti"></img>
        <div className="d-flex">
          <div className="title">
            {`${
              item?.booking?.visitType === "video"
                ? "Consulation"
                : "Appointment"
            } with ${
              item[role === "patient" ? "doctorData" : "patientData"]?.name
            } at ${formatDate(
              parseISO(item?.booking?.bookingDate?.start),
              "Pp"
            )} `}
          </div>
        </div>
      </div>
      <button
        onClick={() => handleJoinMeeting(item.booking, userId)}
        className="btn btn-outline-primary btn-sm"
      >
        join
      </button>
    </div>
  );
};

export default NotificationDiv;
