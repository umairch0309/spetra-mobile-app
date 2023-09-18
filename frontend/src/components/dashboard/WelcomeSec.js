import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getDashboardCounts } from "../../services/web";

export default function WelcomeSec() {
  const { user, loading } = useSelector((state) => state.auth);
  const role = user?.role;

  // fetching dashboard data
  const { data, isLoading } = useQuery("counts", getDashboardCounts);
  const counts = data?.data;

  // main return
  return (
    <div>
      <div className="welcomeSec">
        {loading || (
          <div className="secTitle mb-1">
            Hi, {`${role === "doctor" ? `Dr. ` : ""}${user?.name}`}
          </div>
        )}
        <div className="flexBetweenCenter welcomeFlex">
          <div className="welcomeCard consulationBg">
            <img src="/images/newCons.png" className="img"></img>
            <div className="title">
              New
              <br /> Consultation Requests
            </div>
            <div className="value">{isLoading ? 0 : counts?.consultations}</div>
          </div>
          <div className="welcomeCard revenueBg">
            <img src="/images/upIcon.png" className="img"></img>
            <div className="title">
              New
              <br /> Appointment Requests
            </div>
            <div className="value">{isLoading ? 0 : counts?.appointments}</div>
          </div>
          <div className="welcomeCard consulationBg2">
            <img src="/images/tick.png" className="img"></img>
            <div className="title">
              Total
              <br /> Completed Consultations
            </div>
            <div className="value">{isLoading ? 0 : counts?.completed}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
