import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const apiService = {
  getLevels: () => api.get('/levels'),
  createLevel: (levelData) => api.post('/levels', levelData),
  updateLevel: (id, level) => api.put(`/levels/${id}`, level),
  deleteLevel: (id) => api.delete(`/levels/${id}`),

  getDevelopers: () => api.get('/developers'),
  createDeveloper: (developer) => api.post('/developers', {
    name: developer.name,
    sex: developer.sex,
    birth_date: developer.birth_date,
    hobby: developer.hobby || null,
    level_id: developer.level_id
  }),

  updateDeveloper: (id, developer) => api.put(`/developers/${id}`, {
    name: developer.name,
    sex: developer.sex,
    birth_date: developer.birth_date,
    hobby: developer.hobby || null,
    level_id: developer.level_id
  }),

  deleteDeveloper: (id) => api.delete(`/developers/${id}`)
};

export default apiService;