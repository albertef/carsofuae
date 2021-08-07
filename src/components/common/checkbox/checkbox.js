export default {
  name: "Checkbox",
  props: {
    value: {
      type: Boolean,
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
