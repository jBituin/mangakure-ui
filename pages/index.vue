<template>
  <div class="container">
    <div class="mangas-container">
      <MangaCard
        v-for="manga in mangas"
        :manga="manga"
        @get-chapters="getChapters"
      ></MangaCard>
    </div>
  </div>
</template>

<script lang="ts">
import Api from "../api";
import MangaCard from "../components/MangaCard";

export default {
  components: {
    MangaCard,
  },
  data() {
    return {
      mangas: [],
    };
  },
  async mounted() {
    this.mangas = await Api.getMangas();
  },
  methods: {
    async getChapters(mangaId) {
     this.$router.push(`/mangas/${mangaId}`)
    }
  }
};
</script>

<style>
.mangas-container {
  margin: 0 auto;
  padding-top: 64px;
  min-height: 92vh;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
