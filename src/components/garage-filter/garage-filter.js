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
    return {
      filterData: {},
      selectedServices: [],
    };
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    this.filterData = { ...this.filterData, deals: "With Deals" };
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
    //update by jesmi
    garageList() {
      return this.$store.state.home.garageList.garages;
    },
    locationList() {
      return this.garageList.map((item) => item.place);
    },
    fullPostData() {
      return this.garageList.filter((item) => {
        return (
          item.place?.toLowerCase() ===
            this.filterData.location?.toLowerCase() &&
          Boolean(Number(item.deals)) === this.filterData.deals
        );
      });
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

    updateGarageFilterDetails(key, e) {
      this.filterData = {
        ...this.filterData,
        [key]: e,
      };
    },
    updateGarageServiceList(id) {
      this.selectedServices = [...this.selectedServices, id];
      this.updateGarageFilterDetails("services", this.selectedServices);
    },
  },
};
