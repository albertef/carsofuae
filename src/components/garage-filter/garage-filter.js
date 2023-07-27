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
    //this.filterData = { ...this.filterData, deals: "With Deals" };
  },
  computed: {
    fullGarageData() {
      return this.data;
    },
    garageServiceList() {
      return garageServiceList;
    },
    // yeardropdownValues() {
    //   const max = new Date().getFullYear(),
    //     min = max - 20,
    //     arr = [];

    //   for (var i = min; i <= max; i++) {
    //     arr.push(i);
    //   }
    //   return arr;
    // },
  },
  methods: {
    applyFilter() {
      if (Object.keys(this.filterData).length) {
        const filteredItems = this.fullGarageData.filter((item) => {
          const itemServices = item.services;
          return this.filterData.services.every((service) =>
            itemServices.includes(service)
          );
        });
        this.$emit("filteredData", filteredItems);
        this.$store.commit("updateIsFilterApplied", true);
      }
      this.closeFilter();
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
