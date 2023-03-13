import router from "@/router";
import store from "@/store";
import InputText from "@/components/common/input-text/input-text.vue";
import { META } from "@/meta/common.js";

export default {
  name: "AccessoriesList",
  components: {
    InputText,
  },
  data() {
    return {
      value: "",
      filterInputId: "accessoriesFilter",
    };
  },
  async mounted() {
    await this.$store.dispatch("getAccessoriesList");
    store.commit("updateSelectedAccessoriesType", this.queryParams.type || "");
    store.commit(
      "updateSelectedAccessoriesCategory",
      this.queryParams.accCategory || ""
    );
    store.commit(
      "updateSelectedAccessoriesSubCategory",
      this.queryParams.sub || ""
    );
    document.getElementById(this.filterInputId)?.focus();
  },
  computed: {
    queryParams() {
      return this.$route.query;
    },
    getAccessoryTypes() {
      return META.accessoriesTypeFormat;
    },
    getAccessoryCategories() {
      return this.$store.getters.getAccessoriesCategories;
    },
    getAccessorySubCategories() {
      return this.$store.getters.getAccessoriesSubCategories;
    },
    getAccessoryItems() {
      return this.$store.getters.getAccessoriesItemList;
    },

    getAccessoriesTypeCount() {
      return this.getAccessoryTypes.length;
    },
    getCarModelCount() {
      return this.getAllModels.length;
    },

    getSelectedAccessoryType() {
      return this.$store.state.home.selectedAccessoriesType;
    },
    getSelectedAccessoryCategory() {
      return this.$store.state.home.selectedAccessoryCategory;
    },
    getSelectedAccessorySubCategory() {
      return this.$store.state.home.selectedAccessorySubCategory;
    },
    getSelectedAccessoryItem() {
      return this.$store.state.home.selectedAccessoryItem;
    },
    getSelectedAccessoriesType() {
      if (this.$store.state.home.selectedAccessoriesType) {
        return "Category";
      } else if (this.$store.state.home.selectedAccessoryCategory) {
        return "SubCategory";
      } else {
        return "Type";
      }
    },

    getBreadCrumb() {
      return Object.values(this.queryParams);
    },
  },
  methods: {
    showAccessoryCategories(type) {
      store.commit("updateSelectedAccessoriesType", type);
      this.value = "";
      document.getElementById(this.filterInputId).focus();
      router.push({
        query: {
          ...this.queryParams,
          type: this.getSelectedAccessoryType,
        },
      });
    },
    showAccessorySubCategories(category) {
      store.commit("updateSelectedAccessoriesCategory", category);
      this.value = "";
      document.getElementById(this.filterInputId).focus();
      router.push({
        query: {
          ...this.queryParams,
          accCategory: this.getSelectedAccessoryCategory,
        },
      });
    },
    showAccessoryItems(sub) {
      store.commit("updateSelectedAccessoriesSubCategory", sub);
      this.value = "";
      document.getElementById(this.filterInputId).focus();
      router.push({
        query: {
          ...this.queryParams,
          sub: this.getSelectedAccessorySubCategory,
        },
      });
    },
    showPosts(item) {
      store.commit("updateSelectedAccessoriesItem", item);
      router.push({
        query: {
          ...this.queryParams,
          item: this.getSelectedAccessoryItem,
        },
      });
    },
    filterAccessoriesData(e) {
      this.value = e;
    },
  },
};
