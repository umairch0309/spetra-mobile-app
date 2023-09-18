import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import Video from "twilio-video";
import API from "../../../config/AxiosBase";
import { headers } from "../../../helpers/helpers";
import Room from "./Room";
import history from "../../../helpers/history";
import Loading from "../../../components/common/Loading";
import "./video.css";

const VideoChat = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const queryUrl = new URLSearchParams(useLocation().search);
  const roomId = queryUrl.get("roomId");
  const userName = queryUrl.get("name");
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const connectVideo = async () => {
      setConnecting(true);
      try {
        headers();
        const response = await API.post("/videoChat/video/token", {
          name: userName,
          bookingId: roomId,
        });
        Video.connect(response.data.token, { name: roomId }).then((room) => {
          setConnecting(false);
          setRoom(room);
        });
      } catch (error) {
        console.error(error);
        setConnecting(false);
      }
    };

    connectVideo();
  }, [roomId, userName]);

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();

        history.push(
          role === "doctor"
            ? "/dashboard/consulation"
            : `/dashboard/consulation?review=true&&bookingId=${roomId}`
        );
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  let render;
  if (room) {
    render = (
      <Room
        userId={userName}
        roomName={roomId}
        room={room}
        handleLogout={handleLogout}
        role={role}
      />
    );
  } else {
    render = <Loading />;
  }
  return render;
};

export default VideoChat;
