import React, { useState, useEffect, useRef } from "react";

const Participant = ({
  participant,
  isAudio = true,
  isVideo = true,
  localUser,
  isVoiceCall,
}) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [videoDisable, setVideoDisable] = useState(false);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  const trackSubscribed = (track) => {
    if (track.kind === "video") {
      setVideoTracks((videoTracks) => [...videoTracks, track]);
    } else if (track.kind === "audio") {
      setAudioTracks((audioTracks) => [...audioTracks, track]);
    }
  };

  const trackUnsubscribed = (track) => {
    if (track.kind === "video") {
      setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
    } else if (track.kind === "audio") {
      setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
    }
  };
  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.on("disabled", () => {
        setVideoDisable(true);
      });
      videoTrack.on("enabled", () => {
        setVideoDisable(false);
        videoTrack.attach(videoRef.current);
      });
      const isEnabled = videoTrack.isEnabled;
      if (isVideo) {
        if (!isEnabled) {
          try {
            videoTrack.enable();
          } catch (error) {
            console.log(error);
          }
        }
        videoTrack.attach(videoRef.current);
      } else {
        videoTrack.disable();
      }
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks, isVideo]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.on("disabled", () => {
        audioTrack.detach();
      });
      audioTrack.on("enabled", () => {
        audioTrack.attach(audioRef.current);
      });
      if (isAudio) {
        !audioTrack.isEnabled && audioTrack.enable();
        audioTrack.attach(audioRef.current);
      } else audioTrack.disable();
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks, isAudio]);

  // only for audio call page
  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (isVoiceCall && videoTrack) {
      try {
        videoTrack.disable();
        videoTrack.detach();
      } catch (error) {
        console.log(error);
      }
    }
    return () => {};
  }, []);

  // main return
  return (
    <>
      {localUser ? (
        <>
          {isVideo ? (
            <video ref={videoRef} autoPlay={true} />
          ) : (
            <div className="camOff centerFlex"> Cam off </div>
          )}
          <audio ref={audioRef} autoPlay={true} muted={!isAudio} />
        </>
      ) : (
        <>
          {videoDisable ? (
            <div className="title">Participant have turned off thier Cam</div>
          ) : (
            <>
              <video ref={videoRef} autoPlay={true} />
            </>
          )}
          <audio ref={audioRef} autoPlay={true} muted={false} />
        </>
      )}
    </>
  );
};

export default Participant;
