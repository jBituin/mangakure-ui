<template>
  <div>
    <h1>Hello World</h1>
    <a-table
      :columns="columns"
      :data-source="chapters"
      :pagination="false"
      :scroll="{ y: 240 }"
    >
      <a slot="name" slot-scope="text">{{ text }}</a>
    </a-table>
  </div>
</template>

<script>
import Api from "../../api";

export default {
  data() {
    return {
      chapters: [],
      columns: [
        { title: "Chapter", dataIndex: "label", key: "label", ellipsis: true },
      ],
    };
  },
  async created() {
    const { mangaId } = this.$route.params;
    this.chapters = await Api.getMangaChapters(mangaId);
  },
  mounted() {
  },
};
</script>

<style lang="less" scoped>
</style>