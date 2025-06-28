import axios from "axios";

const API_URL = "http://localhost:5000/api/patients";

export const getPatients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addPatient = async (patient: { name: string; age: string }) => {
  const response = await axios.post(API_URL, patient);
  return response.data;
};

export const updatePatient = async (id: string, patient: { name: string; age: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, patient);
  return response.data;
};

export const deletePatient = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
