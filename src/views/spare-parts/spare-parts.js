import router from "@/router";
import store from "@/store";
import PostList from "@/components/post-list/post-list.vue";
import SpareList from "@/components/spare-list/spare-list.vue";
import SpareCategorySelect from "@/components/spare-category-select/spare-category-select.vue";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "spareParts",
  components: {
    PostList,
    SpareList,
    SpareCategorySelect,
  },
  data() {
    return {};
  },
  async mounted() {
    await this.$store.dispatch("getSpareList");
    store.commit("updateSelectedSpareType", this.queryParams.category || "");
  },
  computed: {
    getCategories() {
      return this.$store.getters.getSpareCategories;
    },
    async getSpareList() {
      return this.$store.state.home.spareList;
    },
    getPostData() {
      const data = this.$store.state.home.spareList;
      return data.filter(
        (item) =>
          item === this.getSelectedSpareType.toLowerCase() &&
          item.category.toLowerCase() ===
            this.getSelectedSpareCategory.toLowerCase() &&
          item.sub.toLowerCase() ===
            this.getSelectedSpareSubCategory.toLowerCase() &&
          item.item.toLowerCase() === this.getSelectedSpareItem.toLowerCase()
      );
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
      ).image;
    },
  },
  methods: {},
};
