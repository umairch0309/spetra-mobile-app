import React, { useState, useEffect } from "react";
import SearchBar from "material-ui-search-bar";
import { useQuery } from "react-query";
import { getPaymentHistory } from "../../services/panel";
import { getImageUrl } from "../../helpers/helpers";
import { format as formatDate, parseISO } from "date-fns";
import Loading from "../../components/common/Loading";
import "../appointment/appointment.css";
import { useDispatch } from "react-redux";
import { setHeaderTitle } from "../../redux/actions/dashboardActions";
export default function PaymentHistory() {
  const [query, setQuery] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [cloneData, setCloneData] = useState(null);
  const [count, setCount] = useState(5);

  // setting Header title
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle("Payment History"));
    return () => {};
  }, []);

  const { data, isLoading } = useQuery(
    ["paymentHistory", count],
    getPaymentHistory
  );
  const queryData = data?.data;
  useEffect(() => {
    queryData && setPaymentDetails(queryData);
    queryData && setCloneData(queryData);
  }, [queryData]);

  // on search
  const onSearchChange = (value) => {
    const query = value;
    setQuery(query);
    const filterData = cloneData.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
    setPaymentDetails(filterData);
  };
  // on cancle search
  const onCancelSearch = () => {
    setPaymentDetails(cloneData);
  };
  return (
    <div className="contentRow">
      {isLoading && paymentDetails === null && <Loading />}
      {(!isLoading || paymentDetails) && (
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
                  <th>Name</th>
                  <th>Date</th>
                  <th>Fee</th>
                  <th>Medical Condition</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentDetails?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div>
                          <img
                            src={getImageUrl(item?.image?.url)}
                            className="nameImg"
                            alt="name"
                          ></img>
                          <span>{item.name}</span>
                        </div>
                      </td>

                      <td>{formatDate(parseISO(item.createdAt), "P")}</td>
                      <td>{item.fee}$</td>
                      <td>{item.condition}</td>
                      <td>{item.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {paymentDetails?.length === 0 && (
              <div className="centerFlex" style={{ height: "250px" }}>
                no , Payment Details find
              </div>
            )}
          </div>

          {paymentDetails && count <= paymentDetails?.length && (
            <button
              onClick={() => setCount((prev) => prev + 10)}
              className="primaryBtn"
            >
              See More
            </button>
          )}
          {paymentDetails && isLoading && (
            <button className="primaryBtn">Loading...</button>
          )}
        </>
      )}
    </div>
  );
}
