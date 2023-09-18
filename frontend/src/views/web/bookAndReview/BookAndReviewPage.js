import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { format as formatDate, parseISO } from "date-fns";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import AddPhoneNumber from "../../../components/web/book/AddPhoneNumber";
import EditAppointment from "../../../components/web/book/EditAppointment";
import WhoSeeingDoctor from "../../../components/web/book/WhoSeeingDoctor";
import AppointmentBookedModal from "../../../components/web/book/AppointmentBookedModal";
import BookingPaymentModal from "../../../components/web/book/BookingPaymentModal";
import AppWrapper from "../../../components/web/wrapper/AppWrapper";
import CustomSelect from "../../../components/common/CustomSelect";
import { InputDiv } from "../login/login";
import { docProfile } from "../../../assets";
import { useNewBooking } from "../../../hooks/mutation/useNewBooking";
import { newBooking, getPatProfile } from "../../../services/web";
import history from "../../../helpers/history";
import API from "../../../config/AxiosBase";
import { headers } from "../../../helpers/helpers";
import "./BookAndReview.css";

export default function BookAndReviewPage(props) {
  // fetching patient profile
  const { data } = useQuery("patProfile", getPatProfile);
  const profileData = data?.data?.data;
  // getting props data
  const propsData = props.location.state;
  const visitType = propsData?.visitType;
  const { user, loading, isAuth } = useSelector((state) => state.auth);
  const [bookModal, setbookModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [slotId, setSlotId] = useState(propsData?.slot?._id || null);
  const slots =
    visitType === "video"
      ? propsData?.videoTimeSlot
      : propsData?.physicalTimeSlot;
  const reasonData = [
    { value: "inlness", text: "illness" },
    { value: "consulation", text: "Genrel Consultation" },
  ];
  const [selectedDate, setselectedDate] = useState(
    propsData?.bookingDate?.startDate || new Date()
  );
  const [seenBefore, setSeenBefore] = useState(
    propsData?.seenBefore || "false"
  );
  const fee =
    propsData?.visitType === "video"
      ? propsData?.videoPrice
      : propsData?.physicalPrice;
  const [doctorNotes, setDoctorNotes] = useState("");
  const [terms, setTerms] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reasonOfvisit, setReasonOfvisit] = useState(
    propsData?.reasonOfVisit || {
      value: "illness",
      text: "illness",
    }
  );
  const [uniqueId, setUniqueId] = useState();
  var doctorEmail = propsData?.email;

  // setting phone No if its in profile
  useEffect(() => {
    profileData && setPhoneNumber(profileData?.contactNo);
  }, [profileData]);

  //  booking mutation
  const newBookingFun = useNewBooking(newBooking);

  // query client
  const queryClient = useQueryClient();
  // fetch data
  const getStripeKey = () => {
    headers();
    return API.get("/payment/stripeApi");
  };

  const { data: stripeData, isLoading } = useQuery("stripeKey", getStripeKey, {
    staleTime: 100 * 60,
  });
  const stripeApiKey = stripeData?.data?.stripeApiKey;

  // on booking
  const onBooking = async () => {
    const validate = () => {
      const fee =
        propsData?.visitType === "video"
          ? propsData?.videoPrice
          : propsData?.physicalPrice;
      if (!phoneNumber) {
        Swal.fire({
          title: "Phone Number Missing",
          icon: "error",
          timer: "2000",
          showConfirmButton: false,
        });
        return true;
      } else if (!terms) {
        Swal.fire({
          title: "Please agree Terms And Condition",
          icon: "error",
          timer: "3000",
          showConfirmButton: false,
        });
        return true;
      } else if (!fee) {
        Swal.fire({
          title: "Sorry , can't Book",
          text: "Doctor has not set fee for its booking yet",
          icon: "error",
          timer: "2000",
          showConfirmButton: false,
        });
        return true;
      } else return false;
    };

    const validity = validate();
    if (validity) return;
    if (stripeApiKey) {
      //  handle booking

      const postData = {
        bookingDate: {
          start: selectedDate,
        },

        doctorEmail: propsData?.email,

        visitType: propsData?.visitType,

        seenBefore,
        reasonOfVisit: reasonOfvisit?.value,

        patientId: user?._id,

        fee:
          propsData?.visitType === "video"
            ? propsData?.videoPrice
            : propsData?.physicalPrice,
        phoneNumber,

        slotId,
        noteForDoctor: doctorNotes,
      };
      console.log("postData : ", postData);
      try {
        const res = await API.post("/docprofile/new-booking", postData);
        setUniqueId(res?.data?._id);
        console.log("response", res);
        if (res?.status === 201) {
          setPaymentModal(true);
        } else {
          Swal.fire("Can't Book your appointment right now", "", "error");
        }
      } catch (error) {
        Swal.fire("Can't Book your appointment right now", "", "error");
      }

      // newBookingFun.mutateAsync(postData, {
      //   onSuccess: () => {
      //     setbookModal(true);
      //     queryClient.invalidateQueries("patCounts");
      //     queryClient.invalidateQueries("patNotifications");
      //   },
      // });
    } else {
      Swal.fire("Can't Book your appointment right now", "", "error");
    }
  };

  // //  handle booking
  // const handleBooking = async () => {
  //   setPaymentModal(false);
  //   const postData = {
  //     reasonOfVisit: reasonOfvisit?.value,
  //     bookingDate: {
  //       start: selectedDate,
  //     },
  //     visitType: propsData?.visitType,
  //     noteForDoctor: doctorNotes,
  //     seenBefore,
  //     doctorEmail: propsData?.email,
  //     patientId: user?._id,
  //     phoneNumber,
  //     slotId,
  //     fee:
  //       propsData?.visitType === "video"
  //         ? propsData?.videoPrice
  //         : propsData?.physicalPrice,
  //     location: propsData?.location,
  //   };

  //   const res = await API.post("/docprofile/new-booking", { postData });

  //   newBookingFun.mutateAsync(postData, {
  //     onSuccess: () => {
  //       setbookModal(true);
  //       queryClient.invalidateQueries("patCounts");
  //       queryClient.invalidateQueries("patNotifications");
  //     },
  //   });
  // };

  // main return
  return (
    <AppWrapper>
      {paymentModal && stripeApiKey && uniqueId && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <BookingPaymentModal
            onClose={() => {
              setPaymentModal(false);
            }}
            data={{ fee, uniqueId, doctorEmail, visitType }}
            onCallback={onBooking}
          />
        </Elements>
      )}
      {bookModal && (
        <AppointmentBookedModal
          onClose={() => {
            history.push("/");
          }}
          data={{
            url: propsData?.url,
            docName: propsData?.name,
            time: selectedDate,
            isVideo: propsData?.isVideo,
            address: propsData?.location?.address,
          }}
        />
      )}
      {loading || isAuth || <Redirect to="/login" />}
      <div className="headerPadding bg-light bookAndReview">
        <ProfileHeader data={propsData} selectedDate={selectedDate} />
        <div className="bg-light">
          <div className="reviewRow">
            <div className="title">Review and book</div>
            <WhoSeeingDoctor />
            <AddPhoneNumber
              value={phoneNumber}
              callBack={(v) => setPhoneNumber(v)}
            />
            <div className="inputDiv">
              <label className="label">What's the reason for your visit?</label>
              <CustomSelect
                value={reasonOfvisit}
                callback={(v) => setReasonOfvisit(v)}
                options={reasonData}
              />
            </div>
            <RadioGroup
              row
              aria-label="seenBefore"
              name="seenBefore"
              className="inputDiv"
              value={seenBefore}
              onChange={(e, v) => setSeenBefore(v)}
            >
              <lable className="label">
                Have you seen {propsData?.name} before?
              </lable>
              <div className="flexCenter w-100">
                <FormControlLabel
                  value={"false"}
                  className="radioDiv"
                  control={<Radio color="primary" />}
                  label="I'm a new patient"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value={"true"}
                  className="radioDiv"
                  control={<Radio color="primary" />}
                  label="yes, i have"
                  labelPlacement="end"
                />
              </div>
            </RadioGroup>
            <div className="inputDiv">
              <EditAppointment
                callback={(v) => {
                  setselectedDate(v.start);
                  setSlotId(v._id);
                }}
                defaultValue={selectedDate}
                slots={slots}
              />
              <InputDiv
                label="Notes for the doctor's office (optional)"
                textArea
                onChange={(v) => {
                  setDoctorNotes(v);
                }}
              />
              <CheckTerms value={terms} callback={(v) => setTerms(v)} />

              <button
                onClick={onBooking}
                className=" loginBtn signUpButton mt-5 mb-5"
              >
                Book appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
}

