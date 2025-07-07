// src/services/cashierService.ts
import axios from "axios";

const API_URL = "/api/cashiers";

export const getCashiers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addCashier = async (cashier: { name: string; email: string }) => {
  const response = await axios.post(API_URL, cashier);
  return response.data;
};

export const updateCashier = async (id: string, cashier: { name: string; email: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, cashier);
  return response.data;
};

export const deleteCashier = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
