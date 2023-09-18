import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NotificationSec from "../../components/dashboard/NotificationSec";
import WelcomeSec from "../../components/dashboard/WelcomeSec";
import { setHeaderTitle } from "../../redux/actions/dashboardActions";
import "./dashboard.css";

export default function DashboardPage() {
  // setting Header title
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle("Dashboard"));
    return () => {};
  }, []);

  return (
    <div className="contentRow dashboard">
      <WelcomeSec />
      <NotificationSec />
    </div>
  );
}
