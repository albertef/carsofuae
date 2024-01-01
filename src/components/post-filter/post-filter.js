import Button from "@/components/common/button/button.vue";
import Select from "@/components/common/select/select.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "PostFilter",
  components: {
    Button,
    Select,
    InputText,
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
      filteredData: [],
    };
  },
  computed: {
    getCategory() {
      return (
        this.$route.query.category ||
        this.$store.state.home.selectedClassifiedCategory ||
        "used-cars"
      );
    },
    fullPostData() {
      return this.data;
    },
    utils() {
      return UTILS;
    },
    removeAlAinList() {
      const locationList = this.utils.emiratesLocationList();
      return locationList.filter((item) => item != "Al Ain");
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
      const textboxValues = [
        "minPrice",
        "maxPrice",
        "minYear",
        "maxYear",
        "minMileage",
        "maxMileage",
      ];
      if (Object.keys(this.filterData).length) {
        this.filteredData = this.fullPostData.filter((item) => {
          return Object.entries(this.filterData)
            .filter((item) => !textboxValues.includes(item[0]))
            .every(([key, value]) => {
              return item.hasOwnProperty(key) && item[key] == value;
            });
        });

        if (this.filterData.minPrice && this.filterData.maxPrice) {
          this.filteredData = this.filteredData.filter((item) => {
            return (
              Number(item.price) >= Number(this.filterData.minPrice) &&
              Number(item.price) <= Number(this.filterData.maxPrice)
            );
          });
        } else if (!this.filterData.minPrice && this.filterData.maxPrice) {
          this.filteredData = this.filteredData.filter((item) => {
            return Number(item.price) <= Number(this.filterData.maxPrice);
          });
        } else if (this.filterData.minPrice && !this.filterData.maxPrice) {
          this.filteredData = this.filteredData.filter(
            (item) => Number(item.price) >= Number(this.filterData.minPrice)
          );
        }

        if (this.filterData.minYear && this.filterData.maxYear) {
          this.filteredData = this.filteredData.filter(
            (item) =>
              Number(item.year) >= Number(this.filterData.minYear) &&
              Number(item.year) <= Number(this.filterData.maxYear)
          );
        } else if (!this.filterData.minYear && this.filterData.maxYear) {
          this.filteredData = this.filteredData.filter(
            (item) => Number(item.year) <= Number(this.filterData.maxYear)
          );
        } else if (this.filterData.minYear && !this.filterData.maxYear) {
          this.filteredData = this.filteredData.filter(
            (item) => Number(item.year) >= Number(this.filterData.minYear)
          );
        }

        if (this.filterData.minMileage && this.filterData.maxMileage) {
          this.filteredData = this.filteredData.filter(
            (item) =>
              (Number(item.kilometers) || Number(item.distance)) >=
                Number(this.filterData.minMileage) &&
              (Number(item.kilometers) || Number(item.distance)) <=
                Number(this.filterData.maxMileage)
          );
        } else if (!this.filterData.minMileage && this.filterData.maxMileage) {
          this.filteredData = this.filteredData.filter((item) => {
            return (
              (Number(item.kilometers) || Number(item.distance)) <=
              Number(this.filterData.maxMileage)
            );
          });
        } else if (this.filterData.minMileage && !this.filterData.maxMileage) {
          this.filteredData = this.filteredData.filter(
            (item) =>
              (Number(item.kilometers) || Number(item.distance)) >=
              Number(this.filterData.minMileage)
          );
        }

        this.$emit("filteredData", this.filteredData);
        this.$store.commit("updateIsFilterApplied", true);
      }
      this.closeFilter();
    },

    closeFilter() {
      this.$emit("close");
    },
  },
};
