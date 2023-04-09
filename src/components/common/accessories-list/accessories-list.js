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
      const filteredData = META.accessoriesTypeFormat;
      return filteredData.filter((type) =>
        String(type.title).toLowerCase().includes(this.value.toLowerCase())
      );
    },
    getAccessoryCategories() {
      const filteredData = this.$store.getters.getAccessoriesCategories;
      return filteredData.filter((cat) =>
        String(cat).toLowerCase().includes(this.value.toLowerCase())
      );
    },
    getAccessorySubCategories() {
      const filteredData = this.$store.getters.getAccessoriesSubCategories;
      return filteredData.filter((sub) =>
        String(sub).toLowerCase().includes(this.value.toLowerCase())
      );
    },
    getAccessoryItems() {
      const filteredData = this.$store.getters.getAccessoriesItemList;
      return filteredData.filter((item) =>
        String(item).toLowerCase().includes(this.value.toLowerCase())
      );
    },

    getAccessoriesCount() {
      let length = "";
      if (this.getSelectedAccessoryType) {
        length = this.getAccessoryCategories.length;
      }
      if (this.getSelectedAccessoryCategory) {
        length = this.getAccessorySubCategories.length;
      }
      if (this.getSelectedAccessorySubCategory) {
        length = this.getAccessoryItems.length;
      }
      if (!this.getSelectedAccessoryType) {
        length = this.getAccessoryTypes.length;
      }
      return length;
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
      debugger;
      let name = "";
      if (this.getSelectedAccessoryType) {
        name = "Categories";
      }
      if (this.getSelectedAccessoryCategory) {
        name = "SubCategories";
      }
      if (this.getSelectedAccessorySubCategory) {
        name = "Items";
      }
      if (!this.getSelectedAccessoryType) {
        name = "Types";
      }
      return name;
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
