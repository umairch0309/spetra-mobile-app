import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import API from "../../config/AxiosBase";
import { headers } from "../../helpers/helpers";

export default function GetAllSpeciality() {
  const getData = () => {
    headers();
    return API.get("/admin/all-speciality");
  };
  const { data } = useQuery("speciality", getData);

  useEffect(() => {
    data?.data && setOptionData(data.data.data);
    return () => {};
  }, [data]);

  const setOptionData = (subjectData) => {
    setspecialityOption(subjectData);
  };
  const [specialityOption, setspecialityOption] = useState([]);
  return specialityOption;
}
