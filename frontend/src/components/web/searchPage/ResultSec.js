import React, { useEffect } from "react";
import SearchDoctorCard from "./SearchDoctorCard";

export default function ResultSec({ data, keywordTwo, keywordOne, userCity }) {
  return (
    <div className="resultSec">
      {data?.length > 0 && (
        <div className="pageTitle">
          {data?.length} {keywordOne && `Best ${keywordOne}`} Specialists{" "}
          {keywordTwo || `in ${userCity}`}
        </div>
      )}
      {data?.map((item) => {
        return <SearchDoctorCard data={item} key={item._id} />;
      })}
    </div>
  );
}
