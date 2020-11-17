<template>
  <v-container fluid>
    <div class="mangas-container">
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            v-model="searchQuery"
            :rules="rules"
            label="Search manga"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-simple-table
            fixed-header
            height="600px"
            min-width="500px"
            v-if="!searching"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Author</th>
                  <th class="text-right">Latest Chapter</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in mangas"
                  :key="item.title"
                  @dblclick="goToChapterList(item.slug)"
                >
                  <td class="text-left">
                    <span @click="goToChapterList(item.slug)">
                      {{ item.title }}</span
                    >
                  </td>
                  <td class="text-left">
                    {{ item.author }}
                  </td>
                  <td
                    class="text-right"
                    @click="goToChapter(item.slug, item.latestChapters)"
                  >
                    <span v-if="item.latestChapters.length">
                      {{
                        (item.latestChapters.length &&
                          item.latestChapters[0].label) ||
                        "-  "
                      }}
                    </span>
                    <span v-else>-</span>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-progress-circular
            v-else
            :size="50"
            color="amber"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Api from "@/api";
import MangaCard from "@/components/MangaCard.vue";
import { Manga } from "../interfaces";

import debounce from "@/utils/debounce";

export default Vue.extend({
  components: {
    MangaCard,
  },
  data() {
    return {
      searchQuery: "",
      rules: [],
      mangas: [],
      searching: false,
    };
  },
  watch: {
    searchQuery: debounce(async (newValue: string, oldValue: string) => {
      Api.searchManga(newValue);
    }, 100),
  },
  async mounted() {
    this.searching = true;
    this.mangas = await Api.getMangas();
    this.searching = false;
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
  },
});
</script>

<style lang="less">
.mangas-container {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 50vw;
}

.row {
  text-align: center;
}
.row form {
  width: 100%;
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
</style>
