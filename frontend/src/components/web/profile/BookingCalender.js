import {
  format as formatDate,
  addDays,
  isSameDay,
  subDays,
  parseISO,
  isBefore,
  compareDesc,
  compareAsc,
} from "date-fns";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function BookingCalender(props) {
  const [currentDate, setcurrentDate] = useState(new Date());
  const [controllerDate, setControllerDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(props.selected || null);
  const slots = props?.slots?.sort((dateOne, dateTwo) =>
    compareAsc(parseISO(dateOne.start), parseISO(dateTwo.start))
  );

  // next days
  const NextDays = () => {
    if (isSameDay(controllerDate, addDays(currentDate, 8))) return;
    setControllerDate(addDays(controllerDate, 4));
  };
  // previous days
  const PreviousDays = () => {
    if (isSameDay(currentDate, controllerDate)) return;
    setControllerDate(subDays(controllerDate, 4));
  };

  //   render Days
  const renderDays = () => {
    var CloneDate = controllerDate;

    const dayArr = [1, 2, 3, 4];
    return dayArr.map((item) => {
      if (item !== 1) CloneDate = addDays(CloneDate, 1);
      var monthName = formatDate(CloneDate, "LLL");
      var dayName = formatDate(CloneDate, "ccc");
      var date = formatDate(CloneDate, "d");
      return (
        <div key={item} className="itemDiv">
          <div className="dayText" style={{ fontFamily: "poppins" }}>
            {dayName}
          </div>
          <div className="dayText">
            {monthName} {date}
          </div>
        </div>
      );
    });
  };

  //  render time slots
  const renderTimeSlots = (timeSlot) => {
    const isReserve = timeSlot.isReserved;
    return (
      <div
        onClick={() => {
          if (isReserve) return;
          if (isBefore(parseISO(timeSlot.start), new Date())) {
            Swal.fire({
              timer: "2000",
              title: "Slot Time is over",
              icon: "error",
            });
            return;
          }
          setSelectedDate(timeSlot.start);
          props.onSelect(timeSlot);
        }}
        className={
          isReserve
            ? "slots slotsDisable"
            : selectedDate === timeSlot.start
            ? "slots slotsActive"
            : "slots"
        }
      >
        {formatDate(parseISO(timeSlot.start), "p")}
      </div>
    );
  };
  const renderSlots = () => {
    var cloneDate = controllerDate;
    const dayArr = [1, 2, 3, 4];
    return dayArr.map((item, index) => {
      if (index !== 0) cloneDate = addDays(cloneDate, 1);
      return (
        <div className="slotCol">
          {slots?.map((slot) => {
            if (isSameDay(parseISO(slot?.start), cloneDate)) {
              return renderTimeSlots(slot);
            }
            return;
          })}
        </div>
      );
    });
  };

  //   main return
  return (
    <div>
      <div className="bookingCalenderDiv">
        {props.hideHeader || (
          <div className="header">
            {props.isVideo === "video" || <span> {props.address}</span>}
          </div>
        )}
        <div className="calenderController">
          <img
            onClick={PreviousDays}
            src="/images/arrowLeft.png"
            className={
              isSameDay(controllerDate, currentDate)
                ? "arrowImg opacityHalf"
                : "arrowImg"
            }
          ></img>
          {renderDays()}
          <img
            onClick={NextDays}
            src="/images/arrowRight.png"
            className={
              isSameDay(controllerDate, addDays(currentDate, 8))
                ? "arrowImg opacityHalf"
                : "arrowImg"
            }
          ></img>
        </div>
        <div className="innerCalender">
          <div style={{ width: "20px" }}></div>
          {renderSlots()} <div style={{ width: "20px" }}></div>
        </div>
      </div>
    </div>
  );
}
