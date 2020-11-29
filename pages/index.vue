<template>
  <v-container fluid id="home">
    <div
      class="mangas-container d-flex flex-column justify-center align-center align-content-center fill-height"
    >
      <div class="description text-center">
        <!-- <div class="text-h2">MangaKure - Read manga online</div>
        <div class="subtitle-1">
          Read thousand of manga online for free in high quality image
        </div> -->
      </div>

      <div class="search-container full-width ma-16">
        <v-text-field
          :loading="searching"
          single-line
          v-model="searchQuery"
          label="Search manga"
        ></v-text-field>
        <span v-if="total"
          >Results found: <b>{{ total }}</b> mangas</span
        >
      </div>
      <div class="search-result">
        <v-card
          class="mx-auto"
          max-width="800"
          min-width="400"
          min-height="400"
          max-height="400"
          tile
          outlined
          color="transparent"
          ref="infinite-list"
        >
          <v-list two-line>
            <template v-if="mangas.length">
              <template v-for="(manga, index) in mangas">
                <v-list-item
                  :key="manga.title"
                  @click="goToChapterList(manga.slug)"
                >
                  <v-list-item-avatar rounded>
                    <v-img :src="manga.coverImageUrl"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content class="text-left">
                    <v-list-item-title v-html="manga.title"></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="manga.author"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon color="orange"> mdi-book-open </v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <v-divider :key="index" inset></v-divider>
              </template>
            </template>
            <template v-else> </template>
          </v-list>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Api from "@/api";
import { Manga } from "../interfaces";

import debounce from "@/utils/debounce";

export default Vue.extend({
  data() {
    return {
      searchQuery: "",
      mangas: [],
      searching: false,
      debounceSearch: null,
      hasNext: true,
      page: 1,
      total: null,
    };
  },

  computed: {},
  watch: {
    searchQuery(newVal, oldVal) {
      if (newVal.length == 1) return;
      this.debounceSearch();
    },
  },

  created() {
    this.debounceSearch = debounce(this.searchManga, 200);
  },
  async mounted() {
    if (this.$refs["infinite-list"]) {
      const listElement = this.$refs["infinite-list"].$el;
      listElement.addEventListener("scroll", (e) => {
        if (
          listElement.scrollTop + listElement.clientHeight >=
          listElement.scrollHeight
        ) {
          this.page++;
          this.getNext();
        }
      });
    }
    this.searchManga();
  },
  methods: {
    goToChapterList(mangaSlug: string) {
      this.$router.push(`/manga/${mangaSlug}`);
    },
    goToChapter(mangaSlug: string, latestChapters: Array<Manga>) {
      if (!latestChapters.length) return;
      const chapterSlug = latestChapters[0].slug;
      this.$router.push(`/manga/${mangaSlug}/${chapterSlug}`);
    },

    async getManga() {
      this.searching = true;

      const { results, pageSize, total } = await Api.getMangas({
        search: this.searchQuery,
        page: this.page,
      });

      if (this.page < pageSize) this.hasNext = true;
      else this.hasNext = false;

      this.total = total;
      this.searching = false;

      return {
        results,
        pageSize,
        total,
      };
    },

    async getNext() {
      if (!this.hasNext) return;
      const { results } = await this.getManga();
      this.mangas.push(...results);
    },

    async searchManga() {
      this.page = 1;
      const { results, pageSize, total } = await this.getManga();
      this.mangas = results;
    },
  },
});
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

#home {
  height: 100%;
}

.mangas-container {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 60vw;
  height: 100%;

  @media @bp-lg {
    width: 100vw;
  }
}

.search-container {
  width: 100%;
  padding: 0 50px;
}

.search-result {
  width: 100%;
  padding: 0 50px;
}

.v-input {
  flex: none;
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

.v-data-table {
  min-width: 500px;

  .v-data-table__wrapper {
    table {
      tbody {
        tr {
          cursor: pointer;

          & :hover {
          }

          td {
            border-bottom: 0 !important;
            span {
              color: rgba(0, 0, 0, 0.87);
            }
            span:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: #fad6a5;
}

.theme--light.v-list-item:hover {
  background: #fad6a5;
}

.v-list-item__subtitle,
.v-list-item__title {
  // flex: initial;
  // flex-direction: column;
}

.v-card {
  overflow: auto;
}
</style>
