<template>
  <v-card
    class="mx-auto"
    max-width="800"
    min-width="400"
    :min-height="minHeight"
    :max-height="maxHeight"
    tile
    outlined
    color="transparent"
  >
    <v-list two-line>
      <template v-if="data.length">
        <template v-for="item in data">
          <v-list-item :key="item[titleKey]" @click="onItemClick(item)">
            <v-list-item-avatar v-if="hasImage" rounded>
              <v-img :src="item[imageKey]"></v-img>
            </v-list-item-avatar>

            <v-list-item-content :class="{ 'text-left': hasImage }">
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
          <v-divider v-if="hasImage" :key="item[titleKey]" inset></v-divider>
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
    minHeight: {
      type: Number,
      default: 400,
      required: false,
    },
    maxHeight: {
      type: Number,
      default: 800,
      required: false,
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