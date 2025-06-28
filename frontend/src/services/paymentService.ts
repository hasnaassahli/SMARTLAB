import axios from "axios";

const API_URL = "http://localhost:5000/api/payments";

export const getPayments = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addPayment = async (payment: { patientName: string; amount: string }) => {
  const res = await axios.post(API_URL, payment);
  return res.data;
};

export const updatePayment = async (id: string, payment: { patientName: string; amount: string }) => {
  const res = await axios.put(`${API_URL}/${id}`, payment);
  return res.data;
};

export const deletePayment = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
