import React from "react";
import { Link } from "react-router-dom";
import { docProfile } from "../../../assets";
import history from "../../../helpers/history";
import { isSameDay, parseISO } from "date-fns";
export default function SearchDoctorCard({ data }) {
  const profileImage = data?.url === "None" ? null : data?.url;

  const isAvailable = isAvailableToday(data);
  return (
    <>
      <div className="searchDoctorCard">
        <div className=" header">
          <div className="flexCenter">
            <Link to={`/profile/${data._id}`}>
              <img
                src={profileImage || docProfile}
                className="profile  mr-md-4"
              ></img>
            </Link>
            <div className="">
              <Link to={`/profile/${data._id}`}>
                <div className="name">Dr.{data?.name}</div>
              </Link>
              <div className="text">{data?.specialities?.name}</div>
              <div className="text">{data?.education?.map((item) => item)}</div>
              <div className="tabSec flexCenter">
                <div className="tab" style={{ padding: "5px 10px" }}>
                  <img className="icon" src="/images/inPerson.png"></img>

                  <span>
                    In-person visits{" "}
                    <span className="poppinsSb">
                      {data?.physicalPrice &&
                        `: $${
                          Math.round(
                            Number.parseFloat(data?.physicalPrice) * 100
                          ) / 100
                        }`}
                    </span>
                  </span>
                </div>
                {data?.isVideo && (
                  <div className="tab" style={{ padding: "5px 10px" }}>
                    <img className="icon" src="/images/videoChat.png"></img>
                    <span>
                      Video visits{" "}
                      <span className="poppinsSb">
                        {data?.videoPrice &&
                          `: $${
                            Math.round(
                              Number.parseFloat(data?.videoPrice) * 100
                            ) / 100
                          }`}
                      </span>
                    </span>
                  </div>
                )}
              </div>

              <div className="flexCenter skillFlex">
                <div className="skill">
                  <img src="/images/clock.svg" className="icon"></img>
                  <div>
                    <div className="title">Under 15 Min </div>
                    <div className="text">Wait Time</div>
                  </div>
                </div>
                <div className="skill">
                  <img src="/images/lamp.svg" className="icon"></img>
                  <div>
                    <div className="title">{data.experince} Years </div>
                    <div className="text">Experience</div>
                  </div>
                </div>
                <div className="skill">
                  <img src="/images/done.svg" className="icon"></img>
                  <div>
                    <div className="title"> 100%</div>
                    <div style={{ whiteSpace: "nowrap" }} className="text">
                      Satisfied Patients
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btnSec">
            {data?.isVideo && (
              <button
                onClick={() =>
                  history.push(`/profile/${data._id}?visitType=video`)
                }
                className="primaryBtn btnVideo"
              >
                Video Consultation
              </button>
            )}
            <button
              onClick={() => history.push(`/profile/${data._id}`)}
              className="primaryBtn btnBook mt-3"
            >
              Book Appointment
            </button>
          </div>
        </div>
        <div className="textBg">{data.aboutMe}</div>
        {(isAvailable || data?.location?.address) && (
          <div className="flexCenter">
            <div className="presentDiv">
              {data?.location?.address && (
                <div className="centerFlex  mb-3">
                  <img src="/images/placeholder.svg" className="icon"></img>
                  <span className="text mb-0 ml-2">
                    {data.location.address}
                  </span>
                </div>
              )}
              {isAvailable && (
                <div className="centerDiv">
                  <div className="flexCenter ">
                    <div className="greenCircle"></div>
                    <span className="availableText">Available Today</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const isAvailableToday = (data) => {
  const physicalTimeSlot = data?.physicalTimeSlot;
  const videoTimeSlot = data?.videoTimeSlot;

  // checking if the user have today physical time slot
  const isPhycialAvailable =
    physicalTimeSlot.filter((el) => {
      if (isSameDay(parseISO(el.start), new Date())) return el;
    }).length > 0;

  return isPhycialAvailable;
};
