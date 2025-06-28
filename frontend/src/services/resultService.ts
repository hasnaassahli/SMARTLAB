import axios from "axios";

const API_URL = "http://localhost:5000/api/results";

export const getResults = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addResult = async (result: { sampleCode: string; value: string }) => {
  const res = await axios.post(API_URL, result);
  return res.data;
};

export const updateResult = async (id: string, result: { sampleCode: string; value: string }) => {
  const res = await axios.put(`${API_URL}/${id}`, result);
  return res.data;
};

export const deleteResult = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
