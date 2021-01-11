import { ActionTree, MutationTree, GetterTree } from "vuex";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import {
  MangaStateTypes,
  MangaGetterTypes,
  MangaActionTypes,
  MangaMutationTypes
} from "@/store/interfaces";

import { Manga, Chapter } from "@/interfaces";

const state: MangaStateTypes = {
  manga: null,
  chapter: null,
  mangaChapters: []
};

const getters: GetterTree<MangaStateTypes, any> & MangaGetterTypes = {
  getManga(state: MangaStateTypes) {
    return state.manga;
  },
  getChapter(state: MangaStateTypes) {
    return state.chapter;
  },
  getMangaChapters(state: MangaStateTypes) {
    return state.mangaChapters;
  }
};

const actions: ActionTree<MangaStateTypes, any> & MangaActionTypes = {
  [ActionTypes.SET_MANGA]({ commit }, payload: Manga) {
    commit(MutationTypes.SET_MANGA, payload);
  },
  [ActionTypes.SET_CHAPTER]({ commit }, payload: Chapter) {
    commit(MutationTypes.SET_CHAPTER, payload);
  },
  [ActionTypes.SET_MANGA_CHAPTERS]({ commit }, payload: Chapter[]) {
    console.log("payload", payload);
    commit(MutationTypes.SET_MANGA_CHAPTERS, payload);
  }
};

const mutations: MutationTree<MangaStateTypes> & MangaMutationTypes = {
  [MutationTypes.SET_MANGA](state: MangaStateTypes, payload: Manga) {
    state.manga = payload;
  },
  [MutationTypes.SET_CHAPTER](state: MangaStateTypes, payload: Chapter) {
    state.chapter = payload;
  },
  [MutationTypes.SET_MANGA_CHAPTERS](
    state: MangaStateTypes,
    payload: Chapter[]
  ) {
    state.mangaChapters = payload;
    console.log("state.mangaChapters", state.mangaChapters);
    console.log("state", state);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
