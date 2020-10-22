import api from "./api";

export default {
  getMangas: async () => {
    return await api.get(`/mangas`);
  },

  getMangaChapters: async (mangaId: string) => {
    return await api.get(`/manga-chapters/${mangaId}`);
  },

  getChapterPages: async (chapterId: string) => {
    return await api.post(`/chapter-images`, { body: { chapterId } });
  }
};
