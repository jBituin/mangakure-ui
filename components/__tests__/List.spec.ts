import { shallowMount } from "@vue/test-utils";
import List from "~/components/List.vue";
import { createRenderer } from "vue-server-renderer";
// import "vue-jest";

describe("List.vue", () => {
  it("renders row for each item in props.data", () => {
    const data = ["", ""];
    const wrapper = shallowMount(List, {
      propsData: { data }
    });
    expect(wrapper.findAll(".v-list-item")).toHaveLength(data.length);
  });

  it("matches snapshot", () => {
    const data = [{ title: "item1" }, { title: "item2" }];
    const renderer = createRenderer();
    const wrapper = shallowMount(List, {
      propsData: { data, titleKey: "title" }
    });
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(`ERROR: ${err}`);
      expect(str).toMatchSnapshot();
    });
  });
});
