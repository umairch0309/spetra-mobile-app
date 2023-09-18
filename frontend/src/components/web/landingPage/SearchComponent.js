import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useLocation } from "react-router-dom";
import GetAllSpeciality from "../../common/GetAllSpeciality";
import history from "../../../helpers/history";
import "../../../views/web/landingPage/landingPage.css";

export default function SearchComponent(props) {
  // style props
  const { mainStyle, inputStyle, link, callback } = props;

  // useState
  const [keywordOne, setKeywordOne] = useState("");
  const [keywordTwo, setKeywordTwo] = useState("");

  // options data
  const specialitiesOptions = GetAllSpeciality();

  // getting query from url
  const queryUrl = new URLSearchParams(useLocation().search);
  const queryOne = queryUrl.get("keywordOne");
  const queryTwo = queryUrl.get("keywordTwo");

  // setting keywords to input on mount
  useEffect(() => {
    if (
      (queryOne && !["null"].includes(queryOne)) ||
      (queryTwo && !["null"].includes(queryTwo))
    ) {
      // if (queryOne && specialitiesOptions.length > 0) {
      //   const filterValue = specialitiesOptions.filter(
      //     (el) => el._id == queryOne
      //   );
      //   console.log(filterValue, specialitiesOptions, queryOne);
      //   if (filterValue.length > 0) {
      //     console.log("settingValue", filterValue[0].name);
      //     setKeywordOne(filterValue[0].name);
      //   }
      // }
      setKeywordOne(queryOne);
      setKeywordTwo(queryTwo);
      callback(queryOne, queryTwo);
    }

    return () => {};
  }, [specialitiesOptions]);

  const onSearch = () => {
    callback(keywordOne?.name || "", keywordTwo);
    history.push({
      search: `?keywordOne=${
        keywordOne !== null ? keywordOne?.name : ""
      }&&keywordTwo=${keywordTwo}`,
    });
  };

  // main return
  return (
    <div className="searchDiv">
      {/* mobile search */}
      <div className="mainInputDiv mt-0 d-block d-md-none" style={inputStyle}>
        <div className="inputDiv mb-0">
          {specialitiesOptions.length > 0 && (
            <Autocomplete
              freeSolo
              filterSelectedOptions
              clearOnBlur
              onChange={(e, v) => {
                v ? setKeywordOne(v) : setKeywordOne({});
              }}
              value={keywordOne}
              options={specialitiesOptions}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  variant="standard"
                  className="inputM"
                  placeholder="Conditions, Procedures, Doctors"
                  InputProps={{
                    ...params.InputProps,

                    disableUnderline: true,
                    classes: { input: "searchLabel" },

                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          className="iconM"
                          alt="icon"
                          src="/images/searchIcon.svg"
                        ></img>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          )}
        </div>
        <div className="inputDiv mb-0 pt-1">
          <TextField
            margin="normal"
            variant="standard"
            className="inputM"
            placeholder="City, State or Zip Code"
            onChange={(e) => setKeywordTwo(e.target.value)}
            value={keywordTwo}
            InputProps={{
              type: "search",
              disableUnderline: true,
              classes: { input: "searchLabel" },

              startAdornment: (
                <InputAdornment position="start">
                  <img
                    className="iconM"
                    alt="icon"
                    src="/images/markerIcon.svg"
                  ></img>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <button
          onClick={() =>
            link
              ? history.push(
                  `/search?keywordOne=${
                    keywordOne?.name || ""
                  }&&keywordTwo=${keywordTwo}`
                )
              : onSearch()
          }
          className="searchBtnM"
        >
          Search
        </button>
      </div>

      {/* desktop search */}
      <div className="mainSearchDiv  d-none d-md-flex" style={mainStyle}>
        <div className="searchSec" style={inputStyle}>
          <div className="inputDivD">
            {specialitiesOptions.length > 0 && (
              <Autocomplete
                freeSolo
                filterSelectedOptions
                onChange={(e, v) => {
                  v ? setKeywordOne(v) : setKeywordOne({});
                }}
                value={keywordOne}
                options={specialitiesOptions}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    variant="standard"
                    className="input input1"
                    placeholder="Conditions, Procedures, Doctors"
                    InputProps={{
                      ...params.InputProps,

                      disableUnderline: true,
                      classes: { input: "searchLabel" },

                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            className="icon"
                            alt="icon"
                            src="/images/searchIcon.svg"
                          ></img>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            )}
          </div>

          <div className="inputDivD">
            <div className="divider"></div>
            <TextField
              margin="normal"
              variant="standard"
              className="input mb-2 pb-1"
              placeholder="City, State or Zip Code"
              onChange={(e) => setKeywordTwo(e.target.value)}
              value={keywordTwo}
              InputProps={{
                disableUnderline: true,
                classes: { input: "searchLabel" },

                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      className="icon"
                      alt="icon"
                      src="/images/markerIcon.svg"
                    ></img>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>

        <button
          onClick={() =>
            link
              ? history.push(
                  `/search?keywordOne=${
                    keywordOne?.name || ""
                  }&&keywordTwo=${keywordTwo}`
                )
              : onSearch()
          }
          style={{ height: "100" }}
          className="searchBtn"
        >
          Search
        </button>
      </div>
    </div>
  );
}
