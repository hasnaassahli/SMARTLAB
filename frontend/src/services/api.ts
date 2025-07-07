import axios from "axios";

const api = axios.create({
  baseURL: "/api", // base URL pour toutes les requêtes
  headers: {
    "Content-Type": "application/json",
  },
});

// Rendez-vous
export const createAppointment = async (data: {
  patientName: string;
  phone: string;
  date: string;
  time: string;
}) => {
  const res = await axios.post("/appointments", data);
  return res.data;
};




// Ajouter un interceptor pour ajouter automatiquement le token d'auth si existant
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
