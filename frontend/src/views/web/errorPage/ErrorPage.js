import React from "react";
import AppWrapper from "../../../components/web/wrapper/AppWrapper";
import history from "../../../helpers/history";

export default function ErrorPage() {
  return (
    <AppWrapper>
      <div className="headerPadding"> </div>
      <div className="basicRow">
        <div
          className="centerFlex"
          style={{ height: "80vh", flexDirection: "column" }}
        >
          <div className="text-center" style={{ width: "335px" }}>
            <div className="centerFlex">
              <img
                style={{ width: "200px" }}
                src="/images/errorLogo.svg"
                alt="errorLogo"
              ></img>
            </div>
            <div style={{ font: "18px poppinsSb", margin: "15px 0" }}>
              Oops, something went wrong
            </div>
            <div style={{ font: "14px poppinsMd", color: "#878787" }}>
              404 Error. Page not found.
              <span
                onClick={() => history.push("/")}
                className="textBlue poppinsSb pointer"
              >
                {" "}
                Click here
              </span>{" "}
              to return to the homepage .
            </div>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
}
