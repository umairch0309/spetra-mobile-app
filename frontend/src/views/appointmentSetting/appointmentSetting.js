import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import Loading from "../../components/common/Loading";
import AppointmentCalender from "../../components/setting/AppointmentCalender";
import ProfileAddressDetail from "../../components/setting/ProfileAddressDetail";
import { setHeaderTitle } from "../../redux/actions/dashboardActions";
import { getDocProfile } from "../../services/panel";
export default function SetAppointments() {
  // setting Header title
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle("Appointment Setting"));
    return () => {};
  }, []);

  // fetching profile
  const { data, isLoading } = useQuery("profile", getDocProfile);
  const profileData = data?.data?.data;
  const events = profileData?.physicalTimeSlot || [];

  // main return
  return (
    <div>
      <div className="contentRow schedulerPageWrapper">
        {isLoading && <Loading />}
        {isLoading || (
          <>
            <div className="secTitle">
              Set your Address & Appointments time slot
            </div>
            <ProfileAddressDetail data={profileData} />
            <div className="bg-white">
              <AppointmentCalender events={events} appointmentType="physical" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
