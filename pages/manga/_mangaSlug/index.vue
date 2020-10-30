<template>
  <div class="section">
    <div class="container">
      <h1>{{ manga.title }}</h1>
      <v-simple-table fixed-header height="300px" min-width="500px">
        <template v-slot:default>
          <tbody>
            <tr v-for="item in chapters" :key="item.label">
              <td @dblclick="goToChapter(item)">
                <span @click="goToChapter(item)"> {{ item.label }}</span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import Api from "@/api";
export default {
  data() {
    return {
      manga: {},
      chapters: [],
      columns: [
        { title: "Chapter", dataIndex: "label", key: "text", ellipsis: true },
      ],
      loading: false,
      hasMoreResults: false,
      busy: false,
    };
  },
  async created() {
    const { mangaSlug } = this.$route.params;
    this.loading = true;
    const data = await Api.getMangaChapters(mangaSlug);
    this.chapters = data.chapters;
    this.manga = data.manga;
    this.loading = false;
  },
  mounted() {},
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
    goToChapter(chapter) {
      this.$router.push(`/manga/${this.manga.slug}/${chapter.slug}`);
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

.container {
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media @bp-md {
    width: 100vw;
  }

  .infinite-container {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    padding: 8px;
    height: 300px;
    min-width: 400px;
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
              background: orange;
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