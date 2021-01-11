<template>
  <div>
    <v-system-bar height="30" fixed></v-system-bar>
    <div class="navigation d-flex justify-center align-center">
      <v-btn
        class="nav-btn"
        v-if="!isFirstChapter"
        @click="goToPreviousChapter"
      >
        Prev</v-btn
      >
      <h3>{{ title }}</h3>
      <v-btn class="nav-btn" v-if="!isLatestChapter" @click="goToNextChapter">
        Next</v-btn
      >
    </div>
    <div class="reader">
      <div class="images-container">
        <v-img
          v-for="(page, index) in pages"
          :src="page.url"
          :key="`${page} ${index}`"
          :alt="index"
          contain
        />
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/api";

export default {
  data() {
    return {
      pages: [],
      loading: false,
      busy: false,
      chapterSlug: null,
      mangaSlug: null,
      isLatestChapter: false,
      isFirstChapter: false,
      chapters: [],
    };
  },
  async created() {
    await this.getPages();

    this.chapters = this.$store.getters["manga/getMangaChapters"];
    if (!this.chapters.length) {
      const data = await Api.getMangaChapters(this.mangaSlug);
      this.chapters = data.chapters;
      this.$store.dispatch("manga/SET_MANGA_CHAPTERS", this.chapters);
    }
    this.isLatestChapter = this.indexOfCurrentChapter === 0;
    this.isFirstChapter =
      this.indexOfCurrentChapter === this.chapters.length - 1;
  },
  mounted() {},
  computed: {
    indexOfCurrentChapter() {
      return this.chapters.findIndex(({ slug }) => slug === this.chapterSlug);
    },
    nextChapter() {
      return this.chapters[this.indexOfCurrentChapter - 1];
    },
    previousChapter() {
      return this.chapters[this.indexOfCurrentChapter + 1];
    },
    title() {
      console.log("this.chapters", this.chapters);
      return (
        (this.chapters.length &&
          this.chapters[this.indexOfCurrentChapter].label) ||
        ""
      );
    },
  },
  methods: {
    async getPages() {
      const { mangaSlug, chapterSlug } = this.$route.params;
      this.chapterSlug = chapterSlug;
      this.mangaSlug = mangaSlug;
      this.loading = true;
      this.pages = await Api.getChapterPages(mangaSlug, chapterSlug);
      this.loading = false;
    },
    async goToChapter(chapter) {
      this.$router.push(`/manga/${this.mangaSlug}/${chapter.slug}`);
    },
    async goToNextChapter() {
      // Next chapter button should not be visible if we are on latest chapter
      if (this.isLatestChapter) return;
      this.goToChapter(this.nextChapter);
    },

    async goToPreviousChapter() {
      // Prev chapter button should not be visible if we are on latest chapter
      if (this.isFirstChapter) return;
      this.goToChapter(this.previousChapter);
    },
  },
};
</script>

<style lang="less" scoped>
@screen-xs-max: 0px;
@screen-sm-max: 600px;
@screen-md-max: 960px;
@screen-lg-max: 1280px;

@bp-xs: ~"screen and (max-width:" @screen-xs-max~ ")";
@bp-sm: ~"screen and (max-width:" @screen-sm-max~ ")";
@bp-md: ~"screen and (max-width:" @screen-md-max~ ")";
@bp-lg: ~"screen and (max-width:" @screen-lg-max~ ")";

.reader {
  padding-top: 65px;
}

.main {
  height: auto;
}

.images-container {
  width: 900px;
  height: auto;
  margin: 0 auto;
  @media @bp-md {
    width: 100vw;
  }

  & img {
    display: block;
    margin: 5px auto 0;
    max-width: 100%;
    height: auto;
  }
}

.v-system-bar {
  // top: 64px;
}

.navigation {
  margin: 15px;

  & .nav-btn {
    margin: 0 15px;
  }
}
</style>