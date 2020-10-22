<template>
  <a-card hoverable>
    <img
      slot="cover"
      alt="example"
      :src="manga.cover_image_url"
      @click.stop="emitGetChapters()"
    />
    <a-card-meta :title="manga.title">
      <!-- <template slot="description"> www.instagram.com </template> -->
    </a-card-meta>
  </a-card>
</template>

<script>
export default {
  props: {
    manga: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {};
  },
  watch: {
    manga: {
      handler(newValue) {
        console.log(newValue)
      }
    },
    deep: true
  },
  methods: {
    emitGetChapters() {
      console.log("hehe");
      this.$emit("get-chapters", this.manga._id);
    },
  },
};
</script>

<style lang="less" scoped>
.ant-card {
  width: 150px;
  & img {
    width: 150px;
    height: 200px;
  }

  margin: 5px;
}
</style>