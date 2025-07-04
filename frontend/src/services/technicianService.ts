import api from "./api";

export const getTechnicians = () => api.get("/technicians");
export const getTechnicianById = (id: string) => api.get(`/technicians/${id}`);
export const createTechnician = (data: any) => api.post("/technicians", data);
export const updateTechnician = (id: string, data: any) => api.put(`/technicians/${id}`, data);
export const deleteTechnician = (id: string) => api.delete(`/technicians/${id}`);
