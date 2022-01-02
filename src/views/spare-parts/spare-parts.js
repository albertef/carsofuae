import router from "@/router";
import store from "@/store";
import SpareItemsList from "@/components/spare-items-list/spare-items-list.vue";
import SpareList from "@/components/spare-list/spare-list.vue";
import SpareCategorySelect from "@/components/spare-category-select/spare-category-select.vue";
import { META } from "@/meta/common.js";

export default {
  name: "spareParts",
  components: {
    SpareItemsList,
    SpareList,
    SpareCategorySelect,
  },
  data() {
    return {};
  },
  async mounted() {
    await this.$store.dispatch("getSpareList");
    await this.$store.dispatch("getSpareItemList");
  },
  computed: {
    getSpareItemList() {
      return this.$store.state.home.spareItemList;
    },
    getPostData() {
      const data = this.getSpareItemList;
      let filteredData = data;
      if (this.getSelectedSpareType) {
        filteredData = data?.filter(
          (item) =>
            item.type.toLowerCase() === this.getSelectedSpareType.toLowerCase()
        );
      }
      if (this.getSelectedSpareCategory) {
        filteredData = filteredData?.filter(
          (item) =>
            item.category.toLowerCase() ===
            this.getSelectedSpareCategory.toLowerCase()
        );
      }
      if (this.getSelectedSpareSubCategory) {
        filteredData = filteredData?.filter(
          (item) =>
            item.subcategory.toLowerCase() ===
            this.getSelectedSpareSubCategory.toLowerCase()
        );
      }
      if (this.getSelectedSpareItem) {
        filteredData = filteredData?.filter(
          (item) =>
            item.item.toLowerCase() === this.getSelectedSpareItem.toLowerCase()
        );
      }

      return filteredData;
    },
    getSelectedSpareType() {
      return this.$store.state.home.selectedSpareType;
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

    queryParams() {
      if (!this.$route.query.type) {
        store.commit("updateSelectedSpareType", "");
      } else if (!this.$route.query.category) {
        store.commit("updateSelectedSpareCategory", "");
      } else if (!this.$route.query.subcategory) {
        store.commit("updateSelectedSpareSubCategory", "");
      } else if (!this.$route.query.item) {
        store.commit("updateSelectedSpareItem", "");
      }
      return this.$route.query;
    },
    getBreadCrumb() {
      return Object.values(this.queryParams);
    },
    getBreadCrumbImage() {
      return META.spareCategoryFormat.find(
        (item) => item.id === this.getSelectedSpareType
      )?.image;
    },
  },
  methods: {},
};
