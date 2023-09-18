import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { defalutProfile } from "../../../assets/index";
import ReviewCard from "./reviewCard";
import { getImageUrl } from "../../../helpers/helpers";

export default function PatientReviewSec({ data }) {
  const [activeReview, setActiveReview] = useState(
    data?.length > 0 ? data[0]._id : null
  );
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getVisibleReviews();
  }, [count]);

  const getVisibleReviews = () => {
    let visibleArray = [];
    for (let i = count; i < count + 3; i++) {
      if (i > data?.length - 1) break;
      visibleArray.push(data[i]);
    }
    if (visibleArray.length > 0) {
      setVisibleReviews(visibleArray);
      setActiveReview(visibleArray[0]._id);
    }
  };

  // move right
  const moveRight = () => {
    if (count >= data?.length - 1) return;
    setCount(count + 3);
  };
  // move left
  const moveLeft = () => {
    if (count === 0) return;
    setCount(count - 3);
  };

  // main return
  return (
    <>
      <div className="patientReviewDiv" id="patientReviewDiv">
        <div className="flexCenter header">
          <div className="secTitle">Patient reviews</div>
          <div className="flexCenter">
            <div onClick={moveLeft} className="arrowIcon">
              <img src="/images/arrowLeft1.png" alt="arrow"></img>
            </div>
            <div onClick={moveRight} className="arrowIcon">
              <img src="/images/arrowRight1.png" alt="arrow"></img>
            </div>
          </div>
        </div>
        <div className="patientFlex">
          <div className="userSec">
            {visibleReviews.length > 0 &&
              visibleReviews?.map((item) => {
                return (
                  <div
                    key={item._id}
                    className={
                      activeReview === item._id
                        ? "userItem userItemActive"
                        : "userItem"
                    }
                    onClick={() => setActiveReview(item._id)}
                  >
                    <img
                      src={getImageUrl(item.patient?.image?.url)}
                      className="profile"
                    ></img>
                    <div className="ml-0 ml-md-4">
                      <div className="flexCenter">
                        <div className="name mr-2">{item.patient.name}</div>
                      </div>
                      <div className="dateText">
                        {format(parseISO(item.createdAt), "P")}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="reviewSec mt-4 mt-md-0">
            {visibleReviews.length > 0 && (
              <ReviewCard data={visibleReviews} activeReview={activeReview} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
