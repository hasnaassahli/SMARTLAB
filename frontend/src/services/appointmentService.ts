import api from "./api";

export interface Appointment {
  _id?: string;
  patientName: string;
  date: string;
  reason: string;
}

export const getAppointments = () => api.get("/appointments");
export const createAppointment = (data: Appointment) => api.post("/appointments", data);
export const deleteAppointment = (id: string) => api.delete(`/appointments/${id}`);
export const updateAppointment = (id: string, data: Partial<Appointment>) => 
  api.put(`/appointments/${id}`, data);