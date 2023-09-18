import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Swal from "sweetalert2";
import useSlotUpdate from "../../hooks/mutation/useSlotUpdate";
import { updateSlot } from "../../services/panel";

const localizer = momentLocalizer(moment);

const AppointmentCalender = ({ events, appointmentType }) => {
  // evnet state

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0);

  const updateEventFun = useSlotUpdate("profile", updateSlot);
  // on slot select
  const onSelectSlot = (slot) => {
    if (!moment().isBefore(slot.start)) {
      return Swal.fire({
        icon: "error",
        text: "Can not create Time slots for previous time/day",
      });
    }

    const startTime = slot.start;
    const endTime = slot.end;
    const action = slot.action;
    const newEvent = {
      title: "slot",
      start: startTime,
      end: endTime,
    };
    action === "click" &&
      updateEventFun.mutate({
        slots: [...events, newEvent],
        type: appointmentType,
      });
  };

  // on select event
  const onSelectEvent = (event) => {
    const isReserved = event?.isReserved;
    const eventDetail = event?.eventDetail;
    if (isReserved) {
      Swal.fire({
        title: "Appointment Detail",
        text: `Appointment with ${eventDetail?.name} at this time slot 
         Contact no : ${eventDetail?.phoneNo}`,
      });
    } else {
      Swal.fire({
        title: "Delete time slot?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const filterArr = events.filter((el) => el._id !== event._id);

          updateEventFun.mutate({ slots: filterArr, type: appointmentType });
          Swal.fire("Deleted!", "", "success");
        }
      });
    }
  };

  // onNavigate
  const onNavigate = (date, view, action) => {};
  //   main return
  return (
    <Calendar
      localizer={localizer}
      events={events}
      longPressThreshold={20}
      startAccessor={(e) => new Date(e.start)}
      endAccessor={(e) => new Date(e.end)}
      defaultDate={currentDate}
      timeslots={1}
      step={60}
      onNavigate={onNavigate}
      //   min={currentDate}
      //   max={addWeeks(currentDate, 2)}
      eventPropGetter={(event, start, end, isSelected) => {
        const isReserved = event.isReserved;
        return { className: isReserved ? "eventBooked" : "", style: {} };
      }}
      onSelectSlot={onSelectSlot}
      views={["week", "day"]}
      defaultView={"week"}
      selectable={true}
      onSelectEvent={onSelectEvent}
    />
  );
};

// AppointmentCalender.propTypes = propTypes;

export default AppointmentCalender;
