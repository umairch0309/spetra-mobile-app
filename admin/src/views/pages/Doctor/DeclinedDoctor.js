import CIcon from "@coreui/icons-react";
import { CDataTable, CButton } from "@coreui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { parseISO, format as formatDate } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { declinedDoctors } from "../../../containers/ApiFun";
import LoadingComponent from "../../../containers/LoadingComponent";

export default function DeclinedDoctor() {
  const { data, isLoading } = useQuery("DeclinedDoctors", declinedDoctors);

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

  const queryClient = useQueryClient();
  //   const deleteTeacherFun = useMutation(deleteDoctor, {
  //     // When mutate is called:
  //     onMutate: async (id) => {
  //       // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  //       await queryClient.cancelQueries("DeclinedDoctors");

  //       // Snapshot the previous value
  //       const previousData = queryClient.getQueryData("DeclinedDoctors");

  //       // Optimistically update to the new value
  //       queryClient.setQueryData("DeclinedDoctors", (old) => {
  //         let cloneData = old;
  //         let filterData = old.data.data.filter((el) => el._id !== id);
  //         cloneData.data = filterData;
  //         return cloneData;
  //       });

  //       // Return a context object with the snapshotted value
  //       return { previousData };
  //     },
  //     // If the mutation fails, use the context returned from onMutate to roll back
  //     onError: (err, id, context) => {
  //       console.log(context.previousData);
  //       queryClient.setQueryData("DeclinedDoctors", context.previousData);
  //     },
  //     // Always refetch after error or success:
  //     onSettled: () => {
  //       queryClient.invalidateQueries("DeclinedDoctors");
  //     },
  //   });

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
                    {/* <div className="flexCenter w-100 noWrap">
                      <CButton
                        color="danger"
                        variant="outline"
                        shape="pill"
                        size="sm"
                        onClick={() => deleteTeacherFun.mutate(item._id)}
                      >
                        <CIcon name="cil-trash"></CIcon>
                      </CButton>
                    </div> */}
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
