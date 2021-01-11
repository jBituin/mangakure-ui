import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import manga from "./manga";

Vue.use(Vuex);
let vuexLocalStorage = null;

console.log("process.browser", process.browser);
if (process.browser) {
  vuexLocalStorage = new VuexPersist({
    key: "mangakure",
    storage: window.localStorage
  });
}
export const store = new Vuex.Store({
  modules: {
    manga
  },
  plugins: process.browser ? [vuexLocalStorage.plugin] : []
});
