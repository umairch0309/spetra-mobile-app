import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import history from "../../../config/history";
import { CButton } from "@coreui/react";
import { useDeleteItemMutataion } from "../../../query/mutations";
import { updateInsurance } from "../../../containers/ApiFun";
export default function InsuranceDetail() {
  const propsData = useLocation().state;
  const { status } = propsData;
  console.log(propsData);

  const updateInsuranceForm = useDeleteItemMutataion(
    updateInsurance,
    status === "pending"
      ? "PendingInsurance"
      : status === "accepted"
      ? "ActiveInsurance"
      : "RejectedInsurance"
  );
  useEffect(() => {
    if (propsData === undefined) history.push("/admin/insurance/form/active");
  }, []);
  return (
    <div className="bg-white textBlack p-3 ">
      <div className="textBlack">
        <h2 className="text-center py-3">Insurance Detail</h2>
        <br />
        <div className="flexCenter" style={{ justifyContent: "flex-end" }}>
          {status === "accepted" || (
            <CButton
              color="warning"
              variant="outline"
              shape="pill"
              size="sm"
              className="text-noWrap"
              onClick={() => {
                updateInsuranceForm.mutate({
                  id: propsData._id,
                  status: "accepted",
                });
                history.goBack();
              }}
            >
              Approve
            </CButton>
          )}

          {status === "rejected" || (
            <CButton
              color="danger"
              variant="outline"
              shape="pill"
              className="ml-2"
              size="sm"
              onClick={() => {
                updateInsuranceForm.mutate({
                  id: propsData._id,
                  status: "rejected",
                });

                history.goBack();
              }}
            >
              Decline
            </CButton>
          )}
        </div>
        <h5>Insurance Company</h5>
        <p>{propsData?.insuranceCompany}</p>
        <h5>Insurance Plan</h5>
        <p>{propsData.planName}</p>

        <h5>Primary Insurance Name</h5>
        <p>{propsData.primaryInsuranceName}</p>

        <h5>Policy No</h5>
        <p>{propsData.policyNo}</p>
        <h5>Group No</h5>
        <p>{propsData.groupNo}</p>

        <h5>Primary Insurance DOB</h5>
        <p>{propsData.primaryInsuranceDOB}</p>
        <h5>Patient Name</h5>
        <p>{propsData.patientName}</p>
        <h5>Patient DOB</h5>
        <p>{propsData.patientDOB}</p>
      </div>
    </div>
  );
}
