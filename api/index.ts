import api from "./api";

export default {
  getMangas: async () => {
    return await api.get(`/mangas`);
  },

  getMangaChapters: async (mangaSlug: string) => {
    return await api.post(`/manga-chapters`, { mangaSlug });
  },

  getChapterPages: async (mangaSlug: string, chapterSlug: string) => {
    return await api.post(`/chapter-images`, { mangaSlug, chapterSlug });
  }
};
