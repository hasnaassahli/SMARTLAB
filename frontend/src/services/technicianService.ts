import axios from "axios";

const BASE_URL = "http://localhost:5000/api/samples";

export const getSamples = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des échantillons :", error);
    throw error;
  }
};

export const updateSampleResult = async (
  id: string,
  result: string,
  status: string = "terminé"
) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, { result, status });
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du résultat :", error);
    throw error;
  }
};
