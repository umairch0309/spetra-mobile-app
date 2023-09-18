import React, { useState } from "react";
import { ClickAwayListener } from "@material-ui/core";
export default function CustomSelect(props) {
  const [active, setActive] = useState(false);
  const value = props.value;
  const { placeholderText, options, className, width, disable, callback } =
    props;
  const handleActive = () => {
    if (!disable) setActive(!active);
  };
  const handleSelected = (value) => {
    if (!disable) callback(value);
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          style={{ width: width }}
          onClick={handleActive}
          className={`customSelect ${className}`}
        >
          <div className="flex">
            <span>{!value ? placeholderText : value.text}</span>
            <img
              src={active ? "/images/arrowUp.png" : "/images/arrowDown.png"}
              alt="arrowDown"
            ></img>
          </div>
        </div>
        {active && (
          <ClickAwayListener onClickAway={() => setActive(false)}>
            <div onClick={handleActive} className="dropDown">
              {options.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleSelected(item)}
                    className="item"
                  >
                    {item.text}
                  </div>
                );
              })}
            </div>
          </ClickAwayListener>
        )}
      </div>
    </>
  );
}
