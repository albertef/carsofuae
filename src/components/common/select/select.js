export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: "Select",
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
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
      selectRef: null,
    };
  },
  mounted() {
    document.addEventListener("click", this.detectClick);
    this.$emit("input", this.selected);
  },
  methods: {
    detectClick(e) {
      let el = this.$refs["selectRef"];
      let target = e.target;
      if (el && el !== target && !el.contains(target)) {
        this.open = false;
      }
    },
  },
};
