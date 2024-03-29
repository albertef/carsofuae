export default {
  name: "TextArea",
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: "",
    },
  },
  methods: {
    updateValue(e) {
      this.$emit("value", e.target.value);
    },
    clear() {
      this.$emit("value", "");
      this.$emit("reset");
    },
  },
};
