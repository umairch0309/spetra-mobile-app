import React, { useState } from "react";
import Swal from "sweetalert2";
import API from "../../../config/AxiosBase";
import { headers } from "../../../helpers/helpers";
import { TextField } from "@material-ui/core";
import MuiPhoneNumber from "material-ui-phone-number";
import Loading from "../../common/Loading";
export default function AddPhoneNumber({ callBack, value, enableEdit }) {
  const [active, setActive] = useState(false);
  return (
    <div>
      {active && (
        <AddPhoneNumberModal
          onClose={() => setActive(false)}
          callBack={(v) => {
            callBack(v);
          }}
          value={value}
        />
      )}
      <div className="inputDiv mb-0">
        <label className="label">
          Phone number where the doctor can contact you
        </label>
        {value ? (
          <>
            <div className="inputStyle">
              <div className="text">{value} </div>
            </div>
            {enableEdit && (
              <div
                onClick={() => setActive(true)}
                className="actionText pointer"
              >
                Edit Phone Number
              </div>
            )}
          </>
        ) : (
          <div className="inputStyle py-0">
            <div onClick={() => setActive(true)} className="actionText">
              Add Phone Number
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const AddPhoneNumberModal = ({ onClose, callBack, value }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filterNumber, setFilterNumber] = useState("");
  const [channelType, setChannelType] = useState("");
  const [showVerifyCode, setShowVerifyCode] = useState(false);
  const [verifiactionCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const getCode = async (channel) => {
    if (!phoneNumber) {
      Swal.fire("Please Enter Phone Number", "", "error");
      return;
    } else {
      setChannelType(channel);
      setLoading(true);
      try {
        // removing special charachters and symbol and spaces
        let phoneNo = phoneNumber.replace(/[^a-zA-Z0-9 ]/g, "");
        phoneNo = phoneNo.replace(/\s+/g, "").trim();
        setFilterNumber(phoneNo);
        headers();
        const response = await API.get(
          `/docprofile/send-code?phoneNo=+${phoneNo}&&channel=${channel}`
        );
        setShowVerifyCode(true);
      } catch (error) {
        console.log(error);
        Swal.fire("Please Enter Valid Phone Number", "", "error");
      }
      setLoading(false);
    }
  };

  const verifiyCode = async () => {
    if (!verifiactionCode) {
      Swal.fire("Please Enter Verification Code", "", "error");
      return;
    } else {
      setLoading(true);
      try {
        headers();
        const response = await API.get(
          `/docprofile/verify-number?phoneNo=${filterNumber}&&code=${verifiactionCode}`
        );
        callBack(phoneNumber);
        onClose();
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }
  };

  // resending the verification code
  const onResendCode = async () => {
    if (channelType) {
      try {
        headers();
        const response = await API.get(
          `/docprofile/send-code?phoneNo=${filterNumber}&&channel=${channelType}`
        );
      } catch (error) {
        console.log(error);
        Swal.fire("Please Enter Valid Phone Number", "", "error");
      }
    }
  };
  return (
    <div onClick={onClose} className="mainModal">
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
        {!showVerifyCode ? (
          <>
            {loading && <Loading height="280px" />}
            {loading || (
              <>
                <div className="title mb-1">Verify your phone number</div>
                <div className="text mb-3">
                  We'll send a PIN to this number right away
                </div>
                <MuiPhoneNumber
                  defaultCountry={"us"}
                  onChange={(v) => setPhoneNumber(v)}
                  variant="outlined"
                  defaultValue={value}
                  style={{ width: "100%" }}
                />
                ,
                <div>
                  <button
                    onClick={() => getCode("sms")}
                    className=" loginBtn signUpButton mb-2"
                  >
                    Text me with PIN
                  </button>
                  <button
                    onClick={() => getCode("call")}
                    className=" loginBtn loginButton mb-2"
                  >
                    Call me with PIN
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="title mb-1">Enter the Verfication Code</div>
            <div className="text mb-3">
              We have send a PIN to your number, if you have not receive PIN{" "}
              <span onClick={onResendCode} className="actionText">
                resend code
              </span>{" "}
            </div>
            <TextField
              variant="outlined"
              placeholder="Enter Verification Code"
              label="Verification Code"
              style={{ width: "100%", marginBottom: "20px" }}
              onChange={(e) => setVerificationCode(e.target.value)}
            ></TextField>

            <button
              onClick={verifiyCode}
              className=" loginBtn signUpButton mb-2"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
