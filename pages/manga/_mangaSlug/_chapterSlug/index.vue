<template>
  <div class="reader">
    <v-system-bar height="30" fixed></v-system-bar>
    <div class="images-container">
      <img
        v-for="(page, index) in pages"
        :src="page.url"
        :key="index"
        :alt="index"
      />
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
    };
  },
  async created() {
    const { mangaSlug, chapterSlug } = this.$route.params;
    this.loading = true;
    this.pages = await Api.getChapterPages(mangaSlug, chapterSlug);
    this.loading = false;
  },
  mounted() {},
  methods: {},
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

.container {
  width: 80vw;
  height: auto;
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
</style>