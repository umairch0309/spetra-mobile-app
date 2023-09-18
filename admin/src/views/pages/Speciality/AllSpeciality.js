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
  CTextarea,
} from "@coreui/react";
import React, { useState } from "react";
import { parseISO, format as formatDate } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addNewSpeciality,
  deleteSpeciality,
  getAllSpecialities,
  updateSpeciality,
} from "../../../containers/ApiFun";
import LoadingComponent from "../../../containers/LoadingComponent";

export default function AllSpeciality() {
  const { data, isLoading } = useQuery("AllSpecialities", getAllSpecialities);

  const [modal, setModal] = useState(false);
  const [specialityName, setSpecialityName] = useState("");
  const [specialityDescription, setSpecialityDescription] = useState("");
  const [fileSrc, setFileSrc] = useState(null);

  const fields = [
    { key: "name", label: "Speciality Name", _style: { width: "20%" } },
    {
      key: "description",
      label: "Speciality Description",
      _style: { width: "35%" },
    },
    { key: "createdAt" },

    {
      key: "show_details",
      label: "Actions",
      sorter: false,
      filter: false,
      _style: { width: "25%" },
    },
  ];

  const queryClient = useQueryClient();

  const addSpeciality = useMutation(addNewSpeciality, {
    // When mutate is called:
    onMutate: async ({ data }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("AllSpecialities");

      // Snapshot the previous value
      const previousData = queryClient.getQueryData("AllSpecialities");

      // Optimistically update to the new value
      queryClient.setQueryData("AllSpecialities", (old) => {
        let cloneData = old;
        console.log("data", data);
        let filterData = [...old.data.data, data];
        cloneData.data.data = filterData;
        return cloneData;
      });

      // Return a context object with the snapshotted value
      return { previousData };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, data, context) => {
      queryClient.setQueryData("AllSpecialities", context.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries("AllSpecialities");
    },
  });

  const deleteSpecialityFun = useMutation(deleteSpeciality, {
    // When mutate is called:
    onMutate: async (id) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("AllSpecialities");

      // Snapshot the previous value
      const previousData = queryClient.getQueryData("AllSpecialities");

      // Optimistically update to the new value
      queryClient.setQueryData("AllSpecialities", (old) => {
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
      queryClient.setQueryData("AllSpecialities", context.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries("AllSpecialities");
    },
  });
  const updateSpecialityFun = useMutation(updateSpeciality, {
    // When mutate is called:
    onMutate: async ({ data, id }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("AllSpecialities");

      // Snapshot the previous value
      const previousData = queryClient.getQueryData("AllSpecialities");

      // Optimistically update to the new value
      queryClient.setQueryData("AllSpecialities", (old) => {
        let cloneData = old;
        let filterData = old.data.data.filter((el) => {
          if (el._id === id) {
            el.featured = data.featured;
          }
          return el;
        });
        cloneData.data.data = filterData;

        return cloneData;
      });

      // Return a context object with the snapshotted value
      return { previousData };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, data, context) => {
      queryClient.setQueryData("AllSpecialities", context.previousData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries("AllSpecialities");
    },
  });

  // add new speciality
  const addNewSpecialityFun = () => {
    if (!specialityName || !specialityDescription || !fileSrc) return;
    const currentDate = new Date().toJSON();
    const formData = new FormData();
    formData.append("name", specialityName);
    formData.append("description", specialityDescription);
    formData.append("createdAt", currentDate);
    formData.append("file", fileSrc);
    const data = {
      name: specialityName,
      description: specialityDescription,
      createdAt: currentDate,
    };
    addSpeciality.mutate({ formData, data });
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
              + Add New Speciality
            </CButton>
          </div>
          <CModal show={modal} onClose={() => setModal(false)}>
            <CModalHeader closeButton>
              <CModalTitle className="text-dark">Add Speciality</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CInput
                type="text"
                className="mt-2"
                onChange={(e) => {
                  setSpecialityName(e.target.value);
                }}
                placeholder="Please enter speciality name"
              ></CInput>
              <CTextarea
                type="text"
                rows={4}
                className="mt-2"
                onChange={(e) => {
                  setSpecialityDescription(e.target.value);
                }}
                placeholder="Please enter speciality description"
              ></CTextarea>
              <CInput
                type="file"
                className="mt-2"
                onChange={(e) => {
                  setFileSrc(e.target.files[0]);
                }}
              ></CInput>
              <p className="text-danger">
                Note : Image should have transparent backgroung and aspect ratio
                of 1:1
              </p>
            </CModalBody>
            <CModalFooter>
              <CButton onClick={addNewSpecialityFun} color="primary">
                Add Speciality
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
                    <div
                      style={{ flexShrink: "0" }}
                      className="flexCenter w-100 noWrap"
                    >
                      {item.featured ? (
                        <CButton
                          color="danger"
                          variant="outline"
                          shape="pill"
                          className="ml-2"
                          size="sm"
                          onClick={() =>
                            updateSpecialityFun.mutate({
                              data: { featured: false },
                              id: item._id,
                            })
                          }
                        >
                          remove as featured
                        </CButton>
                      ) : (
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="pill"
                          className="ml-2"
                          size="sm"
                          onClick={() =>
                            updateSpecialityFun.mutate({
                              data: { featured: true },
                              id: item._id,
                            })
                          }
                        >
                          add to featured
                        </CButton>
                      )}
                      <CButton
                        color="danger"
                        variant="outline"
                        shape="pill"
                        className="ml-2"
                        size="sm"
                        onClick={() => deleteSpecialityFun.mutate(item._id)}
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
