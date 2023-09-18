import React from "react";
import RatingComponent from "../../common/rating";

export default function reviewCard({ data, activeReview }) {
  const filterData = data.filter((el) => el._id == activeReview);

  const { rating, visitType, message } = filterData[0];
  return (
    <div className="reviewCard">
      {/* <div className="title mb-3 mt-2">{title}</div> */}
      <RatingComponent readOnly defaultValue={rating} />
      <div className="reviewText mb-3">{message}</div>

      {visitType === "video" && (
        <span className="flesCenter  reviewDetailText">
          <img
            src="/images/videoChat.png"
            style={{ width: "30px", marginRight: "10px" }}
          ></img>
          Video Visit
        </span>
      )}
    </div>
  );
}
