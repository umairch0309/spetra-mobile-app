import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/common/Loading";
import NotificationDiv from "../../components/notification/NotificationDiv";
import { setHeaderTitle } from "../../redux/actions/dashboardActions";
import { getNotification } from "../../services/panel";

export default function AllNotificationsPage() {
  // fetching user data
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const role = user?.role;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle("Notification"));
    return () => {};
  }, []);

  const { data, isLoading } = useQuery(
    ["notification", role],
    getNotification,
    {
      enabled: role != undefined,
    }
  );

  const notiData = data?.data;

  //   main return
  return (
    <div className="contentRow">
      {isLoading && <Loading />}
      {isLoading || (
        <>
          <div
            className="bg-white p-2"
            style={{ minHeight: "50vh", borderRadius: "2rem" }}
          >
            {notiData?.length <= 0 ? (
              <div className="textColor2 text-center mt-5">
                No new notifications to note
              </div>
            ) : (
              notiData?.map((item) => {
                return (
                  <div className="mb-3">
                    <NotificationDiv
                      item={item}
                      userId={userId}
                      key={item._id}
                      role={role}
                    />
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}
