import React, { useEffect } from "react";
import { defalutProfile } from "../../assets";
import { format as formatDate, parseISO } from "date-fns";
import { profileImageURL } from "../../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderTitle } from "../../redux/actions/dashboardActions";
export default function AppointmentsDetailsPage(props) {
  // setting Header title
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle("Appointment Detail"));
    return () => {};
  }, []);

  const propsData = props.location.state;
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;
  const profileImage =
    propsData?.doctorData?.image?.url !== "None" &&
    profileImageURL + propsData?.doctorData?.image?.url;
  // main return
  return (
    <div>
      <div className="contentRow detailPage">
        <div className="bg-white p-4 " style={{ borderRadius: "2rem" }}>
          <div className="header">
            <div className="">
              <img
                className="profileImage"
                src={profileImage || defalutProfile}
              ></img>
            </div>
          </div>
          <div className="row  align-items-center">
            <div className="label col-6  " style={{ textAlign: "end" }}>
              {role === "patient" ? "Doctor" : "Patient"} Name:
            </div>
            <div className="text col-6">{propsData?.doctorData?.name}</div>
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
              Clinic address
            </div>
            <div className="text col-5">{propsData?.location?.address}</div>
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
