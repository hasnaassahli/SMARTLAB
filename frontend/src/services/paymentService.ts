const API_URL = "http://localhost:5000/api/payments";

export const getPayments = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erreur lors du chargement des paiements");
  return await res.json();
};

export const addPayment = async (payment: { patientName: string; amount: string }) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment),
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout du paiement");
};

export const updatePayment = async (id: string, payment: { patientName: string; amount: string }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour du paiement");
};

export const deletePayment = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression du paiement");
};
