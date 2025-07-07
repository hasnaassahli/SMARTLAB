// src/services/patientService.ts
const API_URL = "http://localhost:5000/api/patients";

export const getPatients = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addPatient = async (patient: { name: string; age: string }) => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
};

export const updatePatient = async (id: string, patient: { name: string; age: string }) => {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
};

export const deletePatient = async (id: string) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
