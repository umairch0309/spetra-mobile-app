import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";
import "./sidebar.css";

// sidebar nav config
import navigation from "./_nav";
import logoWhite from "../assets/images/logoWhite.svg";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sideBarState.sidebarShow);

  return (
    <CSidebar
      colorScheme="danger"
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/admin/dashboard">
        <img
          src={logoWhite}
          className=" my-3 sidebar-logo"
          alt="logo"
          style={{ width: "140px" }}
        ></img>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
