import api from "./api";

export const getResults = () => api.get("/results");
export const getResultById = (id: string) => api.get(`/results/${id}`);
export const createResult = (data: any) => api.post("/results", data);
export const updateResult = (id: string, data: any) => api.put(`/results/${id}`, data);
export const deleteResult = (id: string) => api.delete(`/results/${id}`);
export const addResult = (data: any) => api.post("/results", data)
;