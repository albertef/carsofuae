import Button from "@/components/common/button/button.vue";
import Checkbox from "@/components/common/checkbox/checkbox.vue";
import Radio from "@/components/common/radio/radio.vue";
import Select from "@/components/common/select/select.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import { UTILS } from "@/utility/utils.js";

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
    getCategory() {
      return this.$route.query.category;
    },
    fullPostData() {
      return this.data;
    },
    getCarMakes() {
      return this.$store.getters.getAllCarMakes;
    },
    getAllCarModels() {
      return this.$store.getters.getAllCarModels(this.carMake);
    },
    yearDropdownValues() {
      return UTILS.yearDropdownValues;
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
