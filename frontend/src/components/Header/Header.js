import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import history from "../../helpers/history";
import { RESET_HEADER_TITLE } from "../../redux/constants/dashboardConstant";
import HeaderProfileImg from "./HeaderDropDown";
export default function Header({ active, setHandleActive }) {
  const { title } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  // useEffect(() => {
  //   return () => {
  //     dispatch({ type: RESET_HEADER_TITLE });
  //   };
  // }, [path]);
  // main return
  return (
    <div>
      <nav className="flexBetweenCenter dashboardNavBar ">
        {/* SideBarButton */}
        <div className="d-inline d-md-none">
          <div
            onClick={() => setHandleActive(!active)}
            className={
              active
                ? " dashboardNavaBarButton activeSideBar "
                : "dashboardNavaBarButton"
            }
          >
            <div className="dashboardNavBarLine dashboardNavBarLine1"></div>
            <div className="dashboardNavBarLine dashboardNavBarLine2"></div>
            <div className="dashboardNavBarLine dashboardNavBarLine3"></div>
          </div>
        </div>
        {typeof title === "string" ? <a class="navBrand">{title}</a> : title}

        <div className="flexCenter navIcons">
          <img
            onClick={() => history.push("/dashboard/notification")}
            style={{ width: "18px" }}
            src="/images/noti.png"
            className="icon pointer"
            alt="noit"
          ></img>
          <HeaderProfileImg />
        </div>
      </nav>
    </div>
  );
}
