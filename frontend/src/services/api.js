import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4040/api'
});

export default {
  getLevels: () => api.get('/levels'),
  createLevel: (level) => api.post('/levels', level),
  updateLevel: (id, level) => api.put(`/levels/${id}`, level),
  deleteLevel: (id) => api.delete(`/levels/${id}`),

  getDevelopers: () => api.get('/developers'),
  createDeveloper: (developer) => api.post('/developers', developer),
  updateDeveloper: (id, developer) => api.put(`/developers/${id}`, developer),
  deleteDeveloper: (id) => api.delete(`/developers/${id}`)
};
