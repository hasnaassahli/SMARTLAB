import axios from "axios";

const API_URL = "http://localhost:5000/api/technicians";

export const getTechnicians = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addTechnician = async (tech: { name: string; specialty: string }) => {
  const res = await axios.post(API_URL, tech);
  return res.data;
};

export const updateTechnician = async (id: string, tech: { name: string; specialty: string }) => {
  const res = await axios.put(`${API_URL}/${id}`, tech);
  return res.data;
};

export const deleteTechnician = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