const ProfileHeader = ({ data, selectedDate }) => {
  const profileImage = data?.url === "None" ? null : data?.url;
  return (
    <div className="bg-white w-100 ">
      <div className="headerProfileSec">
        <div>
          <img src={profileImage || docProfile} className="profileImg"></img>
        </div>
        <div>
          <div className="name">Dr. {data?.name}</div>
          <div className="text">
            {formatDate(parseISO(selectedDate), "eeee , MMM d - p")}
          </div>
          <div>
            {data?.visitType === "video" ? (
              <span className="flexCenter  reviewDetailText">
                <img
                  src="/images/CloudDoc/videoChat.png"
                  style={{ width: "24px", marginRight: "10px" }}
                ></img>
                Video Visit
              </span>
            ) : (
              <div className="text textLight">{data?.location?.address}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckTerms = ({ value, callback }) => {
  return (
    <div
      onClick={() => {
        callback(!value);
      }}
      className="d-flex patientSignUp p-0"
    >
      <div
        className={value ? "circle circleActive pointer" : "circle pointer"}
      ></div>
      <div className="pointer">
        I certify that the insurance or payment selected is the one that I will
        be using when I see this medical professional, and that I have read and
        agree to the Cloud doc{" "}
        <span className="textBlue poppinsSb pointer">terms of use</span>.
      </div>
    </div>
  );
};
