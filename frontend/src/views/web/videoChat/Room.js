import React, { useEffect, useState } from "react";
import { format as formatDate, parseISO } from "date-fns";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { docProfile } from "../../../assets";
import API from "../../../config/AxiosBase";
import { headers } from "../../../helpers/helpers";
import { profileImageURL } from "../../../helpers/helpers";
import history from "../../../helpers/history";
import Participant from "./Participant";

const Room = ({ roomName, room, handleLogout, userId, role }) => {
  const [participants, setParticipants] = useState([]);
  const [isVideo, setIsVideo] = useState(true);
  const [isAudio, setIsAudio] = useState(true);

  const getBookingDetails = () => {
    headers();
    return API.get(`/booking/${roomName}`, data);
  };
  const { isLoading, data } = useQuery("bookingDetails", getBookingDetails, {
    staleTime: 100 * 60,
  });
  const bookingData = data?.data;
  const profileImage =
    bookingData?.doctorData?.image?.url !== "None" &&
    profileImageURL + bookingData?.doctorData?.image?.url;
  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants =
    participants.length === 1 ? (
      participants.map((participant) => (
        <Participant key={participant.sid} participant={participant} />
      ))
    ) : (
      <div className="title"> Waiting for other participant to join .</div>
    );

  const getRedirection = () => {
    if (
      role &&
      userId !== bookingData?.doctorData?._id &&
      userId !== bookingData?.patientData?._id
    ) {
      Swal.fire("Meeting Expired", "", "error");
      history.push(role === "doctor" ? "/doc/consulation" : "/pat/consulation");
    }
  };

  // on metting leave
  const onMeetingLeave = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "you wanna leave meeting ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",

      confirmButtonColor: "#c82333",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };
  // main return
  return (
    <>
      <div className="container-fluid headerPadding  ">
        <div className="row basicRow waitingRoom px-0">
          <div className=" col-lg-8 col-md-12 col-sm-12">
            <div className="videoDiv">
              <div className="videoControls">
                <button
                  onClick={() => setIsVideo(!isVideo)}
                  className={isVideo ? "" : "active"}
                >
                  <img
                    src="/images/video.svg"
                    alt="video"
                    className="icon"
                  ></img>
                </button>
                <button
                  onClick={() => setIsAudio((prev) => !prev)}
                  className={isAudio ? "" : "active"}
                >
                  <img src="/images/mic.svg" alt="audio" className="icon"></img>
                </button>
              </div>
              {remoteParticipants}

              <div className="myVideoDiv">
                <Participant
                  localUser
                  isAudio={isAudio}
                  isVideo={isVideo}
                  key={room.localParticipant.sid}
                  participant={room.localParticipant}
                />
              </div>
            </div>
          </div>
          {isLoading || (
            <div className="col-lg-4 col-md-12  col-sm-12">
              {getRedirection()}
              <div className=" flexCenter header">
                <img
                  src={profileImage || docProfile}
                  alt="profile"
                  className="img"
                ></img>
                <div className="ml-2">
                  <div className="waitingText">Consulation room of</div>
                  <div className="name">
                    Dr. {bookingData?.doctorData?.name}
                  </div>
                  <div className="workText">Doctor</div>
                </div>
              </div>
              <div className="flexBetweenCenter detailsDiv">
                <div className="item">
                  <div className="title">Patient</div>
                  <div className="text"> {bookingData?.patientData?.name}</div>
                </div>
                <div className="item">
                  <div className="title">Appointment time</div>
                  <div className="text">
                    {formatDate(
                      parseISO(bookingData?.bookingDate?.start),
                      "Pp"
                    )}
                  </div>
                </div>
              </div>
              <button onClick={onMeetingLeave} className="btn btn-danger w-100">
                Leave Meeting
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Room;
