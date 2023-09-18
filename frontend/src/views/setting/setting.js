import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/common/Loading";
import EducationAndBackground from "../../components/profile/EducationAndBackground";
import InsuranceDetailsProfile from "../../components/profile/InsuranceDetails";
import PersonalDetail from "../../components/profile/PersonalDetail";
import ChangePassword from "../../components/profile/UpdatePassword";
import { setHeaderTitle } from "../../redux/actions/dashboardActions";
import { getPatProfile, getDocProfile } from "../../services/panel";
import "./settings.css";

export default function DocProfile() {
  const { user, loading } = useSelector((state) => state.auth);
  const role = user?.role;

  // setting Header title
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle("Profile Setting"));
    return () => {};
  }, []);

  // fetching data
  const { data, isLoading } = useQuery(
    "patProfile",
    role === "patient" ? getPatProfile : getDocProfile,
    {
      enabled: role != undefined,
    }
  );
  const profileData = data?.data?.data;

  // main return
  return (
    <>
      <div className="contentRow settingPageWrapper">
        {isLoading && <Loading />}
        {isLoading || (
          <>
            <PersonalDetail data={profileData} />
            {loading ||
              (role === "doctor" && (
                <EducationAndBackground data={profileData} />
              ))}
            {loading || (role === "patient" && <InsuranceDetailsProfile />)}
            <ChangePassword />
          </>
        )}
      </div>
    </>
  );
}
