export default {
  name: "loader",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "success",
    },
  },
  computed: {
    icon() {
      return this.type === "success"
        ? ["fas", "check-square"]
        : ["fas", "trash"];
    },
  },
};
