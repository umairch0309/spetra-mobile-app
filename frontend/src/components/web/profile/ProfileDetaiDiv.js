import React from "react";
import { format as formatDate, parseISO } from "date-fns";
import { docProfile } from "../../../assets";
import { profileImageURL } from "../../../helpers/helpers";
import RatingComponent from "../../common/rating";

export default function ProfileDetaiDiv({ data, reviewsData }) {
  const profileImage =
    data?.url === "None" ? null : profileImageURL + data?.url;

  const reviews = reviewsData?.length > 0 ? reviewsData.slice(0, 2) : [];

  const readAllReviews = () => {
    const htmlElement = document.getElementById("patientReviewDiv");
    htmlElement.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // main return
  return (
    <>
      <div className="col-md-8">
        <div className="header">
          <img
            src={profileImage || docProfile}
            className="profile"
            alt="profile"
          ></img>

          <div className="nameSec ml-3">
            <div className="name">{`Dr. ${data?.name}`}</div>
            <div className="subTitle">
              {`${data?.speciality?.name}, ${data?.practices?.map(
                (item) => item
              )}`}
            </div>
            <div className="placeText">{data?.location?.city}</div>
            {/* desktop tabs */}
            <div className="tabSec d-none d-md-flex">
              <div className="tab">
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
                <div className="tab">
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
          </div>
        </div>
        {/* mobile tabs */}
        <div className="tabSec d-flex d-md-none">
          <div className="tab">
            <img className="icon" src="/images/inPerson.png"></img>

            <span>
              In-person{" "}
              <span className="poppinsSb">
                {data?.physicalPrice &&
                  `: $${
                    Math.round(Number.parseFloat(data?.physicalPrice) * 100) /
                    100
                  }`}
              </span>
            </span>
          </div>
          {data?.isVideo && (
            <div className="tab">
              <img className="icon" src="/images/videoChat.png"></img>
              <span>
                Video{" "}
                <span className="poppinsSb">
                  {data?.videoPrice &&
                    `: $${
                      Math.round(Number.parseFloat(data?.videoPrice) * 100) /
                      100
                    }`}
                </span>
              </span>
            </div>
          )}
        </div>
        {/* mobile tabs end */}
        <div className="textBg mt-2 line-clamp">{data?.aboutMe}</div>
        <hr className="divider"></hr>
        <div className="titleBg d-inline d-md-none">
          What patients are saying
        </div>
        <div className="reviewSeC mt-1 pt-3 d-flex d-md-none">
          <div className="overAll">
            <div className="text title">Overall rating</div>
            <div className="ratingNumber">{Math.ceil(data?.rating)}.00</div>
            <RatingComponent readOnly defaultValue={Math.ceil(data?.rating)} />
            <div className="text textDarkBlue reviewText mt-2">
              {data?.noOfReview} reviews
            </div>
          </div>
          <div className="reviewFlexM">
            <div>
              <div className="text title">Average wait time</div>
              <div className="d-flex">
                <div className="text mr-1">
                  {Math.ceil(data?.waitingRating)}.00
                </div>
                <RatingComponent
                  readOnly
                  defaultValue={Math.ceil(data?.waitingRating)}
                />
              </div>
            </div>
            <div className="">
              <div className="text title">Bedside manner</div>
              <div className="d-flex">
                <div className="text mr-1">5.00</div>
                <RatingComponent readOnly defaultValue={5} />
              </div>
            </div>
          </div>
        </div>
        <div className="detailTabSec">
          <div className="detailTab">
            <img className="icon mt-1" src="/images/done.svg"></img>
            <div className="ml-3">
              <div className="title">Highly recommended</div>
              <div className="text">
                100% of patients gave this doctor 5 stars
              </div>
            </div>
          </div>
          <div className="detailTab">
            <img className="icon mt-1" src="/images/clock.svg"></img>
            <div className="ml-3">
              <div className="title">Excellent wait time</div>
              <div className="text">
                92% of patients waited less than 30 minutes
              </div>
            </div>
          </div>
          <div className="detailTab">
            <img className="icon mt-1" src="/images/lamp.svg"></img>
            <div className="ml-3">
              <div className="title">New patient appointments</div>
              <div className="text">
                Appointments available for new patients on Zocdoc
              </div>
            </div>
          </div>
        </div>
        <div className="reviewSeC ">
          <div className="overAll d-none d-md-block">
            <div className="text title">Overall rating</div>
            <div className="ratingNumber">{Math.ceil(data?.rating)}.00</div>
            <RatingComponent readOnly defaultValue={Math.ceil(data?.rating)} />
            <div className="text textDarkBlue reviewText mt-2">
              {data?.noOfReview} reviews
            </div>
          </div>
          <div className="recentReviews">
            <div className="text title">Recent reviews</div>
            {reviews?.map((item) => {
              return (
                <div>
                  <div className="text desc">{item?.message}</div>
                  <div className="reviewDateDiv">
                    <div className="reviewText">
                      <span>{item.patient.name}</span>
                      <span className="ml-2">
                        {formatDate(parseISO(item.createdAt), "P")}
                      </span>
                    </div>
                    {item.visitType === "video" && (
                      <span className="flexCenter ml-2">
                        <img
                          className="videoIcon"
                          src="/images/videoChat.png"
                        ></img>
                        <span>Video visit</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {reviews?.length > 0 && (
              <button onClick={readAllReviews} className="primaryBtn seeAllBtn">
                Read All Reviews
              </button>
            )}
            {reviews?.length === 0 && (
              <div className="text desc">
                {" "}
                No , reviews given by patient yet{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
