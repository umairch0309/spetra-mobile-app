import React from "react";

const MessageDiv = ({ userId, message, userProfile, otherProfile }) => {
  const { author, body, type } = message?.state;
  const messageOwn = author === userId;

  const renderMessageOnType = () => {
    switch (type) {
      case "text":
        return <MessageText />;
      case "media":
        return <MessageMedia />;

      default:
        return <MessageText />;
    }
  };

  const MessageText = () => {
    return (
      <div className={messageOwn ? "messageDiv myMessage" : "messageDiv "}>
        <img
          src={messageOwn ? userProfile : otherProfile}
          className="msgImg"
        ></img>
        <div className="messageText">{body}</div>
      </div>
    );
  };
  const MessageMedia = () => {
    const { media } = message.state;

    const getMediaContent = async () => {
      const mediaLink = await media.getContentTemporaryUrl();
      window.open(mediaLink);
    };
    return (
      <div className={messageOwn ? "messageDiv myMessage" : "messageDiv "}>
        <img
          src={messageOwn ? userProfile : otherProfile}
          className="msgImg"
        ></img>
        <div
          onClick={getMediaContent}
          className="messageText  pointer"
          style={{ textAlign: "center" }}
        >
          click to open file :{" "}
          <span style={{ fontFamily: "poppinsSb" }}>
            {media.state.filename}
          </span>
        </div>
      </div>
    );
  };
  return renderMessageOnType();
};

export default React.memo(MessageDiv);
