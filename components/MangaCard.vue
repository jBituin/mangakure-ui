<template>
  <v-card class="mx-auto" width="150" @click.stop="emitGetChapters">
    <v-img :src="manga.coverImageUrl" height="200px"></v-img>

    <v-card-title> {{ manga.title }} </v-card-title>
  </v-card>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
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
      this.$emit("get-chapters", this.manga.slug);
    },
  },
});
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