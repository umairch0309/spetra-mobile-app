import React, { useState, useEffect } from "react";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import AppointmentCalender from "../../components/setting/AppointmentCalender";
import { headers } from "../../helpers/helpers";
import API from "../../config/AxiosBase";
import { getDocProfile } from "../../services/panel";
import Loading from "../../components/common/Loading";
import useProfileUpdate from "../../hooks/mutation/useProfileUpdate";
import { setHeaderTitle } from "../../redux/actions/dashboardActions";

export default function ConsulationSettingPage() {
  const [isVideo, setIsVideo] = useState(false);
  const [videoPrice, setVideoPrice] = useState("");

  // fetching profile
  const { data, isLoading } = useQuery("profile", getDocProfile);
  const profileData = data?.data?.data;
  const events = profileData?.videoTimeSlot || [];

  const updateValuePrice = () => {
    if (profileData?.videoPrice !== videoPrice) {
      profileUpdate.mutate({ videoPrice: videoPrice });
    }
  };
  // setting Header title
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle("Consultation Setting"));
    return () => {};
  }, []);

  // setting video status
  useEffect(() => {
    profileData && setIsVideo(profileData?.isVideo);
    profileData && setVideoPrice(profileData?.videoPrice);
    return () => {};
  }, [profileData]);

  // fatching user details
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  // update profile
  const updateProfileFun = (data) => {
    headers();
    return API.patch(`/docprofile/update/${userId}`, data);
  };
  // update profile
  const profileUpdate = useProfileUpdate("profile", updateProfileFun, false);
  // handle video change
  const handleVideoChange = (e, v) => {
    setIsVideo(v);
    profileUpdate.mutate({ isVideo: v });
  };
  // state
  return (
    <div className="contentRow schedulerPageWrapper">
      {isLoading && <Loading />}
      {isLoading || (
        <>
          <div className="secTitle">Set your Video Pricing & time slot</div>
          <FormControlLabel
            className="text"
            control={
              <Checkbox
                checked={isVideo}
                onChange={handleVideoChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Do you offer online video consultation for patients?"
          />
          {isVideo && (
            <>
              <br />
              <TextField
                margin="dense"
                style={{ height: 40, width: 200 }}
                label="Video Pricing"
                variant={"outlined"}
                className="textInput my-3"
                value={videoPrice}
                onBlur={updateValuePrice}
                InputProps={{
                  type: "number",
                  endAdornment: (
                    <InputAdornment position="end">$</InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setVideoPrice(e.target.value);
                }}
              />

              <div className="bg-white">
                <AppointmentCalender events={events} appointmentType="video" />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
