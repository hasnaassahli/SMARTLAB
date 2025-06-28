import axios from "axios";

const API_URL = "http://localhost:5000/api/samples";

export const getSamples = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addSample = async (sample: { code: string; description: string }) => {
  const res = await axios.post(API_URL, sample);
  return res.data;
};

export const updateSample = async (id: string, sample: { code: string; description: string }) => {
  const res = await axios.put(`${API_URL}/${id}`, sample);
  return res.data;
};

export const deleteSample = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
