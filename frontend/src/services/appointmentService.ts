import api from './api';

export const createAppointment = (data: any) => api.post('/appointments', data);

export const getPendingAppointments = () => api.get('/appointments/pending');

export const validateAppointment = (id: string) => api.put(`/appointments/${id}/validate`);
