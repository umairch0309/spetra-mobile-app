import React from "react";
import { profileImageURL } from "../../helpers/helpers";
import { defalutProfile } from "../../assets";

export default function UserSec({ data, active, onCallback, userId }) {
  // main return
  return (
    <>
      {data.map((item, index) => {
        return (
          <UserItem
            {...item}
            active={active}
            userId={userId}
            onCallback={onCallback}
            key={index}
          />
        );
      })}
    </>
  );
}

const UserItem = ({
  new: New,
  name,
  patCondition,
  image,
  _id,
  active,
  onCallback,
  userId,
}) => {
  return (
    <div
      onClick={() => onCallback({ name, patCondition, image, _id })}
      className={_id === active?._id ? "userItem userItemActive" : "userItem"}
    >
      {New?.includes(userId) === true || <div className="new"></div>}
      <img
        src={
          (image?.url !== "None" && profileImageURL + image?.url) ||
          defalutProfile
        }
        className="profileImg"
      ></img>
      <div>
        <div className="name">{name}</div>
        <div className="text textBlue">{patCondition}</div>
      </div>
    </div>
  );
};
