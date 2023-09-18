import React from "react";
import { useQuery } from "react-query";
import Loading from "../../common/Loading";
import history from "../../../helpers/history";
import { getFeaturedSpecialties } from "../../../services/web";
import { profileImageURL } from "../../../helpers/helpers";

export default function MedicalSpecialities() {
  // fetching data
  const { data, isLoading } = useQuery(
    "featuredSpecialites",
    getFeaturedSpecialties
  );

  const dataArr = data?.data?.data;

  // main return
  return (
    <div>
      <div className="basicLandingRow medicalSpec">
        <div className="flexBetweenCenter">
          <div className="basicLandingTitle mb-0">Medical Specialties</div>
          {isLoading || (
            <button
              onClick={() => {
                history.push(`/specialties`);
              }}
              className="primaryBtn seeAllBtn d-none d-md-inline"
            >
              See all specialties
            </button>
          )}
        </div>
        {isLoading && <Loading height="400px" />}
        {isLoading || (
          <>
            <div className="itemFlex">
              {dataArr?.map((item) => {
                return (
                  <div key={item._id} className="item">
                    <div className="circle">
                      <img
                        src={profileImageURL + item.image?.url}
                        className="img"
                        alt="item"
                      ></img>
                    </div>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
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
            <div className="centerDiv mb-5">
              <button className="primaryBtn seeAllBtn d-inline d-md-none">
                See all specialties
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
