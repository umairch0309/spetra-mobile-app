import React, { Suspense, lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import history from "../../helpers/history";
import "./layout.css";

// lazy imports
const Dashboard = lazy(() => import("../../views/dashboard/dashboard"));
const Consulation = lazy(() => import("../../views/consulation/consulation"));
const Appointment = lazy(() => import("../../views/appointment/appointment"));
const Messages = lazy(() => import("../../views/messaging/messaging"));
const AppointmentDetail = lazy(() =>
  import("../../views/appointment/AppointmentsDetailsPage")
);
const ConsulationDetail = lazy(() =>
  import("../../views/consulation/consulationDetailPage")
);
const AppointmentSetting = lazy(() =>
  import("../../views/appointmentSetting/appointmentSetting")
);
const ConsulationSetting = lazy(() =>
  import("../../views/consulationSetting/consulationSetting")
);
const PaymentHistory = lazy(() =>
  import("../../views/paymentHistory/paymentHistory")
);
const Notification = lazy(() =>
  import("../../views/notifications/NotificationPage")
);
const Setting = lazy(() => import("../../views/setting/setting"));

// Layout fun
export default function Layout() {
  // loading
  const loadingFallback = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );
  const [sideBarActive, setSideBarActive] = useState(false);
  const { isAuth, loading } = useSelector((state) => state.auth);

  // redirecting unAuthorized user
  useEffect(() => {
    loading || isAuth || history.push("/");
    return () => {};
  }, [loading, isAuth]);

  // main retrun
  return (
    <div className="dashboardMainDiv">
      <Sidebar active={sideBarActive} setHandleActive={setSideBarActive} />
      <div className="headerSec">
        <Header active={sideBarActive} setHandleActive={setSideBarActive} />
        <div className="contentMainSec" id="contentSec">
          <Suspense fallback={loadingFallback}>
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route
                path="/dashboard/consulation"
                exact
                component={Consulation}
              />
              <Route
                path="/dashboard/consulation/detail"
                component={ConsulationDetail}
              />
              <Route
                path="/dashboard/appointment"
                exact
                component={Appointment}
              />
              <Route
                path="/dashboard/appointment/detail"
                component={AppointmentDetail}
              />
              <Route path="/dashboard/messages" component={Messages} />
              <Route
                path="/dashboard/physical-setting"
                component={AppointmentSetting}
              />
              <Route
                path="/dashboard/video-setting"
                component={ConsulationSetting}
              />
              <Route
                path="/dashboard/payment-history"
                component={PaymentHistory}
              />
              <Route
                path="/dashboard/notification"
                component={Notification}
              ></Route>
              <Route path="/dashboard/setting" component={Setting}></Route>

              {/* <Route path="/dashboard/:error" component={ErrorPage} />  */}
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
