<template>
  <div class="section">
    <div class="container page-reader">
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
import axios from "axios";
// import infiniteScroll from "vue-infinite-scroll";
export default {
  // directives: { infiniteScroll },
  data() {
    return {
      pages: [],
      loading: false,
      busy: false,
    };
  },
  async created() {
    const { chapterId } = this.$route.params;
    console.log("this.$route.params", this.$route.params);
    this.loading = true;
    this.pages = await Api.getChapterPages(chapterId);
    // this.pages = data;
    this.loading = false;
    console.log("this.pages", this.pages);

    // var config = {
    //   method: "get",
    //   url:
    //     "https://s41.mkklcdnv41.com/mangakakalot/p1/pn918005/chapter_123/1.jpg",
    //   headers: {
    //     Referer: "https://manganelo.com/",
    //     Cookie: "__cfduid=d928d2a94279c0e6c6b95d14421cff9511603547788",
    //   },
    // };

    // const hehe = axios(config);
    // console.log("hehe", hehe);
    // const page = await fetch(data[0].url, {
    //   method: "GET",
    //   Referer: "https://manganelo.com/",
    //   origin: "https://manganelo.com/",
    //   headers: {
    //     accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    //     "accept-encoding": " gzip, deflate, br",
    //     "accept-language": " en-US,en;q=0.9",
    //     "cache-control": " no-cache",
    //     pragma: " no-cache",
    //     origin: "https://manganelo.com/",
    //     // Referer: " https://manganelo.com/",
    //     // referer: " https://manganelo.com/",
    //   },
    // });
    // console.log("hehe", page);
    // this.pages = await Promise.all(
    //   data.map(async (page) => {
    //     return fetch(page.url, {
    //       headers: {
    //         referer: "https://manganelo.com/",
    //       },
    //     });
    //   })
    // );
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

.section {
  display: flex;
  align-items: center;
  justify-content: center;
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

.page-reader {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  font-weight: 400;
}
</style>