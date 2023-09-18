import { CDataTable } from "@coreui/react";
import React, { useState } from "react";
import { parseISO, format as formatDate } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { allConsultations } from "../../../containers/ApiFun";
import LoadingComponent from "../../../containers/LoadingComponent";

export default function AllConsultations() {
  const { data, isLoading } = useQuery("allConsultations", allConsultations);

  console.log(data?.data);

  const fields = [
    { key: "patientName", label: "Patient Name" },
    { key: "doctorName", label: "Doctor Name" },
    { key: "reasonOfVisit", label: "Reason of Visit" },
    { key: "status", label: "Status" },
    { key: "fee", label: "Fee" },
    { key: "createdAt" },
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
              createdAt: (item) => {
                return <td>{formatDate(parseISO(item.createdAt), "PPp")}</td>;
              },
              reasonOfVisit: (item) => {
                return <td>{item.reasonOfVisit}</td>;
              },
              status: (item) => {
                return <td>{item.status}</td>;
              },
              patientName: (item) => {
                return <td>{item.patientName}</td>;
              },
              doctorName: (item) => {
                return <td>{item.doctorName}</td>;
              },
              fee: (item) => {
                return <td>{item.fee}</td>;
              },
            }}
          />
        </div>
      )}
    </>
  );
}
