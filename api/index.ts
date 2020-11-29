import api from "./api";
import queryBuilder from "../utils/queryParamsBuilder";

import { Params } from "../interfaces";

export default {
  getMangas: async ({ search, page }: Params) => {
    const query = queryBuilder({ search, page });
    return await api.post(`/mangas?${query}`);
  },

  getMangaChapters: async (mangaSlug: string) => {
    return await api.post(`/manga-chapters`, { mangaSlug });
  },

  getChapterPages: async (mangaSlug: string, chapterSlug: string) => {
    return await api.post(`/chapter-images`, { mangaSlug, chapterSlug });
  }
};
