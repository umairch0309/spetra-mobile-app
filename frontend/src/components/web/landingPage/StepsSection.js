import React from "react";
import history from "../../../helpers/history";

export default function StepsSection() {
  return (
    <div className="lightBg">
      <div className="basicLandingRow stepsSec">
        <div
          className="basicLandingTitle"
          style={{
            paddingTop: "50px",
            paddingBottom: "50px",
            textAlign: "center",
          }}
        >
          My Cloud Doc platform helps pair enterprising doctors with the
          patients looking for their singular qualifications and offerings.
        </div>
        <div className="stepFlex">
          <div className="contentSec">
            <div className="countCircle">1</div>
            <div className="title">Browse doctors who take your insurance</div>
            <div className="text">
              We will help you connect with doctors that best fit your insurance
              without sacrificing quality medical care.
            </div>
            <button
              className="primaryBtn seeBtn  "
              onClick={() => history.push("/search")}
            >
              Browse Now
            </button>
          </div>
          <div className="imgSec">
            <img src="/images/step1.svg" className="img" alt="step"></img>
          </div>
        </div>
        <div className="centerFlex d-none d-md-flex">
          <img className="lineImg" alt="line" src="/images/line1.png"></img>
        </div>
        <div className="stepFlex flexReverse">
          <div className="imgSec">
            <img src="/images/step2.svg" className="img" alt="step"></img>
          </div>
          <div className="contentSec">
            <div className="countCircle">2</div>
            <div className="title">Read Reviews from Users</div>
            <div className="text">
              We know how important it is to find good medical care. Finding a
              good doctor is equally as important. Browse through our directory
              of doctors and find the one that best fits your needs
            </div>
            <button
              className="primaryBtn seeBtn "
              onClick={() => history.push("/search")}
            >
              See Providers
            </button>
          </div>
        </div>
        <div className="centerFlex d-none d-md-flex">
          <img className="lineImg" alt="line" src="/images/line2.png"></img>
        </div>
        <div className="stepFlex">
          <div className="contentSec">
            <div className="countCircle">3</div>
            <div className="title">Book An Appointment Online</div>
            <div className="text">
              Once you’re done browsing through doctors that are in your network
              and have found a doctor with great reviews make sure to book your
              appointment. It’s that easy!
            </div>
            <button
              className="primaryBtn seeBtn "
              onClick={() => history.push("/search")}
            >
              Book Now
            </button>
          </div>
          <div className="imgSec">
            <img src="/images/step3.svg" className="img" alt="step"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
