import React, { useState, useEffect } from "react";
import { format as formatDate, parseISO } from "date-fns";
import SearchBar from "material-ui-search-bar";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/common/Loading";
import { defalutProfile } from "../../assets/index";
import { getImageUrl, profileImageURL } from "../../helpers/helpers";
import { getAppointments } from "../../services/panel";
import history from "../../helpers/history";
import "./appointment.css";
import { setHeaderTitle } from "../../redux/actions/dashboardActions";

export default function AppointmentsPage() {
  const [query, setQuery] = useState("");
  const [appointmentData, setAppointmentsData] = useState(null);
  const [cloneData, setCloneData] = useState(null);
  const [count, setCount] = useState(10);
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  // setting Header title
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle("Appointment"));
    return () => {};
  }, []);

  // fetching data
  const { data, isLoading } = useQuery(["Appointment", count], getAppointments);

  const queryData = data?.data;
  useEffect(() => {
    queryData && setAppointmentsData(queryData);
    queryData && setCloneData(queryData);
  }, [queryData]);

  // on search
  const onSearchChange = (value) => {
    const query = value;
    setQuery(query);
    const filterData = cloneData.filter(
      (suggestion) =>
        suggestion.patientData?.name
          .toLowerCase()
          .indexOf(query.toLowerCase()) > -1
    );
    setAppointmentsData(filterData);
  };
  // on cancle search
  const onCancelSearch = () => {
    setAppointmentsData(cloneData);
  };

  // main return
  return (
    <div className="contentRow">
      {isLoading && appointmentData === null && <Loading />}
      {(!isLoading || appointmentData) && (
        <>
          <SearchBar
            style={{ width: "100%" }}
            onCancelSearch={onCancelSearch}
            value={query}
            onChange={onSearchChange}
          />

          <div className="classicTable">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th> {role === "patient" ? "Doctor" : "Patient"} Name</th>
                  <th>Date</th>
                  <th>Clinic Address</th>
                  <th>Fee</th>
                  <th>Visit schedule</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointmentData?.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <div>
                          <img
                            src={getImageUrl(
                              role === "doctor"
                                ? item.patientData?.image?.url
                                : item.doctorData?.image?.url
                            )}
                            className="nameImg"
                            alt="img"
                          ></img>
                          <span>
                            {role === "doctor"
                              ? item.patientData?.name
                              : item.doctorData?.name}
                          </span>
                        </div>
                      </td>

                      <td>{formatDate(parseISO(item.createdAt), "P")}</td>
                      <td>{item.location?.address}</td>
                      <td>{item.fee} $</td>
                      <td>
                        {" "}
                        {formatDate(parseISO(item.bookingDate?.start), "Pp")}
                      </td>
                      <td>{item.status}</td>

                      <td>
                        <div className="centerDiv">
                          <div className="flexCenterCol">
                            <img
                              onClick={() =>
                                history.push(
                                  `/dashboard/appointment/detail`,
                                  item
                                )
                              }
                              className=" pointer mb-2"
                              src="/images/eye.svg"
                              style={{ width: "20px" }}
                              alt="icon"
                            ></img>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {appointmentData?.length === 0 && (
              <div className="centerFlex" style={{ height: "250px" }}>
                no , Appointments found
              </div>
            )}
          </div>

          {appointmentData && count <= appointmentData?.length && (
            <button
              onClick={() => setCount((prev) => prev + 10)}
              className="primaryBtn"
            >
              See More
            </button>
          )}
          {appointmentData && isLoading && (
            <button className="primaryBtn">Loading...</button>
          )}
        </>
      )}
    </div>
  );
}
