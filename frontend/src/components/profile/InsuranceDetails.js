import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getInsuranceDetails } from "../../services/web";
import Loading from "../common/Loading";
import history from "../../helpers/history";
import InsuranceForm from "../web/insurance/InsuranceForm";

function InsuranceDetailsProfile() {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;
  const { isInsuranceFormSubmitted } = user;

  const { data, isLoading } = useQuery(
    "insuranceProfileDetails",
    getInsuranceDetails,
    {
      enabled: isInsuranceFormSubmitted,
    }
  );

  const insuranceData = data?.data;

  const renderInsuranceByStatus = () => {
    switch (insuranceData?.status) {
      case "pending":
        return <div className="mb-5">Your insurance details are in review</div>;
      case "rejected":
        return (
          <div className="mb-3">
            Your insurance details are rejected ,{" "}
            <span
              className="textBlue poppinsSb pointer"
              onClick={() => history.push("/insurance-form?status=rejected")}
            >
              Click here
            </span>{" "}
            to fill valid details and request again for approval
          </div>
        );
      case "accepted":
        return <InsuranceForm data={insuranceData} />;
      default:
        return <></>;
    }
  };
  // main return
  return (
    <div>
      <div className="settitngLabel">Insurance Details</div>
      {isInsuranceFormSubmitted ? (
        isLoading ? (
          <Loading />
        ) : (
          renderInsuranceByStatus()
        )
      ) : (
        <div className="">
          You have't provide any insurance Details , yet .
          <span
            className="textBlue poppinsSb pointer"
            onClick={() => history.push("/insurance-form")}
          >
            Click here
          </span>{" "}
          to fill your insurance form
        </div>
      )}
    </div>
  );
}
export default InsuranceDetailsProfile;
