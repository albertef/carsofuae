import InputText from "@/components/common/input-text/input-text.vue";

export default {
  components: {
    InputText,
  },
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: "",
    },
    selectedValue: {
      type: Array | String,
    },
  },
  data() {
    return {
      selected: [],
    };
  },

  methods: {
    updateLeasePrice(time, type, value) {
      const selectedValues = {
        time: time,
        price: (type === "price" && value) || null,
        kilometer: (type === "kilometer" && value) || null,
        downPayment: (type === "downPayment" && value) || null,
      };

      const isExist = this.selected?.filter((item) => item.time === time);
      if (isExist.length) {
        isExist[0] =
          type === "price"
            ? { ...isExist[0], price: value }
            : type === "kilometer"
            ? { ...isExist[0], kilometer: value }
            : { ...isExist[0], downPayment: value };
        this.selected = [
          ...this.selected.filter((item) => item.time !== time),
          isExist[0],
        ];
      } else {
        this.selected = [...this.selected, selectedValues];
      }
      const formatted = this.selected.map((el) => {
        return {
          per: el.time,
          price: el.price,
          km: el.kilometer,
          down: el.downPayment,
        };
      });
      this.$emit("value", formatted);
    },

    getSelectedValues(per, value) {
      const matchingItem =
        this.selectedValue &&
        this.selectedValue.length &&
        this.selectedValue?.find((item) => item.per === per);

      if (matchingItem) {
        return matchingItem[value];
      } else {
        return null;
      }
    },
  },
};
