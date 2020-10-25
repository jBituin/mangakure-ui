<template>
  <!-- <div hoverable>
    <img
      slot="cover"
      alt="example"
      :src="manga.cover_image_url"
      @click.stop="emitGetChapters()"
    />
    <div :title="manga.title">
      <template slot="description"> www.instagram.com </template>
    </div>
  </div> -->
  <v-card class="mx-auto" width="150" @click.stop="emitGetChapters">
    <v-img :src="manga.cover_image_url" height="200px"></v-img>

    <v-card-title> {{ manga.title }} </v-card-title>

    <!-- <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle> -->
  </v-card>
</template>

<script>
export default {
  props: {
    manga: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  watch: {
    manga: {
      handler(newValue) {
        console.log(newValue);
      },
    },
    deep: true,
  },
  methods: {
    emitGetChapters() {
      this.$emit("get-chapters", this.manga._id);
    },
  },
};
</script>

<style lang="less" scoped>
.v-card {
  width: 150px;
  & img {
    width: 150px;
    height: 200px;
  }

  margin: 5px;

  .v-card__title {
    overflow: hidden;
  }
}
</style>