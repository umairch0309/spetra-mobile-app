import React from "react";
import { Link } from "react-router-dom";
export default function FiveStarDoctor() {
  return (
    <div className="lightBg">
      <div className="basicLandingRow fiveStarPage ">
        <div className="mainFlex">
          <div className="contentSec">
            <div className="basicLandingTitle">Are you a five-star doctor?</div>
            <div className="titleSub">
              Sign up now and expand your patient network effortlessly
            </div>
            <div className="point">
              <div className="pointCircle"></div>Get more patients at the
              comfort of your own office.
            </div>
            <div className="point">
              <div className="pointCircle"></div>Organize yourself by storing
              all your records in one convenient platform.
            </div>
            <div className="point">
              <div className="pointCircle"></div>Make up your own schedule
            </div>
            <div className="point">
              <div className="pointCircle"></div>Grow your online presence
            </div>

            <img
              src="/images/fiveStar.svg"
              className="img d-inline d-md-none mt-3"
              alt="fiveStar"
            ></img>

            <div className="mobileCenter">
              <Link to="/doctor-form">
                <button className="primaryBtn btnJoin">Join Now</button>
              </Link>
            </div>
          </div>
          <div className="imgSec">
            <img
              src="/images/fiveStar.svg"
              className="img d-none d-md-inline"
              alt="fiveStar"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
