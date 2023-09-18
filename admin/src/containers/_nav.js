import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Patient",
    to: "/admin/patient",
    icon: <CIcon name="cil-people" customClasses="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Doctor",
    icon: "cil-pencil",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Active Doctors",
        to: "/admin/doctor/active-doctor",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Pending Doctors",
        to: "/admin/doctor/pending-doctor",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Declined Doctors",
      //   to: "/admin/doctor/declined-doctor",
      // },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Insurance",
    icon: "cil-inbox",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Active",
        to: "/admin/insurance/form/active",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Pending",
        to: "/admin/insurance/form/pending",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Rejected",
        to: "/admin/insurance/form/rejected",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Speciality",
    to: "/admin/specialities",
    icon: <CIcon name="cil-people" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Languages",
    to: "/admin/languages",
    icon: <CIcon name="cil-speech" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Consultations",
    to: "/admin/consultations",
    icon: <CIcon name="cil-inbox" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Appointments",
    to: "/admin/appointments",
    icon: <CIcon name="cil-calendar" customClasses="c-sidebar-nav-icon" />,
  },
];

export default _nav;
