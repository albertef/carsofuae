export default {
  name: "Button",
  props: {
    type: {
      type: String,
      default: "primary",
    },
    text: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "auto",
    },
    rounded: {
      trype: Boolean,
      default: false,
    },
    circle: {
      trype: Boolean,
      default: false,
    },
    icon: {
      type: Array,
      default: null,
    },
  },
  computed: {
    buttonStyle: function () {
      const borderRadius = this.rounded ? "30px" : this.circle ? "50%" : "";
      return {
        width: this.width,
        borderRadius: borderRadius,
        height: this.circle && this.width,
      };
    },
  },
  methods: {
    clicked(e) {
      this.$emit("click", e);
    },
  },
};
