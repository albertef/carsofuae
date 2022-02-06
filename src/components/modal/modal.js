export default {
  name: "modal-popup",
  props: {
    size: {
      type: String,
      default: "",
      validator: function validator(size) {
        return ["", "small", "extra-small", "medium", "medium-large"].includes(
          size
        );
      },
    },
    whiteBg: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasHeader() {
      return this.hasSlot("header");
    },
    hasBody() {
      return this.hasSlot("body");
    },
    hasFooter() {
      return this.hasSlot("footer");
    },
  },
  methods: {
    hasSlot(name) {
      return !!this.$slots[name] || !!this.$scopedSlots[name];
    },
  },
};
