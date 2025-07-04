import api from "./api";

export const getCashiers = () => api.get("/cashiers");
export const getCashierById = (id: string) => api.get(`/cashiers/${id}`);
export const createCashier = (data: any) => api.post("/cashiers", data);
export const updateCashier = (id: string, data: any) => api.put(`/cashiers/${id}`, data);
export const deleteCashier = (id: string) => api.delete(`/cashiers/${id}`);
