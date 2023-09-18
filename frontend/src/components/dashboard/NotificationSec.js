import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import useMarkSeenNotification from "../../hooks/mutation/useMarkSeenNotification";
import history from "../../helpers/history";
import {
  getNewNotification,
  markSeenAllNotification,
} from "../../services/panel";
import NotificationDiv from "../notification/NotificationDiv";

export default function NotificationSec() {
  const [notiData, setnotiData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const role = user?.role;
  const { data, isLoading } = useQuery("notification", getNewNotification);

  const deleteNotificationFun = useMarkSeenNotification(
    "notification",
    markSeenAllNotification
  );
  useEffect(() => {
    if (data) {
      if (data?.data?.length > 3) {
        const sliceArr = data?.data?.slice(0, 3);
        setnotiData(sliceArr);
      } else setnotiData(data?.data);
    }
    return () => {};
  }, [data]);

  const clearAll = () => {
    setnotiData([]);
    deleteNotificationFun.mutate();
  };
  return (
    <div className="secDiv notificationSec">
      {isLoading || (
        <div className="mainFlex">
          <div className="flexBetweenCenter">
            <div className="secTitle mb-1">Don’t Forget</div>
            {notiData?.length > 0 && (
              <div onClick={clearAll} className="clearText">
                Clear
              </div>
            )}
          </div>
          {notiData?.length <= 0 ? (
            <div className="textColor2 text-center mt-2">
              No new notifications to note
            </div>
          ) : (
            notiData?.map((item) => {
              return (
                <NotificationDiv
                  item={item}
                  userId={userId}
                  key={item._id}
                  role={role}
                />
              );
            })
          )}

          {notiData.length > 0 && (
            <div className="centerDiv " style={{ borderRadius: "2rem" }}>
              <div
                onClick={() => history.push("/dashboard/notification")}
                className="textBlue pointer poppinsSb mt-4"
              >
                View all
              </div>
            </div>
          )}
        </div>
      )}
      <img
        src="/images/notiBg.png"
        className="imgBg d-none d-md-block"
        alt="noti"
      ></img>
    </div>
  );
}
