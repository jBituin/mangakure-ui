import api from './api';

export default {
  getMangas: async () => {
    return await api.get(`/mangas`);
  },
};
