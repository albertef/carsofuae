export default {
  name: "Checkbox",
  props: {
    value: {
      type: Boolean | Number,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
    label: {
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
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getCheckStatusIcon() {
      if (this.checked) {
        return ["fas", "check-square"];
      } else if (this.disabled && !this.indeterminate) {
        return ["far", "square"];
      } else if (this.indeterminate || (this.disabled && this.indeterminate)) {
        return ["fas", "minus-square"];
      } else {
        return ["far", "square"];
      }
    },
  },
  data: function () {
    return {
      checked: this.value,
    };
  },
  watch: {
    value() {
      this.checked = this.value;
    },
  },
  methods: {
    toggleData() {
      if (!this.disabled) {
        this.checked = !this.checked;
        this.$emit("change", {
          value: this.checked,
        });
      }
    },
  },
};
