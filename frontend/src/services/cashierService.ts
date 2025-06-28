import axios from "axios";

const API_URL = "http://localhost:5000/api/cashiers";

export const getCashiers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addCashier = async (cashier: { name: string; email: string }) => {
  const res = await axios.post(API_URL, cashier);
  return res.data;
};

export const updateCashier = async (id: string, cashier: { name: string; email: string }) => {
  const res = await axios.put(`${API_URL}/${id}`, cashier);
  return res.data;
};

export const deleteCashier = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
