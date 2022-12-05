import router from "@/router";
import store from "@/store";
import InputText from "@/components/common/input-text/input-text.vue";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "SpareList",
  components: {
    InputText,
  },
  data() {
    return {
      value: "",
      filterInputId: "spareFilter",
      showSearch: true,
    };
  },
  async mounted() {
    await this.$store.dispatch("getSpareList");
    store.commit(
      "updateSelectedSpareCategory",
      this.queryParams.category || ""
    );
    store.commit(
      "updateSelectedSpareSubCategory",
      this.queryParams.subcategories || ""
    );
    store.commit("updateSelectedSpareItem", this.queryParams.item || "");
    document.getElementById(this.filterInputId)?.focus();
  },
  computed: {
    queryParams() {
      return this.$route.query;
    },
    getSpareList() {
      return this.$store.state.home.spareList;
    },
    getSelectedSpareType() {
      return this.$store.state.home.selectedSpareType;
    },
    getSpareCategories() {
      const filteredData = this.$store.getters.getSpareCategories;
      return filteredData.filter((cat) =>
        String(cat).toLowerCase().includes(this.value.toLowerCase())
      );
    },
    getSpareSubCategories() {
      const filteredData = this.$store.getters.getSpareSubCategories;
      return filteredData.filter((cat) =>
        String(cat).toLowerCase().includes(this.value.toLowerCase())
      );
    },
    getSpareItemList() {
      const filteredData = this.$store.getters.getSpareItemList;
      return filteredData.filter((cat) =>
        String(cat).toLowerCase().includes(this.value.toLowerCase())
      );
    },
    getSpareCategoryCount() {
      return this.getSpareCategories.length;
    },
    getSpareSubCategoryCount() {
      return this.getSpareSubCategories.length;
    },
    getSpareItemCount() {
      return this.getSpareItemList.length;
    },
    getCarModelCount() {
      return this.getAllModels.length;
    },
    getAllModels() {
      const filteredData = this.$store.getters.getAllModels(
        this.getSelectedCarMake
      );
      return filteredData.filter((model) =>
        String(model).toLowerCase().includes(this.value.toLowerCase())
      );
    },
    getSelectedSpareCategory() {
      return this.$store.state.home.selectedSpareCategory;
    },
    getSelectedSpareSubCategory() {
      return this.$store.state.home.selectedSpareSubCategory;
    },
    getSelectedSpareItem() {
      return this.$store.state.home.selectedSpareItem;
    },
    getBreadCrumb() {
      return Object.values(this.queryParams);
    },
    getCountText() {
      if (this.getSelectedSpareType && !this.getSelectedSpareCategory) {
        return `${this.getSpareCategoryCount} Categories Found`;
      } else if (
        this.getSelectedSpareType &&
        this.getSelectedSpareCategory &&
        !this.getSelectedSpareSubCategory
      ) {
        return `${this.getSpareSubCategoryCount} Sub Categories Found`;
      } else if (
        this.getSelectedSpareType &&
        this.getSelectedSpareCategory &&
        this.getSelectedSpareSubCategory
      ) {
        return `${this.getSpareItemCount} Items Found`;
      } else {
        return "";
      }
    },
    getHeading() {
      if (this.getSelectedSpareType && !this.getSelectedSpareCategory) {
        return ` Categories`;
      } else if (
        this.getSelectedSpareType &&
        this.getSelectedSpareCategory &&
        !this.getSelectedSpareSubCategory
      ) {
        return ` Sub Categories`;
      } else if (
        this.getSelectedSpareType &&
        this.getSelectedSpareCategory &&
        this.getSelectedSpareSubCategory
      ) {
        return ` Items`;
      } else {
        return "";
      }
    },
  },

  methods: {
    getSpareSub(category) {
      store.commit("updateSelectedSpareCategory", category);
      router.push({
        query: {
          ...this.queryParams,
          category: UTILS.formatTitle(this.getSelectedSpareCategory),
        },
      });
      if (this.getSpareSubCategoryCount) {
        this.value = "";
        document.getElementById(this.filterInputId).focus();
        this.showSearch = true;
      } else {
        this.showSearch = false;
        this.getSparePostList("");
      }
    },
    getSpareItems(sub) {
      store.commit("updateSelectedSpareSubCategory", sub);
      router.push({
        query: {
          ...this.queryParams,
          subcategory: UTILS.formatTitle(this.getSelectedSpareSubCategory),
        },
      });
      if (this.getSpareItemCount) {
        this.value = "";
        document.getElementById(this.filterInputId).focus();
        this.showSearch = true;
      } else {
        this.showSearch = false;
        this.getSparePostList("");
      }
    },
    getSparePostList(item) {
      store.commit("updateSelectedSpareItem", item);
      router.push({
        query: {
          ...this.queryParams,
          item: UTILS.formatTitle(this.getSelectedSpareItem),
        },
      });

      this.showSearch = false;
    },
    filterSpareData(e) {
      this.value = e;
    },
  },
};
