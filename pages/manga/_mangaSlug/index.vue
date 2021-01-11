<template>
  <div class="section">
    <div class="container" v-show="!hasChapterSelected">
      <h1>{{ manga.title }}</h1>

      <div class="infinite-container">
        <list
          :data="chapters"
          :titleKey="'label'"
          @item-click="goToChapter"
          :maxHeight="500"
        >
        </list>
      </div>
    </div>
    <div class="images-container" v-show="hasChapterSelected">
      <v-btn v-if="!isLatestChapter" @click="goToNextChapter"> Next</v-btn>
      <v-btn v-if="!isFirstChapter" @click="goToPreviousChapter"> Prev</v-btn>

      <v-img
        v-for="(page, index) in chapterPages"
        :src="page.url"
        :key="`${page} ${index}`"
        :alt="index"
        contain
      />
    </div>
  </div>
</template>

<script>
import Api from "@/api";
import List from "@/components/List";
import { SET_MANGA_CHAPTERS } from "../../../store/manga/action-types";

export default {
  data() {
    return {
      manga: {},
      chapters: [],
      chapterPages: [],
      currentChapter: null,
      columns: [
        { title: "Chapter", dataIndex: "label", key: "text", ellipsis: true },
      ],
      loading: false,
      hasMoreResults: false,
      busy: false,
      hasChapterSelected: false,
      isLatestChapter: false,
      isFirstChapter: false,
    };
  },
  components: {
    List,
  },
  async created() {
    const { mangaSlug } = this.$route.params;
    this.loading = true;
    const data = await Api.getMangaChapters(mangaSlug);
    this.chapters = data.chapters;
    this.manga = data.manga;
    this.loading = false;
    this.$store.dispatch("manga/SET_MANGA", this.manga);
    this.$store.dispatch("manga/SET_MANGA_CHAPTERS", this.chapters);
  },
  mounted() {},
  computed: {
    indexOfCurrentChapter() {
      return this.chapters.findIndex(
        ({ slug }) => slug === this.currentChapter.slug
      );
    },
    nextChapter() {
      return this.chapters[this.indexOfCurrentChapter - 1];
    },
    previousChapter() {
      return this.chapters[this.indexOfCurrentChapter + 1];
    },
  },
  methods: {
    handleInfiniteOnLoad() {
      const data = this.chapters;
      this.loading = true;
      if (data.length) {
        this.hasMoreResults = true;
        this.loading = false;
        return;
      }
    },
    async goToChapter(chapter) {
      this.$router.push(`/manga/${this.manga.slug}/${chapter.slug}`);
      // this.currentChapter = chapter;
      // this.chapterPages = await Api.getChapterPages(
      //   this.manga.slug,
      //   this.currentChapter.slug
      // );
      // this.hasChapterSelected = true;
      // this.isLatestChapter = this.indexOfCurrentChapter === 0;
      // this.isFirstChapter =
      //   this.indexOfCurrentChapter === this.chapters.length - 1;
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

.section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.images-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  font-weight: 400;
}

.container {
  width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media @bp-md {
    width: 100vw;
  }

  .infinite-container {
    overflow: auto;
    width: 100%;
    padding: 0 50px;
    height: 500px;
  }
  .loading-container {
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
  }

  .ant-list-item {
    cursor: pointer;
  }
  .v-data-table {
    min-width: 500px;

    .v-data-table__wrapper {
      table {
        tbody {
          tr {
            cursor: pointer;

            & :hover {
              background: #fad6a5;
            }

            td {
              border-bottom: 0 !important;

              span:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>