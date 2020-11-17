import api from "./api";

export default {
  getMangas: async () => {
    return await api.get(`/mangas`);
  },

  searchManga: async (searchQuery: string) => {
    return await api.post(`/search?query=${searchQuery}`);
  },

  getMangaChapters: async (mangaSlug: string) => {
    return await api.post(`/manga-chapters`, { mangaSlug });
  },

  getChapterPages: async (mangaSlug: string, chapterSlug: string) => {
    return await api.post(`/chapter-images`, { mangaSlug, chapterSlug });
  }
};
