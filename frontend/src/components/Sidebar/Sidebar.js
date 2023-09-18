import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import history from "../../helpers/history";
import { doctorItems, patientItems } from "./sideBarItems";
import "./Sidebar.css";

function SideBar({ active, setHandleActive, location }) {
  const { user, loading } = useSelector((state) => state.auth);
  const role = user?.role;
  const itemsData = loading
    ? []
    : role === "patient"
    ? patientItems
    : doctorItems;

  const [activeItem, setActiveItem] = useState(itemsData[0]);
  // make svg compoennt
  const makeSvgComponent = (Component, isActive) => {
    const activeColorOne = "#48afc9";
    const activeColorTwo = "#FFF";
    const disableColorOne = "#FFFFFF";
    const disableColorTwo = "#727272";
    return (
      <Component
        colorOne={isActive ? activeColorOne : disableColorOne}
        colorTwo={isActive ? activeColorTwo : disableColorTwo}
      />
    );
  };

  // getting active path
  const path = location.pathname;
  // setting current active tab
  useEffect(() => {
    const currnetItem = itemsData.find((el) => path === el?.link);
    if (currnetItem) setActiveItem(currnetItem);
    return () => {
      setActiveItem(itemsData[0]);
    };
  }, [path, itemsData]);

  // main return

  return (
    <>
      <div className="sideBar sideBarDiv d-none d-md-block">
        <div className="centerDiv">
          <img
            onClick={() => history.push("/")}
            src="/images/logoBlue.svg"
            className="logo"
          ></img>
        </div>

        <div className="itemsFlex">
          <div className="w-100">
            {itemsData.length > 0 &&
              itemsData.map((item, index) => {
                const isActive = activeItem?.link === item?.link;
                return (
                  <Link to={item?.link}>
                    <div
                      onClick={() => setActiveItem(item)}
                      key={index}
                      className={
                        isActive
                          ? "DashboardSideBarItem sideBarItemActive"
                          : "DashboardSideBarItem"
                      }
                    >
                      <div style={{ width: "40px" }}>
                        {item?.component &&
                          makeSvgComponent(item?.component, isActive)}
                      </div>
                      <div className="title">{item?.name}</div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>

      {/* mobile Side Bar */}
      <div className="d-block d-md-none">
        <div
          onClick={() => setHandleActive(false)}
          className={
            active ? "sideBarModal sideBarModalActive" : "sideBarModal"
          }
        ></div>
        <div
          className={
            active
              ? "sideBarM sideBarDiv sideBarMActive"
              : "sideBarM sideBarDiv"
          }
        >
          <div className="centerDiv">
            <img
              onClick={() => history.push("/")}
              src="/images/logo.svg"
              className="logo"
            ></img>
          </div>

          <div className="itemsFlex">
            <div className="w-100">
              {itemsData.length > 0 &&
                itemsData.map((item, index) => {
                  const isActive = activeItem?.link === item?.link;
                  return (
                    <Link to={item?.link}>
                      <div
                        onClick={() => {
                          setActiveItem(item);
                          setHandleActive(false);
                        }}
                        key={index}
                        className={
                          isActive
                            ? "DashboardSideBarItem sideBarItemActive"
                            : "DashboardSideBarItem"
                        }
                      >
                        <div style={{ width: "40px" }}>
                          {item?.component &&
                            makeSvgComponent(item?.component, isActive)}
                        </div>
                        <div className="title">{item?.name}</div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withRouter(SideBar);
