import React, { useEffect, useRef, useState } from "react";
import { ArrowBack } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { profileImageURL } from "../../helpers/helpers";
import { defalutProfile } from "../../assets";
import MessageDiv from "./MessageDiv";
import AxiosBase from "../../config/AxiosBase";

export default function MessageSec({ active, back, client }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const event = new Event("unMount");
  const channelRef = useRef(null);
  const [typing, setTyping] = useState(false);
  const [fileMessage, setFileMessage] = useState(null);

  const room = active?._id;
  const messageEndRef = useRef();
  // getting user
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const currentUserProfile =
    (user?.image?.url !== "None" && profileImageURL + user?.image?.url) ||
    defalutProfile;

  const otherUserProfile =
    (active?.image?.url !== "None" && profileImageURL + active?.image?.url) ||
    defalutProfile;

  // create channle  if not or join
  const joinChannel = async (chatClient) => {
    return new Promise((resolve, reject) => {
      chatClient
        .getSubscribedChannels()
        .then(() => {
          chatClient
            .getChannelByUniqueName(room)
            .then(async (channel) => {
              channelRef.current = channel;

              channel
                .join()
                .then(async () => {
                  const previousMessages = await channel.getMessages();

                  setMessages(previousMessages?.items);
                  scrollToBottom();

                  window.addEventListener("beforeunload", () =>
                    channel.leave()
                  );
                  window.addEventListener(
                    "unMount",
                    () => {
                      try {
                        channel.leave();
                      } catch (error) {
                        console.log(error);
                      }
                    },
                    false
                  );
                })
                .catch((error) => {
                  console.log(error);
                  console.log("Could not join channel.");
                });
              resolve(channel);
            })
            .catch(() => createNewChannel(chatClient));
        })
        .catch(() => console.log("Could not get channel list."));
    });
  };

  // join channel
  const createNewChannel = async (chatClient) => {
    return new Promise((resolve, reject) => {
      chatClient
        .createChannel({ uniqueName: room, friendlyName: room })
        .then(() => joinChannel(chatClient))
        .then(configureChannelEvents)
        .catch(() => console.log("Could not create new channel"));
    });
  };

  const handleMessageAdded = (message) => {
    setMessages((prev) => [...prev, message]);
    scrollToBottom();
  };

  const configureChannelEvents = (channel) => {
    channel.on("messageAdded", (message) => {
      handleMessageAdded(message);
    });
    // Listen for members typing
    channel.on("typingStarted", function () {
      setTyping(true);
      scrollToBottom();
    });
    // Listen for members typing
    channel.on("typingEnded", function () {
      setTyping(false);
    });
  };

  // initiallize
  useEffect(() => {
    if (client) {
      joinChannel(client)
        .then(configureChannelEvents)
        .catch((error) => {
          console.log(error.message);
        });

      return () => {
        channelRef.current?.leave();
        window.dispatchEvent(event);
        setMessages([]);
      };
    }
  }, [active, client]);

  // scroll to bottom
  const scrollToBottom = () => {
    const doc = document.getElementById("messageEndRef");
    messageEndRef
      ? messageEndRef.current?.scrollIntoView()
      : doc?.scrollIntoView();
  };

  // send a message to convo
  const onMessageSend = async (e) => {
    e.preventDefault();
    if (!messageText && !fileMessage) return;
    const formData = new FormData();
    if (fileMessage !== null) {
      formData.append("file", fileMessage);
    }
    try {
      if (channelRef.current) {
        channelRef.current.sendMessage(
          fileMessage !== null ? formData : messageText
        );
        await AxiosBase.put(`/chat/chat-room/${room}`, { new: [userId] });
      }
      setMessageText("");
      setFileMessage(null);
      scrollToBottom();
    } catch (error) {
      console.log(error);
    }
  };
  // main return
  return (
    <>
      <div className="messageSec">
        <div className="flexBetweenCenter header">
          <div className="flexCenter">
            <ArrowBack onClick={back} className="d-md-none pointer" />
            <div className="userItem" style={{ height: "100%", padding: "0" }}>
              <img src={otherUserProfile} className="profileImg"></img>
              <div>
                <div className="name">{active?.name}</div>
                <div className="text textBlue">{active?.patCondition}</div>
              </div>
            </div>
          </div>
          <div className="moreIconDiv">
            <img
              src="/images/moreIcon.png"
              className="moreIcon pointer"
              style={{ width: "4px" }}
              alt="Icon "
            ></img>
          </div>
        </div>
        <div className="innerMessageSec">
          {messages?.map((item) => {
            return (
              <MessageDiv
                message={item}
                userId={userId}
                userProfile={currentUserProfile}
                otherProfile={otherUserProfile}
                key={item?._id}
              />
            );
          })}
          {typing && (
            <div className="messageDiv">
              <img src={otherUserProfile} className="msgImg"></img>
              <div className="messageText" style={{ width: "fit-content" }}>
                Typing ...
              </div>
            </div>
          )}
          <div id="messageEndRef" ref={messageEndRef}></div>
        </div>
        <div className="bottomSec">
          <div className="sendDiv">
            <div className="choose_file">
              <div className="attachmentDiv">
                <img
                  className="attachmentIcon pointer"
                  src="/images/attach.svg"
                  style={{ width: "100%" }}
                  alt="icon"
                ></img>
              </div>
              <input
                onChange={(e) => setFileMessage(e.target.files[0])}
                type="file"
                onKeyUp={(e) => e.key === "Enter" && onMessageSend(e)}
              />
            </div>
            {fileMessage === null ? (
              <input
                onChange={(e) => {
                  setMessageText(e.target.value);
                  channelRef.current.typing();
                }}
                value={messageText}
                className="sendInput"
                placeholder="Type your question here…"
                onKeyUp={(e) => e.key === "Enter" && onMessageSend(e)}
              ></input>
            ) : (
              <div className="fileInputDiv">
                <span> {fileMessage?.name}</span>
                <IconButton onClick={() => setFileMessage(null)}>
                  <Close></Close>
                </IconButton>
              </div>
            )}
            <div onClick={onMessageSend} className="sendIconDiv">
              <img
                className="sendIcon pointer"
                src="/images/send.svg"
                style={{ width: "100%" }}
                alt="icon"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
