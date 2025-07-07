const API_URL = "http://localhost:5000/api/auth";

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur de connexion");
  }

  const data = await res.json();
  // Par exemple, stocker token dans localStorage
  localStorage.setItem("token", data.token);
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  // Extrait info utilisateur à partir du token ou d'une autre source
};
