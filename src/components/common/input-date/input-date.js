import dayjs from "dayjs";
export default {
  name: "InputDate",
  props: {
    value: {
      type: String | Object,
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
    type: {
      type: String,
      default: "text",
    },
    date: {
      type: Date,
      default: () => new Date(),
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
    updateValue(val) {
      this.$emit("value", dayjs(val));
    },
    clear() {
      this.$emit("value", "");
      this.$emit("reset");
    },
  },
};
