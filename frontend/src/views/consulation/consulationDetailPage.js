import React, { useEffect } from "react";
import { format as formatDate, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { defalutProfile } from "../../assets";
import { profileImageURL } from "../../helpers/helpers";
import { handleJoinMeeting } from "../../helpers/helpers";
import "../appointment/appointment.css";
import { setHeaderTitle } from "../../redux/actions/dashboardActions";
export default function ConsulationDetailPage(props) {
  // setting Header title
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle("Consultation Detail"));
    return () => {};
  }, []);

  const propsData = props.location.state;
  const profileImage =
    propsData?.doctorData?.image?.url !== "None" &&
    profileImageURL + propsData?.doctorData?.image?.url;

  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const role = user?.role;
  // main return
  return (
    <div>
      <div className="contentRow detailPage">
        <div className="bg-white p-4" style={{ borderRadius: "2rem" }}>
          <div className="header">
            <div>
              <img
                className="profileImage"
                src={profileImage || defalutProfile}
              ></img>
            </div>
            {propsData.status === "up coming" && (
              <div>
                <button
                  onClick={() => handleJoinMeeting(propsData, userId)}
                  className="btn btn-outline-primary"
                  style={{ font: "14px roboto", marginLeft: "3rem" }}
                >
                  Start Consulation
                </button>
              </div>
            )}
          </div>

          <div className="row  align-items-center">
            <div className="label col-6  " style={{ textAlign: "end" }}>
              {role === "patient" ? "Patient" : "Doctor"} Name:
            </div>
            <div className="text col-6">
              {role === "patient" ? user?.name : propsData?.doctorData?.name}
            </div>
          </div>
          <div className="row  align-items-center">
            <div className="label col-6" style={{ textAlign: "end" }}>
              Visit schedule:
            </div>
            <div className="text col-6">
              {propsData?.bookingDate &&
                formatDate(parseISO(propsData?.bookingDate?.start), "Pp")}
            </div>
          </div>

          <div className="row align-items-center">
            <div className="label col-6" style={{ textAlign: "end" }}>
              Reason of visit:
            </div>
            <div className="text col-6">{propsData?.reasonOfVisit}</div>
          </div>
          <div className="row align-items-center">
            <div className="label col-6" style={{ textAlign: "end" }}>
              Status:
            </div>
            <div className="text col-6">{propsData?.status}</div>
          </div>
          <div className="row align-items-center">
            <div className="label col-6" style={{ textAlign: "end" }}>
              Fee:
            </div>
            <div className="text col-6">{propsData?.fee}$</div>
          </div>
          <div className="row align-items-center">
            <div className="label col-6" style={{ textAlign: "end" }}>
              seen this doctor before ?
            </div>
            <div className="text col-6">
              {propsData?.seenBefore ? "Yes" : "No"}
            </div>
          </div>
          {propsData?.noteForDoctor && (
            <div className="row align-items-center">
              <div className="label col-6 " style={{ textAlign: "end" }}>
                Notes for doctor
              </div>
              <div className="text col-6">{propsData?.noteForDoctor}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
