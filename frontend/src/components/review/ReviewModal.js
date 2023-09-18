import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { headers } from "../../helpers/helpers";
import API from "../../config/AxiosBase";
import history from "../../helpers/history";
import RatingComponent from "../common/rating";

export default function ReviewModal({ bookingId, onClose }) {
  const [bookingRating, setBookinhRating] = useState(0);
  const [waitTimeRating, setWaitTImeRating] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const submitReview = async () => {
    if (!message) {
      Swal.fire("Please write your review", "", "error");
      return;
    }
    const postData = {
      rating: bookingRating,
      waitRating: waitTimeRating,
      message,
      patientId: user?._id,
      bookingId,
    };
    setLoading(true);
    try {
      headers();
      const response = await API.post("/docprofile/new-review", postData);
      onClose();
    } catch (error) {
      Swal.fire({
        title: error?.response?.data?.message,
        icon: "error",
        timer: 2000,
      });
      onClose();
    }
    setLoading(false);
  };

  // main return
  return (
    <div className="mainModal">
      <div className="patientModalDiv">
        <div
          className="basicLandingTitle text-center"
          style={{ fontSize: "25px" }}
        >
          Your Review
        </div>
        <div className=" mt-4 mb-1" style={{ fontSize: "18px" }}>
          Your overall experince with doctor ?
        </div>
        <RatingComponent onChange={(val) => setBookinhRating(val)} />
        <div className=" mt-2 mb-1" style={{ fontSize: "18px" }}>
          waiting time for doctor ?
        </div>
        <RatingComponent onChange={(val) => setWaitTImeRating(val)} />

        <TextField
          multiline
          placeholder="share your experince in words..."
          rows={3}
          variant={"outlined"}
          style={{ backgroundColor: "transparent" }}
          value={message}
          className="textInput my-2"
          InputProps={{
            style: { height: "auto", backgroundColor: "#fff" },
          }}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={submitReview}
          className="loginBtn  signUpButton mt-5"
        >
          {loading ? " Submiting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
