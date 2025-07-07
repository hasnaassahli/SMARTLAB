const API_URL = "http://localhost:5000/api/samples";

export const getSamples = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erreur lors du chargement des échantillons");
  return await res.json();
};

export const addSample = async (sample: { code: string; description: string }) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sample),
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout de l'échantillon");
};

export const updateSample = async (id: string, sample: { code: string; description: string }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sample),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour de l'échantillon");
};

export const deleteSample = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression de l'échantillon");
};
