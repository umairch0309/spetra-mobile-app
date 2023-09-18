import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import API from "../../config/AxiosBase";
import { headers } from "../../helpers/helpers";

export default function GetAllLanguages() {
  const getData = () => {
    headers();
    return API.get("/admin/all-languages");
  };
  const { data } = useQuery("languages", getData);

  useEffect(() => {
    data?.data && setOptionData(data.data.data);
    return () => {};
  }, [data]);

  const setOptionData = (mainData) => {
    // let newOptions = mainData.reduce((acc, curr, index) => {
    //   return [...acc, { code: curr.name, text: curr.name }];
    // }, []);
    // setoptions(newOptions);
    setoptions(mainData);
  };
  const [options, setoptions] = useState([]);
  return options;
}
