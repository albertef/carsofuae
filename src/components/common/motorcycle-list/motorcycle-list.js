import router from "@/router";
import store from "@/store";
import InputText from "@/components/common/input-text/input-text.vue";
import { UTILS } from "@/utility/utils.js";


export default {
  name: "MotorCycleList",
  components: {
    InputText,
  },
  data() {
    return {
      value: "",
      filterInputId: "motorcycleFilter",
    };
  },
  async mounted() {
    store.commit("updateSelectedMotorCycleSubcategory", this.queryParams.subcategory || "");
    document.getElementById(this.filterInputId)?.focus();
  },
  computed: {
    queryParams() {
      return this.$route.query;
    },
    getSubCategory() {
      const filteredData = UTILS.motorcycleSubcateList();
      return filteredData.filter((item) =>
        String(item).toLowerCase().includes(this.value.toLowerCase())
      );
    },
    getSubCategoryCount() {
      return this.getSubCategory.length;
    },
    getBreadCrumb() {
      return Object.values(this.queryParams);
    },
    getSelectedMotorCycleSubcategory() {
      return this.$store.state.home.selectedMotorCycleSubcategory;
    },
  },
  methods: {
    getposts(subcategory) {
      store.commit("updateSelectedMotorCycleSubcategory", subcategory);
      router.push({
        query: {
          ...this.queryParams,
          subcategory: this.getSelectedMotorCycleSubcategory,
        },
      });
    },
    filterMotorCycleData(e) {
      this.value = e;
    },
  },
};
