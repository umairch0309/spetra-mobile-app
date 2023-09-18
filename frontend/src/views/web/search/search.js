import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getIpLookup } from "../../../services/web";
import AppWrapper from "../../../components/web/wrapper/AppWrapper";
import Loading from "../../../components/common/Loading";
import API from "../../../config/AxiosBase";
import SearchComponent from "../../../components/web/landingPage/SearchComponent";
import ResultSec from "../../../components/web/searchPage/ResultSec";
import SearchFilter from "../../../components/web/searchPage/SearchFilter";
import "./search.css";
export default function SearchPage() {
  // search states
  const [keywordOne, setKeywordOne] = useState("");
  const [profiles, setProfiles] = useState(null);
  const [keywordTwo, setKeywordTwo] = useState("");
  const [count, setCount] = useState(5);

  // callaback states
  const [availability, setAvailability] = useState(null);
  const [provideVideo, setProvideVideo] = useState(null);
  // get search profile
  const getSearchProfile = () => {
    return API.get(
      `/docprofile/alldocs?keywordOne=${keywordOne}&&keywordTwo=${keywordTwo}&&availability=${availability}&&provideVideo=${provideVideo}&&count=${count}`
    );
  };

  const { data: ipLookupData } = useQuery("IpLookup", getIpLookup, {
    staleTime: 100 * 60,
  });
  const userCity = ipLookupData?.data?.city;
  const { data, isLoading } = useQuery(
    ["docSearch", keywordOne, keywordTwo, count, availability, provideVideo],
    getSearchProfile,
    { staleTime: 3000, refetchOnMount: true }
  );
  useEffect(() => {
    data?.data && setProfiles(data?.data?.data);
  }, [data]);

  // search callback
  const searchCallback = (keywordOne, keywordTwo) => {
    setKeywordOne(keywordOne);
    setKeywordTwo(keywordTwo);
  };

  // filterCallback
  const filterCallback = (availability, provideVideo) => {
    setAvailability(availability);
    setProvideVideo(provideVideo);
  };

  // setting previous data to null
  useEffect(() => {
    profiles && setProfiles(null);
  }, [keywordOne, keywordTwo, availability, provideVideo]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // main return
  return (
    <AppWrapper>
      <div className="headerPadding">
        <div className="basicRow">
          <SearchComponent
            callback={searchCallback}
            mainStyle={{ height: "50px", marginTop: "0" }}
          />
          <SearchFilter filterCallback={filterCallback} />
          {isLoading && <Loading />}
          {(isLoading && profiles === null) || (
            <ResultSec
              userCity={userCity}
              keywordTwo={keywordTwo}
              keywordOne={keywordOne}
              data={profiles}
            />
          )}
          {isLoading ||
            (profiles?.length === 0 && (
              <div className="centerFlex basicText" style={{ height: "30vh" }}>
                {" "}
                oops , no doctor{" "}
              </div>
            ))}

          {isLoading ||
            (profiles?.length > 0 && count <= profiles?.length && (
              <>
                <div className=" text-center my-5">
                  <button
                    disabled={isLoading}
                    onClick={() => setCount(count + 5)}
                    className="primaryDashboardBtn"
                    style={{ width: "200px" }}
                  >
                    Load more doctors
                  </button>
                </div>
              </>
            ))}
          {isLoading && profiles !== null && count <= profiles?.length && (
            <>
              <Loading height="10vh" />
            </>
          )}
        </div>
        <div className="footerPadding"></div>
      </div>
    </AppWrapper>
  );
}
