import CIcon from "@coreui/icons-react";
import {
  CDataTable,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInput,
} from "@coreui/react";
import React, { useState } from "react";
import { parseISO, format as formatDate } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { eyeIcon } from "../../../assets/images";
import {
  addNewSubject,
  deleteSubject,
  allAppointments,
  updateSubject,
} from "../../../containers/ApiFun";
import LoadingComponent from "../../../containers/LoadingComponent";

export default function AllAppointments() {
  const { data, isLoading } = useQuery("allAppointments", allAppointments);

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
