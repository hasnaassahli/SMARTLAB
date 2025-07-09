import api from './api';

export const submitAnalysis = (data: any) => api.post('/results', data);

export const getResults = () =>
  api.get('/results', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
