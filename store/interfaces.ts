import { ActionContext } from "vuex";
import { Manga, Chapter } from "@/interfaces/index";
import { MutationTypes } from "./modules/manga/mutation-types";
import { ActionTypes } from "./modules/manga/action-types";

export interface MangaStateTypes {
  manga: Manga | null;
  chapter: Chapter | null;
  mangaChapters: Chapter[];
}

export interface MangaGetterTypes {
  getManga(state: MangaStateTypes): Manga | null;
  getChapter(state: MangaStateTypes): Chapter | null;
  getMangaChapters(state: MangaStateTypes): Chapter[];
}

export interface MangaMutationTypes<S = MangaStateTypes> {
  [MutationTypes.SET_MANGA](state: S, payload: Manga): void;
  [MutationTypes.SET_CHAPTER](state: S, payload: Chapter): void;
  [MutationTypes.SET_MANGA_CHAPTERS](state: S, payload: Chapter[]): void;
}

type AugmentedActionContext = {
  commit<K extends keyof MangaMutationTypes>(
    key: K,
    payload: Parameters<MangaMutationTypes[K]>[1]
  ): ReturnType<MangaMutationTypes[K]>;
} & Omit<ActionContext<MangaStateTypes, any>, "commit">;

export interface MangaActionTypes {
  [ActionTypes.SET_MANGA](
    { commit }: AugmentedActionContext,
    payload: Manga
  ): void;
  [ActionTypes.SET_CHAPTER](
    { commit }: AugmentedActionContext,
    payload: Chapter
  ): void;
  [ActionTypes.SET_MANGA_CHAPTERS](
    { commit }: AugmentedActionContext,
    payload: Chapter[]
  ): void;
}
