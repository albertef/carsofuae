export default {
  data() {
    return {};
  },
  methods: {
    hasHeader() {
      return this.hasSlot("header");
    },
    hasBody() {
      return this.hasSlot("body");
    },
    hasFooter() {
      return this.hasSlot("footer");
    },
    hasSlot(name) {
      return !!this.$slots[name] || !!this.$scopedSlots[name];
    },
  },
};
