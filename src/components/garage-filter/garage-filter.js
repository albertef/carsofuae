import Button from "@/components/common/button/button.vue";
import Checkbox from "@/components/common/checkbox/checkbox.vue";
import Radio from "@/components/common/radio/radio.vue";
import Select from "@/components/common/select/select.vue";
import garageServiceList from "@/meta/services.json";

export default {
  name: "PostFilter",
  components: {
    Button,
    Checkbox,
    Radio,
    Select,
  },
  data() {
    return {};
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  computed: {
    fullGarageData() {
      return this.data;
    },
    garageServiceList() {
      return garageServiceList;
    },
    yeardropdownValues() {
      const max = new Date().getFullYear(),
        min = max - 20,
        arr = [];

      for (var i = min; i <= max; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    isSelected(value) {
      return value ? 1 : 0;
    },
    getSelectInput(e) {
      console.log(e);
    },
    updateSelectedCarMake(make) {
      this.carMake = make;
    },
    closeFilter() {
      this.$emit("close");
    },
  },
};
