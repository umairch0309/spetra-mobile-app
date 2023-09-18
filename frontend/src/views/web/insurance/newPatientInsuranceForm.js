import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import Loading from "../../../components/common/Loading";
import InsuranceForm from "../../../components/web/insurance/InsuranceForm";
import AppWrapper from "../../../components/web/wrapper/AppWrapper";
import history from "../../../helpers/history";
import { getInsuranceDetails } from "../../../services/web";
import "../doctorForm/doctorForm.css";
function NewInsuranceForm() {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;
  const query = new URLSearchParams(useLocation().search);
  const status = query.get("status");

  useEffect(() => {
    if (user) {
      status === "rejected" ||
        (user.isInsuranceFormSubmitted && history.push("/dashboard"));
    }
    return () => {};
  }, [user]);

  const { data, isLoading } = useQuery(
    "insuranceProfileDetails",
    getInsuranceDetails,
    {
      enabled: status === "rejected",
    }
  );

  const insuranceData = data?.data;

  // main return
  return (
    <AppWrapper>
      <div>
        <div className="headerPadding bg-light">
          <div className="basicRow doctorFormWrapper">
            <div className="basicLandingTitle text-center">
              Insurance Detail Form
            </div>
            <div className="flexCenter mt-3 mb-3">
              <div>
                Don't have Insurance yet ? ,
                <span
                  className="textBlue poppinsSb pointer"
                  onClick={() => history.push("/dashboard")}
                >
                  Skip.
                </span>
              </div>
            </div>
            {isLoading && <Loading />}
            {isLoading || (
              <InsuranceForm data={insuranceData} status="pending" />
            )}
          </div>
        </div>
      </div>
    </AppWrapper>
  );
}
export default NewInsuranceForm;
