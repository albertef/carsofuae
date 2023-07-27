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
        const filteredData = this.fullPostData.filter((item) => {
          return Object.entries(this.filterData).every(([key, value]) => {
            return item.hasOwnProperty(key) && item[key] === value;
          });
        });

        this.$emit("filteredData", filteredData);
        this.$store.commit("updateIsFilterApplied", true);
      }
      this.closeFilter();
    },

    closeFilter() {
      this.$emit("close");
    },
  },
};
