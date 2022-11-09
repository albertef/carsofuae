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
    store.commit("updateSelectedBoatSubcategory", this.queryParams.subcategory || "");
    document.getElementById(this.filterInputId)?.focus();
  },
  computed: {
    queryParams() {
      return this.$route.query;
    },

    getSubCategory() {
      const filteredData = UTILS.subcategoryDropDownValues();
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
    getSelectedBoatSubcategory() {
      return this.$store.state.home.selectedBoatSubcategory;
    },
  },
  methods: {
    getposts(subcategory) {
      store.commit("updateSelectedBoatSubcategory", subcategory);
      router.push({
        query: {
          ...this.queryParams,
          subcategory: this.getSelectedBoatSubcategory,
        },
      });
    },
    filterBoatData(e) {
      this.value = e;
    },
  },
};
