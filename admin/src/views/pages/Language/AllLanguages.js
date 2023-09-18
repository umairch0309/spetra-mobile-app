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
import {
  getAllLanguages,
  addNewLanguage,
  deleteLanguage,
} from "../../../containers/ApiFun";
import LoadingComponent from "../../../containers/LoadingComponent";

export default function AllLanguages() {
  const { data, isLoading } = useQuery("AllLanguages", getAllLanguages);

  const [modal, setModal] = useState(false);
  const [languageName, setLanguageName] = useState("");

  const fields = [
    { key: "name", label: "Language Name", _style: { width: "50%" } },
    { key: "createdAt", _style: { width: "40%" } },

    {
      key: "show_details",
      label: "Actions",
      _style: { width: "30%" },
      sorter: false,
      filter: false,
    },
  ];

  const queryClient = useQueryClient();

  const addLanguage = useMutation(addNewLanguage, {
    // When mutate is called:
    onMutate: async (data) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("AllLanguages");

      // Snapshot the previous value
      const previousData = queryClient.getQueryData("AllLanguages");

      // Optimistically update to the new value
      queryClient.setQueryData("AllLanguages", (old) => {
        let cloneData = old;
        let filterData = [...old.data.data, data];
        cloneData.data.data = filterData;
        return cloneData;
      });

      // Return a context object with the snapshotted value
      return { previousData };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, data, context) => {
      queryClient.setQueryData("AllLanguages", context.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries("AllLanguages");
    },
  });

  const deleteLanguageFun = useMutation(deleteLanguage, {
    // When mutate is called:
    onMutate: async (id) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("AllLanguages");

      // Snapshot the previous value
      const previousData = queryClient.getQueryData("AllLanguages");

      // Optimistically update to the new value
      queryClient.setQueryData("AllLanguages", (old) => {
        let cloneData = old;
        let filterData = old.data.data.filter((el) => el._id !== id);
        cloneData.data.data = filterData;

        return cloneData;
      });

      // Return a context object with the snapshotted value
      return { previousData };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, data, context) => {
      queryClient.setQueryData("AllLanguages", context.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries("AllLanguages");
    },
  });

  // add new Language
  const addNewLanguageFun = () => {
    if (!languageName) return;
    const currentDate = new Date().toJSON();

    const data = { name: languageName, createdAt: currentDate };
    addLanguage.mutate(data);
    setModal(false);
  };

  // main return
  return (
    <>
      {isLoading && <LoadingComponent />}
      {isLoading || (
        <div className="bg-white p-3 ">
          <div
            className="flexCenter my-3"
            style={{ justifyContent: "flex-end" }}
          >
            <CButton onClick={() => setModal(true)} color="primary" size="sm">
              + Add New Language
            </CButton>
          </div>
          <CModal show={modal} onClose={() => setModal(false)}>
            <CModalHeader closeButton>
              <CModalTitle className="text-dark">Add Language</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CInput
                onChange={(e) => {
                  setLanguageName(e.target.value);
                }}
                placeholder="Please enter language name"
              ></CInput>
            </CModalBody>
            <CModalFooter>
              <CButton onClick={addNewLanguageFun} color="primary">
                Add Language
              </CButton>
              <CButton color="secondary" onClick={() => setModal(false)}>
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>
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
              createdAt: (item) => {
                return <td>{formatDate(parseISO(item.createdAt), "PPp")}</td>;
              },
              show_details: (item, index) => {
                return (
                  <td className="py-2">
                    <div className="flexCenter w-100 noWrap">
                      <CButton
                        color="danger"
                        variant="outline"
                        shape="pill"
                        className="ml-2"
                        size="sm"
                        onClick={() => deleteLanguageFun.mutate(item._id)}
                      >
                        <CIcon name="cil-trash"></CIcon>
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
