import Button from "@/components/common/button/button.vue";
import Select from "@/components/common/select/select.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import Checkbox from "@/components/common/checkbox/checkbox.vue";
import { UTILS } from "@/utility/utils.js";
import { META } from "@/meta/common.js";
import store from "@/store";
import rentalFeaturesList from "@/meta/features.json";

export default {
  name: "RentalFilter",
  components: {
    Button,
    Select,
    InputText,
    Checkbox,
  },

  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      filterData: {},
      selectedFeatures: [],
    };
  },
  computed: {
    brandsList() {
      return store.getters.getAllMakes;
    },
    modelsList() {
      return store.getters.getAllModels(
        this.$route.name == "Rental"
          ? this.filterData.brand
          : this.filterData.company
      );
    },
    fullPostData() {
      return this.data;
    },
    utils() {
      return UTILS;
    },
    getRentalTypes() {
      return META.rentalCarTypes.map((item) => item.name);
    },
    rentalFeaturesList() {
      return rentalFeaturesList;
    },
    pageName() {
      return this.$route.name;
    },
  },
  methods: {
    updateFilterData(key, e) {
      this.filterData = {
        ...this.filterData,
        [key]: e,
      };
    },

    applyFilter() {
      if (Object.keys(this.filterData).length) {
        const filteredData1 = this.fullPostData.filter((item) => {
          return Object.entries(this.filterData)
            .filter((item) => item[0] != "features")
            .every(([key, value]) => {
              return item.hasOwnProperty(key) && item[key] == value;
            });
        });

        const filteredData =
          filteredData1.length && this.filterData.features
            ? filteredData1.filter((item) => {
                const itemServices = item.features;
                return this.filterData.features.every((feature) =>
                  itemServices.includes(feature)
                );
              })
            : !filteredData1.length && this.filterData.features
            ? this.fullPostData.filter((item) => {
                const itemServices = item.features;
                return this.filterData.features.every((feature) =>
                  itemServices.includes(feature)
                );
              })
            : filteredData1;

        this.$emit("filteredData", filteredData);
        this.$store.commit("updateIsFilterApplied", true);
      }
      this.closeFilter();
    },

    closeFilter() {
      this.$emit("close");
    },

    updateFeatureList(id) {
      this.selectedFeatures = [...this.selectedFeatures, id];
      this.updateFilterData("features", this.selectedFeatures);
    },
  },
};
