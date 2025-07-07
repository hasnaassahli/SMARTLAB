const API_URL = "http://localhost:5000/api/results";

export const getResults = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erreur lors du chargement des résultats");
  return await res.json();
};

export const addResult = async (result: { sampleCode: string; value: string }) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout du résultat");
};

export const updateResult = async (id: string, result: { sampleCode: string; value: string }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour du résultat");
};

export const deleteResult = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erreur lors de la suppression du résultat");
};
