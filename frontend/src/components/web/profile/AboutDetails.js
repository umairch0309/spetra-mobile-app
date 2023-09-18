import React from "react";
import { GoogleMapWithMarker } from "../../../components/map/GoogleMapWithMarker";
export default function AboutDetails({ data }) {
  return (
    <div className="aboutSec w-100">
      <div className="contentSec">
        <img src="/images/aboutContent.svg"></img>
        <div className="title">About Dr. {data?.name}</div>
        <div className="text">{data?.aboutMe}</div>
      </div>

      <div className="contentSec">
        <div className="title">Clinic location</div>
        {data?.isVideo && (
          <div className="offerBg">
            <img src="/images/videoIconAbout.svg"></img>
            <span>
              Dr. {data?.name}, MD also offers online video visits for patients
            </span>
          </div>
        )}
        <div>
          {data?.location != null && (
            <GoogleMapWithMarker
              isMarkerShown
              markerLat={data?.location?.lat}
              markerLng={data?.location?.lng}
              zoom={15}
              containerHeight={`300px`}
            />
          )}
        </div>
        <div className="title mb-1 mt-3" style={{ fontSize: "12px" }}>
          {data?.location?.address}
        </div>
        {/* <div className="text" style={{ fontSize: "12px" }}>
          14211 FM 2920 Rd Tomball, TX 77377
        </div> */}
      </div>
    </div>
  );
}
