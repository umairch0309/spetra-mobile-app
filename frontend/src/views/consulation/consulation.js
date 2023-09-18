import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { format as formatDate, parseISO } from "date-fns";
import { getImageUrl, handleJoinMeeting } from "../../helpers/helpers";
import Loading from "../../components/common/Loading";
import { defalutProfile } from "../../assets";
import history from "../../helpers/history";
import ReviewModal from "../../components/review/ReviewModal";
import { profileImageURL } from "../../helpers/helpers";
import { getConsulations } from "../../services/panel";
import "./consulation.css";
import { setHeaderTitle } from "../../redux/actions/dashboardActions";

export default function Consulation() {
  // search query
  const urlQuery = new URLSearchParams(useLocation().search);
  const isReview = urlQuery.get("review");
  const reviewBookingId = urlQuery.get("bookingId");
  const visitType = urlQuery.get("visitType");

  // states
  const [query, setQuery] = useState("");
  const [appointmentData, setAppointmentsData] = useState(null);
  const [cloneData, setCloneData] = useState(null);
  const [count, setCount] = useState(10);
  const [reviewModal, setReviewModal] = useState(isReview || false);

  // fetching user data
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const role = user?.role;

  // setting Header title
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle("Consultation"));
    return () => {};
  }, []);

  // fetching data
  const { data, isLoading } = useQuery(
    ["Consultation", count],
    getConsulations
  );
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
        suggestion.doctorData?.name.toLowerCase().indexOf(query.toLowerCase()) >
        -1
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
      {reviewModal && (
        <ReviewModal
          bookingId={reviewBookingId}
          onClose={() => {
            setReviewModal(false);
            history.push("/dashboard/consulation");
          }}
        />
      )}
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
                  <th>Medical Condition</th>
                  <th>Consulation schedule </th>
                  <th>Fee</th>
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
                            alt="name"
                          ></img>
                          <span>
                            {role === "doctor"
                              ? item?.patientData?.name
                              : item?.doctorData?.name}
                          </span>
                        </div>
                      </td>

                      <td>{formatDate(parseISO(item.createdAt), "P")}</td>
                      <td>{item.reasonOfVisit}</td>
                      <td>
                        {formatDate(parseISO(item.bookingDate?.start), "Pp")}
                      </td>
                      <td>{item.fee}$</td>
                      <td>{item.status}</td>

                      <td>
                        <div className="centerDiv">
                          <div className="flexCenterCol">
                            <img
                              onClick={() =>
                                history.push(
                                  `/dashboard/consulation/detail`,
                                  item
                                )
                              }
                              className=" mb-2 pointer"
                              src="/images/eye.svg"
                              style={{ width: "20px" }}
                              alt="icon"
                            ></img>

                            {handleJoinMeeting(item, userId, false) && (
                              <button
                                onClick={() => handleJoinMeeting(item, userId)}
                                className="btn btn-outline-primary btn-sm"
                                style={{ font: "12px roboto" }}
                              >
                                Start consultation
                              </button>
                            )}
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
                no , Consulations find
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
