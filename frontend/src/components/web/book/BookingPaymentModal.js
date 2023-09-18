import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import API from "../../../config/AxiosBase";
import { headers } from "../../../helpers/helpers";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Navigate } from "react-big-calendar";

export default function BookingPaymentModal({ onClose, data, onCallback }) {
  const stripe = useStripe();
  let navigate = useHistory();
  const elements = useElements();
  const { user } = useSelector((state) => state.auth);
  const options = {
    style: {
      base: {
        fontSize: "16px",
      },
      invalid: {
        color: "#9e2146",
        borderColor: "#9e2146",
      },
    },
  };
  console.log("prop data", data);
  const [loading, setLoading] = useState(false);
  //   on submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      headers();
      const res = await API.put("/docprofile/update-booking", {
        bookingId: data?.uniqueId,
        visitType: data?.visitType,
        doctorEmail: data?.doctorEmail,
      });
      console.log("1st api update booking  res", res);
      try {
        const resp = await API.post("/payment/process", {
          amount: data?.fee,
        });
        const clientSecret = resp.data.client_secret;

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user?.name,
            },
          },
        });
        console.log("result payment   ", result);
        if (result.error) {
          Swal.fire("Payment Failed", "", "error");
          await API.post("/docprofile/unpaid-booking", {
            bookingId: data?.uniqueId,
          });
        } else {
          // The payment is processed or not
          if (result.paymentIntent.status === "succeeded") {
            Swal.fire("Payment succeeded ");
            navigate("/");
            // onCallback();
          } else {
            Swal.fire("Payment Process Failed", "", "error");
          }
        }
      } catch (error) {
        Swal.fire("Can't Book your appointment right now", "", "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Payment Failed", "", "error");
    }

    if (!stripe || !elements) {
      return;
    }

    setLoading(false);
  };

  //   main return
  return (
    <div onClick={onClose} className="mainModal appointmentBooked">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="patientModalDiv"
      >
        <div className="w-100" onClick={onClose}>
          <img
            src="/images/close.png"
            className="float-right pointer"
            style={{ width: "15px" }}
          ></img>
        </div>
        <div className="flexCenter mb-3">
          <img src="/images/bookCalender.svg"></img>
          <div className="title ml-2 mb-0" style={{ fontSize: "22px" }}>
            Pay And Book
          </div>
        </div>

        <div className="text mb-3">
          you need to pay{" "}
          <span className="poppinsSb" style={{ fontSize: "15px" }}>
            ${data?.fee}
          </span>{" "}
          to book your appointment
        </div>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="card_num_field">Card Number</label>
            <CardNumberElement
              type="text"
              id="card_num_field"
              className="form-control"
              options={options}
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_exp_field">Card Expiry</label>
            <CardExpiryElement
              type="text"
              id="card_exp_field"
              className="form-control"
              options={options}
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_cvc_field">Card CVC</label>
            <CardCvcElement
              type="text"
              id="card_cvc_field"
              className="form-control"
              options={options}
            />
          </div>

          <button type="submit" className=" loginBtn signUpButton mt-3">
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>

        <div></div>
      </div>
    </div>
  );
}
