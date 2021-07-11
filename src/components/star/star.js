const MAX = 5;
export default {
  name: "Star",
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      halfStar: false,
      actualValue: 0,
    };
  },
  computed: {
    roundedValue() {
      this.halfStar = false;
      if (Number.isInteger(this.value)) {
        this.actualValue = this.value;
        return this.value;
      }
      this.halfStar = true;
      this.actualValue = this.value.toFixed(2);
      return Math.floor(this.value);
    },
    remainingStarValue() {
      return this.halfStar
        ? MAX - (this.roundedValue + 1)
        : MAX - this.roundedValue;
    },
  },
};
