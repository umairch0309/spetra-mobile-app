import { addDays } from "date-fns";
import React, { useState } from "react";
import { ClickAwayListener } from "@material-ui/core";
import { useEffect } from "react";
export default function SearchFilter(props) {
  const { filterCallback } = props;
  // states
  const [availability, setAvailability] = useState(null);
  const [provideVideo, setProvideVideo] = useState(null);

  // options
  const availabilityOptions = [
    { text: "Today", value: new Date() },
    { text: "Next 3 Days", value: addDays(new Date(), 3) },
  ];

  // clear filters
  const clearFilters = () => {
    setAvailability(null);
    setProvideVideo(null);
  };

  // onCallback
  useEffect(() => {
    filterCallback(availability?.value?.toISOString(), provideVideo);
  }, [availability, provideVideo]);

  // main return
  return (
    <div className="searchFilter">
      <div className="d-flex">
        <div
          onClick={() => setProvideVideo((prev) => !prev)}
          className={provideVideo ? "filterDiv filterDivActive" : "filterDiv"}
        >
          Video consultion
        </div>
        <FilterDiv
          placeholder="Availability"
          options={availabilityOptions}
          active={availability}
          setActive={setAvailability}
        />
      </div>
      <div onClick={clearFilters} className="filterDiv mt-3 mt-sm-0">
        Clear Filters
      </div>
    </div>
  );
}

const FilterDiv = ({ placeholder, options, active, setActive }) => {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => setShow(!show)}
        className={active !== null ? "filterDiv filterDivActive" : "filterDiv"}
      >
        {active?.text || placeholder}
      </div>

      {show && options && (
        <ClickAwayListener onClickAway={() => setShow(false)}>
          <div className="dropDown" style={{ minWidth: "fit-content" }}>
            {options?.map((item) => {
              return (
                <div
                  className="item"
                  style={{ whiteSpace: "nowrap", fontSize: "12px" }}
                  onClick={() => {
                    setActive(item);
                    setShow(false);
                  }}
                >
                  {item.text}
                </div>
              );
            })}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};
