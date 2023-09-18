import CIcon from "@coreui/icons-react";
import { CDataTable, CButton } from "@coreui/react";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { getPatients, deactiveUser } from "../../../containers/ApiFun";
import { parseISO, format as formatDate } from "date-fns";
import LoadingComponent from "../../../containers/LoadingComponent";

export default function PatientPages() {
  const { data, isLoading, error } = useQuery("Patients", getPatients);

  const fields = [
    { key: "name", label: "Patient Name", _style: { width: "25%" } },
    { key: "email", label: "Email", style: { width: "40%" } },
    { key: "createdAt", label: "registered" },

    {
      key: "show_details",
      label: "Actions",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const queryClient = useQueryClient();
  const deleteParentFun = useMutation(deactiveUser, {
    // When mutate is called:
    onMutate: async ({ status, id }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("Patients");

      // Snapshot the previous value
      const previousData = queryClient.getQueryData("Patients");

      // Optimistically update to the new value
      queryClient.setQueryData("Patients", (old) => {
        let cloneData = old;

        let filterData = old.data.data.filter((el) => {
          if (el._id === id) {
            el.status = status;
          }
          return el;
        });
        cloneData.data = filterData;
        return cloneData;
      });

      // Return a context object with the snapshotted value
      return { previousData };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, id, context) => {
      queryClient.setQueryData("Patients", context.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries("Patients");
    },
  });

  return (
    <>
      {isLoading && <LoadingComponent />}
      {isLoading || (
        <div className="bg-white p-3 ">
          <div
            className="flexCenter my-3"
            style={{ justifyContent: "flex-end" }}
          >
            <Link to="/admin/patient/new-patient">
              <CButton color="primary" size="sm">
                + Add Patient
              </CButton>
            </Link>
          </div>

          <CDataTable
            responsive
            items={data?.data?.data}
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
              show_details: (item, index) => {
                return (
                  <td className="py-2">
                    {item.status === "active" ? (
                      <CButton
                        color="danger"
                        variant="outline"
                        shape="pill"
                        size="sm"
                        onClick={() =>
                          deleteParentFun.mutate({
                            status: "deactivate",
                            id: item._id,
                          })
                        }
                      >
                        deactivate
                      </CButton>
                    ) : (
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="pill"
                        size="sm"
                        onClick={() =>
                          deleteParentFun.mutate({
                            status: "active",
                            id: item._id,
                          })
                        }
                      >
                        activate
                      </CButton>
                    )}
                  </td>
                );
              },
              createdAt: (item) => {
                return <td>{formatDate(parseISO(item.createdAt), "PPp")}</td>;
              },
            }}
          />
        </div>
      )}
    </>
  );
}
