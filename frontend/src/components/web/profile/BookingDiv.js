import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import CustomSelect from "../../common/CustomSelect";
import history from "../../../helpers/history";
import BookingCalender from "./BookingCalender";

function BookingDiv({ data }) {
  //  options
  const reasonData = [
    { value: "inlness", text: "illness" },
    { value: "consulation", text: "Genrel Consultation" },
  ];

  const urlQuery = new URLSearchParams(useLocation().search);
  const queryvisitType = urlQuery.get("visitType");
  // selected date
  const [selectedDate, setselectedDate] = useState(null);
  const [visitType, setVisitType] = useState(queryvisitType || "physical");
  const [seenBefore, setSeenBefore] = useState("false");
  const [reasonOfvisit, setReasonOfvisit] = useState({
    value: "illness",
    text: "illness",
  });

  const handleContinueBooking = () => {
    if (!selectedDate) {
      Swal.fire({
        title: "Please select appointment time",
        icon: "error",
        timer: "2000",
        showConfirmButton: false,
      });
      return;
    }

    const postData = {
      bookingDate: { startDate: selectedDate.start },
      visitType,
      seenBefore,
      reasonOfvisit,
      slot: selectedDate,
    };
    history.push({
      pathname: `/booking/review-booking/${data?._id}`,
      state: { ...postData, ...data },
    });
  };

  // main return
  return (
    <div>
      <div className="bookingDiv">
        <div className="secTitle">Book an appointment for free</div>

        <div className="inputDiv">
          <lable className="lable">What's the reason for your visit?</lable>
          <CustomSelect
            options={reasonData}
            value={reasonOfvisit}
            callback={(v) => setReasonOfvisit(v)}
          />
        </div>

        <RadioGroup
          row
          aria-label="seenBefore"
          name="seenBefore"
          className="inputDiv"
          value={seenBefore}
          onChange={(e, v) => setSeenBefore(v)}
        >
          <lable className="lable">
            Has the patient seen this doctor before?
          </lable>
          <div className="flexCenter w-100">
            <FormControlLabel
              value={"false"}
              className="radioDiv"
              control={<Radio color="primary" />}
              label="No"
              labelPlacement="end"
            />
            <FormControlLabel
              value={"true"}
              className="radioDiv"
              control={<Radio color="primary" />}
              label="Yes"
              labelPlacement="end"
            />
          </div>
        </RadioGroup>
        {data?.isVideo && (
          <RadioGroup
            row
            aria-label="appointment Type"
            name="position"
            className="inputDiv "
            value={visitType}
            onChange={(e, v) => setVisitType(v)}
          >
            <lable className="lable">Choose the type of appointment</lable>
            <div className="flexCenter w-100">
              <FormControlLabel
                value="physical"
                className="radioDiv"
                control={<Radio color="primary" />}
                label="In person"
                labelPlacement="end"
              />
              <FormControlLabel
                value="video"
                className="radioDiv"
                control={<Radio color="primary" />}
                label="Video visit"
                labelPlacement="end"
              />
            </div>
          </RadioGroup>
        )}

        <div className="inputDiv">
          <lable className="lable">Select an available time</lable>
          <BookingCalender
            slots={
              visitType === "physical"
                ? data?.physicalTimeSlot
                : data?.videoTimeSlot
            }
            address={data?.location?.address}
            onSelect={(slot) => setselectedDate(slot)}
            isVideo={visitType}
          />
        </div>

        <button onClick={handleContinueBooking} className="bookingBtn">
          Continue Booking
        </button>
      </div>
    </div>
  );
}
export default BookingDiv;
