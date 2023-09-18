import React from "react";
import { useQuery } from "react-query";
import { getAllSpecialties } from "../../../services/web";
import Loading from "../../../components/common/Loading";
import AppWrapper from "../../../components/web/wrapper/AppWrapper";
import history from "../../../helpers/history";
import "../landingPage/landingPage.css";
export default function Specialities() {
  const { data, isLoading } = useQuery("specialities", getAllSpecialties);
  const dataArr = data?.data?.data;
  return (
    <AppWrapper>
      <div className="headerPadding">
        <div className="basicRow medicalSpec">
          {isLoading && <Loading height="400px" />}
          {isLoading || (
            <>
              <div className="itemFlex">
                {dataArr?.map((item) => {
                  return (
                    <div key={item._id} className="item">
                      <div className="circle">
                        <img
                          src={item.image?.url}
                          className="img"
                          alt="item"
                        ></img>
                      </div>
                      <div
                        onClick={() => {
                          history.push(`/search?keywordOne=${item.name}`);
                        }}
                        className="title pointer"
                      >
                        {item.name}
                      </div>
                      <div className="text">{item.description}</div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="footerPadding"></div>
      </div>
    </AppWrapper>
  );
}
