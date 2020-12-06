import { ActionTree, MutationTree, GetterTree } from "vuex";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import {
  MangaStateTypes,
  MangaGetterTypes,
  MangaActionTypes,
  MangaMutationTypes
} from "@/store/interfaces";
import { Manga, Chapter } from "~/interfaces";

const state: MangaStateTypes = {
  manga: null,
  chapter: null,
  mangaChapters: []
};

const getters: GetterTree<MangaStateTypes, any> & MangaGetterTypes = {
  getManga(state) {
    return state.manga;
  },
  getChapter(state) {
    return state.chapter;
  },
  getMangaChapters(state) {
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
    commit(MutationTypes.SET_MANGA_CHAPTERS, payload);
  }
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
