import React from "react";
import { useQuery } from "react-query";
import { getAllSpecialties } from "../../../../Api/Cloud-Doc";
import AppWrapper from "../../../../components/CloudDoc/AppWrapper";
import LoadingDash from "../../../../components/common/LoadingDash";
import history from "../../../../utils/history";

export default function AllSpecialitiesPage() {
  const { data, isLoading } = useQuery(
    "allDataSpecialities",
    getAllSpecialties
  );
  const dataArr = data?.data?.data;
  return (
    <AppWrapper>
      <div className="headerPadding">
        <div className="basicRow medicalSpec">
          {isLoading && <LoadingDash height="400px" />}
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
