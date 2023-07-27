export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
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
    selected: {
      type: String | Number | Boolean,
    },
  },
  data() {
    return {
      open: false,
      selectRef: null,
    };
  },
  mounted() {
    document.addEventListener("click", this.detectClick);
    //this.$emit("input", this.selected);
  },
  methods: {
    selectOption(option) {
      this.open = false;
      this.$emit("selectValue", option);
    },
    detectClick(e) {
      let el = this.$refs["selectRef"];
      let target = e.target;
      if (el && el !== target && !el.contains(target)) {
        this.open = false;
      }
    },
  },
};
