import React, { useState, useEffect, useRef } from "react";
import MessageSec from "../../components/chat/MessageSec";
import UserSec from "../../components/chat/UserSec";
import { headers } from "../../helpers/helpers";
import API from "../../config/AxiosBase";
import Loading from "../../components/common/Loading";
import { getChatToken } from "../../services/panel";
import "./message.css";
import { setHeaderTitle } from "../../redux/actions/dashboardActions";
import { useDispatch, useSelector } from "react-redux";
import AxiosBase from "../../config/AxiosBase";
const TwilioChat = require("twilio-chat");

export default function MessagingPage() {
  // data states
  const [active, setActive] = useState(null);
  const [userData, setUserData] = useState([]);
  const [cloneData, setCloneData] = useState([]);
  const [query, setQuery] = useState("");

  // client ref
  const client = useRef(null);
  // helping states
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  // one-time executes to fetch data

  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  // setting Header title
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle("Messaging"));
    return () => {};
  }, []);

  let token;

  const createChatClient = async () => {
    token = await getChatToken();
    setUsername(token.identity);
    client.current = await TwilioChat.Client.create(token.token);
    setLoading(false);
  };

  useEffect(() => {
    // getting chat rooms
    const getChatRooms = async () => {
      setLoading(true);
      try {
        headers();
        const conversations = await API.get("/chat/get-chat-rooms");
        setUserData(conversations.data);
        setCloneData(conversations.data);
        conversations.data.length > 0 && setActive(conversations?.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    // calling functions
    createChatClient();
    getChatRooms();

    return () => {};
  }, []);

  useEffect(() => {
    if (active) {
      if (!active.new?.includes(userId)) {
        const updatededChatRoom = userData.filter((el) => {
          if (el._id === active._id) {
            el.new = [...el?.new, userId];
          }
          return el;
        });
        setUserData(updatededChatRoom);
        const updateChatRoom = async () => {
          try {
            await AxiosBase.put(`/chat/chat-room/${active?._id}`, {
              new: [...active.new, userId],
            });
          } catch (error) {
            console.log(error);
          }
        };
        updateChatRoom();
      }
    }
    return () => {};
  }, [active]);

  // on Search
  const onSearchChange = (e) => {
    const queryV = e.target.value;
    setQuery(queryV);
    const filterData = cloneData.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().indexOf(queryV.toLowerCase()) > -1
    );
    setUserData(filterData);
  };

  const RenderSearch = () => {
    return (
      <div className="searchBar">
        <input
          onChange={onSearchChange}
          placeholder="Seacrh"
          className="search"
          value={query}
          autoFocus={query !== ""}
        ></input>
        <div className="searchIconDiv">
          <img
            className="searchIcon w-100"
            src="/images/searchIcon.png"
            alt="search"
          ></img>
        </div>
      </div>
    );
  };

  // main return
  return (
    <div className="contentRow py-3">
      <div className="secDiv p-0 message">
        {loading && <Loading />}
        {loading || (
          <div className="mainFlex">
            <div className="userSec d-none d-md-block">
              <RenderSearch />

              <div className="overFlowAuto">
                <UserSec
                  userId={userId}
                  data={userData}
                  active={active}
                  onCallback={(v) => setActive(v)}
                />
              </div>
            </div>
            {active !== null || (
              <div className="userSec d-md-none">
                <RenderSearch />
                <div className="overFlowAuto">
                  <UserSec
                    userId={userId}
                    data={userData}
                    active={active}
                    onCallback={(v) => setActive(v)}
                  />
                </div>
              </div>
            )}
            {active !== null && (
              <MessageSec
                client={client.current}
                active={active}
                back={() => setActive(null)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
