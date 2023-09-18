import React from "react";
import { useQuery } from "react-query";
import BookingDiv from "../../../components/web/profile/BookingDiv";
import PatientReviewSec from "../../../components/web/profile/PatientReview";
import ProfileDetaiDiv from "../../../components/web/profile/ProfileDetaiDiv";
import AboutDetails from "../../../components/web/profile/AboutDetails";
import EducationBackground from "../../../components/web/profile/EducationBackground";
import FaqSec from "../../../components/web/profile/FaqSec";
import AppWrapper from "../../../components/web/wrapper/AppWrapper";
import API from "../../../config/AxiosBase";
import Loading from "../../../components/common/Loading";
import "./profilePage.css";
export default function ProfilePage(props) {
  // getting profile id
  const profileId = props.match.params.profileId;
  const getSingleProfile = () => {
    return API.get(`/docprofile/${profileId}`);
  };

  // fetching data
  const { data, isLoading } = useQuery(
    ["docProfile", profileId],
    getSingleProfile
  );
  const profileData = data?.data?.data;
  const doctorId = profileData?.userId;
  const getAllReviews = () => {
    return API.get(`/docprofile/get-reviews/${doctorId}`);
  };
  const { data: reviewsData, isLoading: reviewLoading } = useQuery(
    ["docReviews", doctorId],
    getAllReviews,
    { enabled: doctorId !== undefined }
  );
  const reviews = reviewsData?.data;

  // main return
  return (
    <AppWrapper>
      <div className="headerPadding">
        <div className="container-fluid px-0">
          {isLoading && <Loading />}
          {isLoading || (
            <div className="row basicRow  px-2 profileSec">
              <ProfileDetaiDiv data={profileData} reviewsData={reviews} />
              <div className="col-md-4 px-0">
                <BookingDiv data={profileData} />
              </div>
              <AboutDetails data={profileData} />
              <EducationBackground data={profileData} />
              {reviewLoading ||
                (reviews?.length > 0 && <PatientReviewSec data={reviews} />)}
              <FaqSec data={profileData} />
            </div>
          )}
        </div>
      </div>
    </AppWrapper>
  );
}
