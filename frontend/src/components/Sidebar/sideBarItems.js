import DashboardIcon from "../../assets/images/dashboard.js";
import AppointmentIcon from "../../assets/images/appointment";
import ChatIcon from "../../assets/images/chatbox";
import ConsulationIcon from "../../assets/images/consulation";
import PaymentIcon from "../../assets/images/Payment";

// side bar items
export const patientItems = [
  {
    component: DashboardIcon,
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    component: ConsulationIcon,
    name: "Consultation",
    link: "/dashboard/consulation",
  },
  {
    component: AppointmentIcon,
    name: "Appointments",
    link: "/dashboard/appointment",
  },
  {
    component: ChatIcon,
    name: "Messaging",
    link: "/dashboard/messages",
  },

  {
    component: PaymentIcon,
    name: "Payment History",
    link: "/dashboard/payment-history",
  },
];
export const doctorItems = [
  {
    component: DashboardIcon,
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    component: ConsulationIcon,
    name: "Consultation",
    link: "/dashboard/consulation",
  },
  {
    name: "Appointments",
    component: AppointmentIcon,
    link: "/dashboard/appointment",
  },
  {
    name: "Messaging",
    component: ChatIcon,
    link: "/dashboard/messages",
  },

  {
    component: PaymentIcon,
    name: "Payment History",
    link: "/dashboard/payment-history",
  },
  {
    component: AppointmentIcon,
    name: "Appointments Setting",
    link: "/dashboard/physical-setting",
  },
  {
    component: ConsulationIcon,
    name: "Consultation Setting",
    link: "/dashboard/video-setting",
  },
];
