import router from "@/router";
import store from "@/store";
import InputText from "@/components/common/input-text/input-text.vue";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "BoatList",
  components: {
    InputText,
  },
  data() {
    return {
      value: "",
      filterInputId: "boatFilter",
    };
  },
  async mounted() {
    store.commit("updateSelectedSubcategory", "");
    document.getElementById(this.filterInputId)?.focus();
  },
  computed: {
    queryParams() {
      return this.$route.query;
    },

    getSubCategory() {
      const filteredData = UTILS.subcategoryDropDownValues(
        this.getSelectedClassifiedCategory
      );
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
    getSelectedSubcategory() {
      return (
        this.$store.state.home.selectedSubcategory ||
        this.$route.query.subcategory
      );
    },
    getSelectedClassifiedCategory() {
      return (
        this.$store.state.home.selectedClassifiedCategory ||
        this.$route.query.category
      );
    },
  },
  methods: {
    getposts(subcategory) {
      store.commit("updateSelectedSubcategory", subcategory);
      router.push({
        query: {
          ...this.queryParams,
          subcategory: this.getSelectedSubcategory,
        },
      });
    },
    filterBoatData(e) {
      this.value = e;
    },
  },
};
