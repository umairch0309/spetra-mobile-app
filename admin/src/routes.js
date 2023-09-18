import { exact } from "prop-types";
import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

// page Imports
const Patient = React.lazy(() => import("./views/pages/Patient/PatientPages"));
const AddPatient = React.lazy(() => import("./views/pages/Patient/AddPatient"));

const AddDoctor = React.lazy(() => import("./views/pages/Doctor/AddDoctor"));
const ActiveDoctor = React.lazy(() =>
  import("./views/pages/Doctor/ActiveDoctor")
);
const PendingDoctor = React.lazy(() =>
  import("./views/pages/Doctor/PendingDoctor")
);
const DoctorDetails = React.lazy(() =>
  import("./views/pages/Doctor/DoctorDetails")
);
const PendingInsurance = React.lazy(() =>
  import("./views/pages/Insurance/PendingInsurance")
);
const ActiveInsurance = React.lazy(() =>
  import("./views/pages/Insurance/ActiveInsurance")
);
const RejectedInsurance = React.lazy(() =>
  import("./views/pages/Insurance/RejectedInsurance")
);
const InsuranceDetail = React.lazy(() =>
  import("./views/pages/Insurance/InsuranceDetail")
);

const Speciality = React.lazy(() =>
  import("./views/pages/Speciality/AllSpeciality")
);
const Languages = React.lazy(() =>
  import("./views/pages/Language/AllLanguages")
);
const Consultations = React.lazy(() =>
  import("./views/pages/Consultation/AllConsultations")
);
const Appointments = React.lazy(() =>
  import("./views/pages/Appointments/AllAppointments")
);

const SettingsPage = React.lazy(() =>
  import("./views/pages/SettingPage/SettingPage")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/admin/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/admin/patient", exact: true, name: "Patients", component: Patient },
  {
    path: "/admin/patient/new-patient",
    exact: true,
    name: "Add Patient",
    component: AddPatient,
  },
  {
    path: "/admin/doctor/active-doctor",
    exact: true,
    name: "Active Doctors",
    component: ActiveDoctor,
  },
  {
    path: "/admin/doctor/pending-doctor",
    exact: true,
    name: "Pending Doctors",
    component: PendingDoctor,
  },
  {
    path: "/admin/doctor/pending-doctor/detail/:id",

    name: "Pending Doctors",
    component: DoctorDetails,
  },
  {
    path: "/admin/doctor/new-doctor",
    exact: true,
    name: "Add Doctor",
    component: AddDoctor,
  },
  {
    path: "/admin/insurance/form/pending",
    exact: true,
    name: "Pending Insurance",
    component: PendingInsurance,
  },
  {
    path: "/admin/insurance/form/active",
    exact: true,
    name: "Active Insurance",
    component: ActiveInsurance,
  },
  {
    path: "/admin/insurance/form/rejected",
    exact: true,
    name: "Rejected Insurance",
    component: RejectedInsurance,
  },
  {
    path: "/admin/insurance/form/detail",
    exact: true,
    name: "Insurance Detail",
    component: InsuranceDetail,
  },

  {
    path: "/admin/specialities",
    exact: true,
    name: "Speciality",
    component: Speciality,
  },
  {
    path: "/admin/languages",
    exact: true,
    name: "Languages",
    component: Languages,
  },
  {
    path: "/admin/consultations",
    exact: true,
    name: "Consultations",
    component: Consultations,
  },
  {
    path: "/admin/appointments",
    exact: true,
    name: "Appointments",
    component: Appointments,
  },
  { path: "/admin/setting", name: "Profile Setting", component: SettingsPage },
];

export default routes;
