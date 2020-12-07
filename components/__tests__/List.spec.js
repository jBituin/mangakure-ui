import Vue from "vue";
import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";
import List from "../List.vue";
import { createRenderer } from "vue-server-renderer";

describe("List.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("renders row for each item in props.data", () => {
    const data = [{ title: "item1" }, { title: "item2" }];
    const wrapper = mount(List, {
      propsData: { data, titleKey: "title" }
    });
    expect(wrapper.findAll(".v-list-item--link")).toHaveLength(data.length);
  });
});
