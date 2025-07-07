import React, { useEffect, useState } from "react";
import { getSamples, updateSampleResult } from "../services/technicianService";

const Technicians: React.FC = () => {
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    const fetchSamples = async () => {
      const data = await getSamples();
      setSamples(data);
    };
    fetchSamples();
  }, []);

  // fonction qui utilise updateSampleResult par exemple
  const handleUpdate = async (id: string, result: string) => {
    await updateSampleResult(id, result);
    // rafraîchir la liste par ex.
    const data = await getSamples();
    setSamples(data);
  };

  return (
    <div>
      {/* Affiche ta liste d'échantillons */}
    </div>
  );
};

export default Technicians;
