import { format as formatDate } from "date-fns";
import parseISO from "date-fns/parseISO";
import React, { useState } from "react";
import BookingCalender from "../profile/BookingCalender";

export default function EditAppointment({ defaultValue, callback, slots }) {
  const [activeClander, setactiveClander] = useState(false);
  const [selectedDate, setSelectedDate] = useState(defaultValue);

  return (
    <div className="editAppointment">
      <div className="inputDiv">
        <label className="label">Appointment Time</label>
        {activeClander ? (
          <BookingCalender
            selected={defaultValue}
            onSelect={(v) => {
              callback(v);
              setactiveClander(false);
            }}
            hideHeader
            slots={slots}
          />
        ) : (
          <div style={{ position: "relative" }}>
            <input
              className="textInput"
              defaultValue={formatDate(parseISO(defaultValue), "PPpp")}
              disabled
            ></input>
            <div
              onClick={() => setactiveClander(true)}
              className="editBtn textBlue"
            >
              edit
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
