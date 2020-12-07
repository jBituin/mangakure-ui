<template>
  <v-card
    class="mx-auto"
    max-width="800"
    min-width="400"
    min-height="400"
    max-height="400"
    tile
    outlined
    color="transparent"
  >
    <v-list two-line>
      <template v-if="data.length">
        <template v-for="(item, index) in ['', '']">
          <v-list-item :key="item[titleKey]" @click="onItemClick(item)">
            <v-list-item-avatar v-if="hasImage" rounded>
              <v-img :src="item[imageKey]"></v-img>
            </v-list-item-avatar>

            <v-list-item-content class="text-left">
              <v-list-item-title v-html="item[titleKey]"></v-list-item-title>
              <v-list-item-subtitle
                v-if="hasSubtitle && subtitleKey"
                v-html="item[subtitleKey]"
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
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true,
    },
    hasImage: {
      type: Boolean,
      default: false,
      required: false,
    },
    imageKey: {
      type: String,
      default: null,
      required: false,
    },
    hasSubtitle: {
      type: Boolean,
      default: false,
      required: false,
    },
    subtitleKey: {
      type: String,
      default: null,
      required: false,
    },
    titleKey: {
      type: String,
      default: null,
      required: true,
    },
  },
  methods: {
    onItemClick(item) {
      this.$emit("item-click", item);
    },
    onItemDoubleClick(item) {
      this.$emit("item-double-click", item);
    },
  },
};
</script>
<style lang="less" scoped>
</style>