export default {
  name: "Radio",
  props: {
    selected: {
      type: Number | Boolean,
      default: 0,
    },
    value: {
      type: String | Number | Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    checked() {
      this.$emit("change", { value: this.value });
    },
  },
};
