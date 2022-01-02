import Button from "@/components/common/button/button.vue";
import Checkbox from "@/components/common/checkbox/checkbox.vue";
import Radio from "@/components/common/radio/radio.vue";
import Select from "@/components/common/select/select.vue";
import InputText from "@/components/common/input-text/input-text.vue";

export default {
  name: "PostFilter",
  components: {
    Button,
    Checkbox,
    Radio,
    Select,
    InputText,
  },
  data() {
    return {
      carMake: this.getCarMakes ? this.getCarMakes[0] : null,
    };
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  computed: {
    fullPostData() {
      return this.data;
    },
    getCarMakes() {
      return this.$store.getters.getAllCarMakes;
    },
    getAllCarModels() {
      return this.$store.getters.getAllCarModels(this.carMake);
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
    filterToggle() {
      this.filterEnabled = !this.filterEnabled;
    },
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
