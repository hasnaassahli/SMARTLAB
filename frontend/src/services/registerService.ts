import axios from "axios";

// Définir l'URL de base pour axios si ce n'est pas déjà fait
axios.defaults.baseURL = "http://localhost:5000/api"; // à adapter selon ton backend

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>("/auth/login", data);
  return res.data;
};
