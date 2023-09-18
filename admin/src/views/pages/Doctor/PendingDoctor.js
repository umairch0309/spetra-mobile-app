import CIcon from "@coreui/icons-react";
import { CDataTable, CButton } from "@coreui/react";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { eyeIcon } from "../../../assets/images";
import {
  pendingDoctors,
  declineDocForm,
  approveDocForm,
} from "../../../containers/ApiFun";
import { parseISO, format as formatDate } from "date-fns";
import history from "../../../config/history";
import LoadingComponent from "../../../containers/LoadingComponent";

export default function PendingDoctors() {
  const { data, isLoading } = useQuery("PendingDoctors", pendingDoctors);

  const fields = [
    { key: "name", label: "Doctor Name", _style: { width: "25%" } },
    { key: "email", label: "Email", style: { width: "40%" } },
    { key: "createdAt", label: "Registered", style: { width: "40%" } },

    {
      key: "show_details",
      label: "Actions",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];

  // delete pending teacher
  const queryClient = useQueryClient();
  const declineDoctorFun = useMutation(declineDocForm, {
    // When mutate is called:
    onMutate: async (id) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("PendingDoctors");

      // Snapshot the previous value
      const previousData = queryClient.getQueryData("PendingDoctors");

      // Optimistically update to the new value
      queryClient.setQueryData("PendingDoctors", (old) => {
        console.log(old);
        let cloneData = old;
        let filterData = old.data.data.filter((el) => el._id !== id);
        cloneData.data = filterData;
        return cloneData;
      });

      // Return a context object with the snapshotted value
      return { previousData };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, id, context) => {
      console.log(context.previousData);
      queryClient.setQueryData("PendingDoctors", context.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries("PendingDoctors");
    },
  });

  // approve pending teacher
  const approveDoctor = useMutation(approveDocForm, {
    // When mutate is called:
    onMutate: async (id) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("PendingDoctors");

      // Snapshot the previous value
      const previousData = queryClient.getQueryData("PendingDoctors");

      // Optimistically update to the new value
      queryClient.setQueryData("PendingDoctors", (old) => {
        console.log(old.data);
        let cloneData = old;
        let filterData = old.data.data.filter((el) => el._id !== id);
        cloneData.data = filterData;
        return cloneData;
      });

      // Return a context object with the snapshotted value
      return { previousData };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, id, context) => {
      console.log(context.previousData);
      queryClient.setQueryData("PendingDoctors", context.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries("PendingDoctors");
    },
  });

  // main return
  return (
    <>
      {isLoading && <LoadingComponent />}
      {isLoading || (
        <div className="bg-white p-3 ">
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
              createdAt: (item) => {
                return <td>{formatDate(parseISO(item.createdAt), "PPp")}</td>;
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
                        onClick={() => approveDoctor.mutate(item._id)}
                      >
                        Approve
                      </CButton>

                      <CButton
                        color="danger"
                        variant="outline"
                        shape="pill"
                        className="ml-2"
                        size="sm"
                        onClick={() => declineDoctorFun.mutate(item._id)}
                      >
                        {/* <CIcon name="cil-trash"></CIcon> */}
                        Decline
                      </CButton>
                      <CButton
                        color="secondary"
                        variant="outline"
                        shape="pill"
                        className="ml-2"
                        size="sm"
                        onClick={() =>
                          history.push(
                            `/admin/doctor/pending-doctor/detail/${item._id}`,
                            item
                          )
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
