import React from "react";
import history from "../../../helpers/history";

export default function ChooseDoctor() {
  return (
    <div className=" basicLandingRow chooseDoctor ">
      <div className="mainFlex">
        <div className="doctorCard" style={{ borderColor: "#48afc9" }}>
          <img
            src="/images/cloudDoctor.svg"
            alt="cloudDoctor"
            className="docImg"
          ></img>
          <div className="content">
            <div className="title">Walk-In Visits</div>
            <div className="text">
              Schedule your walk-in visit with top doctors in your area{" "}
              {/* <span className="poppinsSb">Free</span> */}
            </div>
            <button
              onClick={() => history.push("/search")}
              className="btnBook blueBg mt-4 mt-sm-3"
            >
              Book Now
            </button>
          </div>
        </div>
        <div className="doctorCard mr-0">
          <img
            src="/images/onlineDoc.svg"
            alt="CloudDoctor"
            className="docImg"
          ></img>
          <div className="content">
            <div className="title">Online Appointments</div>
            <div className="text">
              Schedule your online appointment with a medical professional
            </div>
            <button
              onClick={() => history.push("/search")}
              className="btnBook greenBg"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
