import api from "./api";



export const getSamples = () => api.get("/samples");
export const getSampleById = (id: string) => api.get(`/samples/${id}`);
export const createSample = (data: any) => api.post("/samples", data);
export const updateSample = (id: string, data: any) => api.put(`/samples/${id}`, data);
export const deleteSample = (id: string) => api.delete(`/samples/${id}`);
export const addSample = (data: any) => api.post("/samples", data);
