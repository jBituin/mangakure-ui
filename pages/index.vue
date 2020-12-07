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
        <list
          :data="mangas"
          :hasImage="true"
          :hasSubtitle="true"
          :imageKey="'coverImageUrl'"
          :subtitleKey="'author'"
          :titleKey="'title'"
          ref="infinite-list"
          @item-click="goToChapterList"
        ></list>
      </div>
    </div>
  </v-container>
</template>

<script>
import Vue from "vue";
import Api from "~/api";
import { Manga } from "../interfaces";
import List from "~/components/List.vue";
import debounce from "~/utils/debounce";

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
  components: {
    List,
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
    this.searchManga();
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
  },
  methods: {
    goToChapterList(manga) {
      const { slug } = manga;
      this.$router.push(`/manga/${slug}`);
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
