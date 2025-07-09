import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ViewResults: React.FC = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await api.get('/results', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setResults(res.data);
    };
    fetchResults();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Résultats des analyses</h2>
      <ul className="list-group">
        {results.map((result: any) => (
          <li key={result._id} className="list-group-item">
            <strong>Analyse :</strong> {result.analysis} <br />
            <strong>Résultat :</strong> {result.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewResults;
