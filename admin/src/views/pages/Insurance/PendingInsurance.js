import { CDataTable, CButton } from "@coreui/react";
import React from "react";
import { useQuery } from "react-query";
import { eyeIcon } from "../../../assets/images";
import { pendingInsurance, updateInsurance } from "../../../containers/ApiFun";
import { parseISO, format as formatDate } from "date-fns";
import history from "../../../config/history";
import LoadingComponent from "../../../containers/LoadingComponent";
import { useDeleteItemMutataion } from "../../../query/mutations";

export default function PendingInsurance() {
  const { data, isLoading } = useQuery("PendingInsurance", pendingInsurance);
  const updateInsuranceForm = useDeleteItemMutataion(
    updateInsurance,
    "PendingInsurance"
  );

  const fields = [
    { key: "primaryInsuranceName", label: "Name", _style: { width: "25%" } },
    { key: "role", label: "Role", _style: { width: "25%" } },
    {
      key: "insuranceCompany",
      label: "Insurance Company",
      style: { width: "40%" },
    },
    { key: "primaryInsuranceDOB", label: "DOB", style: { width: "40%" } },

    {
      key: "show_details",
      label: "Actions",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];

  // main return
  return (
    <>
      {isLoading && <LoadingComponent />}
      {isLoading || (
        <div className="bg-white p-3 ">
          <CDataTable
            responsive
            items={data?.data}
            fields={fields}
            columnFilter
            tableFilter
            footer
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            sorter
            pagination
            scopedSlots={{
              email: (item) => {
                return <td>{item.email}</td>;
              },
              primaryInsuranceDOB: (item) => {
                return (
                  <td>
                    {formatDate(parseISO(item.primaryInsuranceDOB), "PPp")}
                  </td>
                );
              },
              show_details: (item, index) => {
                return (
                  <td className="py-2">
                    <div className="flexCenter w-100 noWrap">
                      <CButton
                        color="warning"
                        variant="outline"
                        shape="pill"
                        size="sm"
                        className="text-noWrap"
                        onClick={() =>
                          updateInsuranceForm.mutate({
                            id: item._id,
                            status: "accepted",
                          })
                        }
                      >
                        Approve
                      </CButton>

                      <CButton
                        color="danger"
                        variant="outline"
                        shape="pill"
                        className="ml-2"
                        size="sm"
                        onClick={() =>
                          updateInsuranceForm.mutate({
                            id: item._id,
                            status: "rejected",
                          })
                        }
                      >
                        Decline
                      </CButton>
                      <CButton
                        color="secondary"
                        variant="outline"
                        shape="pill"
                        className="ml-2"
                        size="sm"
                        onClick={() =>
                          history.push(`/admin/insurance/form/detail`, item)
                        }
                      >
                        <img src={eyeIcon} alt="eye" className="icon"></img>
                      </CButton>
                    </div>
                  </td>
                );
              },
            }}
          />
        </div>
      )}
    </>
  );
}
