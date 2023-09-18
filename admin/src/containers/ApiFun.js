import AxiosBase from "../config/AxiosBase";

const token = localStorage.adminToken;
const headerToken = {
  headers: {
    "x-access-token": token,
  },
};

// dashboard api
export const getDashboardCounts = () => {
  return AxiosBase.get(`/admin/counts`, headerToken);
};

// patient api
export const getPatients = () => {
  return AxiosBase.get(`/admin/all-patients`, headerToken);
};

export const deactiveUser = ({ status, id }) => {
  return AxiosBase.put(`/admin/deactive-user/${id}`, { status }, headerToken);
};

// doctor api
export const activeDoctors = () => {
  return AxiosBase.get(`/admin/active-doctors`, headerToken);
};
export const pendingDoctors = () => {
  return AxiosBase.get(`/admin/pending-doctors`, headerToken);
};
export const declinedDoctors = () => {
  return AxiosBase.get(`/admin/declined-doctors`, headerToken);
};

// doctor form
export const approveDocForm = (docformId) => {
  console.log(docformId);
  return AxiosBase.put(`/admin/approve-doc-form/${docformId}`, {}, headerToken);
};
export const declineDocForm = (docformId) => {
  console.log(docformId);
  return AxiosBase.put(`/admin/decline-doc-form/${docformId}`, {}, headerToken);
};

// insurance

export const verifiedInsurance = () => {
  return AxiosBase.get(`/insurance/form?status=accepted`, headerToken);
};
export const pendingInsurance = () => {
  return AxiosBase.get(`/insurance/form?status=pending`, headerToken);
};
export const rejectedInsurance = () => {
  return AxiosBase.get(`/insurance/form?status=rejected`, headerToken);
};
export const updateInsurance = ({ id, status }) => {
  return AxiosBase.put(`/insurance/form/${id}`, { status }, headerToken);
};

// speciality api
export const getAllSpecialities = () => {
  return AxiosBase.get(`/admin/all-speciality`, headerToken);
};
export const addNewSpeciality = ({ formData }) => {
  return AxiosBase.post(`/admin/new-speciality`, formData, headerToken);
};
export const deleteSpeciality = (specialityId) => {
  return AxiosBase.delete(
    `/admin/delete-speciality/${specialityId}`,
    headerToken
  );
};
export const updateSpeciality = ({ data, id }) => {
  return AxiosBase.put(`/admin/update-speciality/${id}`, data, headerToken);
};

// language api
export const getAllLanguages = () => {
  return AxiosBase.get(`/admin/all-languages`, headerToken);
};
export const addNewLanguage = (name) => {
  return AxiosBase.post(`/admin/new-language`, name, headerToken);
};
export const deleteLanguage = (languageId) => {
  console.log(languageId);
  return AxiosBase.delete(`/admin/delete-language/${languageId}`, headerToken);
};

// setting
export const updatePassword = (data) => {
  return AxiosBase.post(`/admin/update-password`, data, headerToken);
};

export const allConsultations = () => {
  return AxiosBase.get(`/admin/all-consultations`, headerToken);
};

export const allAppointments = () => {
  return AxiosBase.get(`/admin/all-appointments`, headerToken);
};

// social
export const updateSocial = (data) => {
  return AxiosBase.post(`/admin/update-social-links`, data, headerToken);
};
export const getSocial = () => {
  return AxiosBase.get(`/admin/get-social-links`, headerToken);
};
