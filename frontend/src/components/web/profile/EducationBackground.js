import React from "react";

export default function EducationBackground({ data }) {
  return (
    <div className="educationSec w-100">
      <div className="secTitle text-center">Education and background</div>

      <div className="flexBetweenCenter eduFlex">
        <div className="eduCard">
          <div className="title">Specialties</div>
          <div className="text">{data?.speciality?.name}</div>

          <img src="/images/medal.svg" className="img"></img>
        </div>
        <div className="eduCard">
          <div className="title">Practice names</div>
          {data?.practices?.map((item) => (
            <div className="text">{item}</div>
          ))}

          <img src="/images/practice.svg" className="img"></img>
        </div>
        <div className="eduCard">
          <div className="title">Hospital affiliations</div>
          {data?.hospital?.map((item) => (
            <div className="text">{item}</div>
          ))}

          <img src="/images/hospitalEdu.svg" className="img"></img>
        </div>
        <div className="eduCard">
          <div className="title">Experince</div>
          {`${data?.experince} Years`}
          <img src="/images/quality.svg" className="img"></img>
        </div>
      </div>

      <div className="eduAndTrain educationBg">
        <div className="centerDiv">
          <div className="flexCenter">
            <img src="/images/eduCap.svg" alt="edu"></img>
            <span className="title mb-0 ml-2">Education and training</span>
          </div>
        </div>
        {data?.education?.map((item) => (
          <div className="text text-center">{item}</div>
        ))}
      </div>
      <div className="flexBetweenCenter mt-3">
        <div className="eduCard eduCard2">
          <div className="title">Languages spoken</div>
          {data?.languages?.map((item) => (
            <div className="text">{item.name}</div>
          ))}

          <img src="/images/language.svg" className="img"></img>
        </div>
        <div className="eduCard eduCard2">
          <div className="title">NPI number</div>

          <div className="text">{data?.contactNo}</div>

          <img src="/images/eduNumber.svg" className="img"></img>
        </div>
      </div>
    </div>
  );
}
