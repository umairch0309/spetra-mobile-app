import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import history from "../../../config/history";

export default function DoctorDetails() {
  const propsData = useLocation().state;

  console.log(propsData);
  useEffect(() => {
    if (propsData === undefined) history.push("/admin/doctor/pending-doctor");
  }, []);
  return (
    <div className="bg-white textBlack p-3 ">
      <div className="textBlack">
        <h2 className="text-center py-3">Doctor Form Details</h2>
        <h4>Basic Infromation</h4>
        <br />
        <h5>Name</h5>
        <p>{propsData?.name}</p>
        <h5>Email</h5>
        <p>{propsData.email}</p>

        <h5>Phone no</h5>
        <p>{propsData.contactNo}</p>

        <h5>languages</h5>
        <p>
          {propsData.languages?.map((item) => {
            return <span key={item._id}>{item.name} ,</span>;
          })}
        </p>
        <h5>About Doctor</h5>
        <p>{propsData.aboutMe}</p>

        <h4>Education & background</h4>
        <br />
        <h5>Specialties </h5>
        <p>{propsData.speciality?.name}</p>

        <h5>Experince </h5>
        <p>{propsData.experince} years</p>
        <h5>Education & training</h5>
        <p>
          {propsData.education?.map((item) => {
            return <span key={item}>{item} ,</span>;
          })}
        </p>
        <h5>Practice names</h5>
        <p>
          {propsData.practices?.map((item) => {
            return <span key={item}>{item} ,</span>;
          })}
        </p>
        <h5>Hospital affiliations</h5>
        <p>
          {propsData.hospital?.map((item) => {
            return <span key={item}>{item} ,</span>;
          })}
        </p>
      </div>
    </div>
  );
}
