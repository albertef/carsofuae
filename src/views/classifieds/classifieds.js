import router from "@/router";
import store from "@/store";
import PostList from "@/components/post-list/post-list.vue";
import CarList from "@/components/common/car-list/car-list.vue";
import MotorCycleList from "@/components/common/motorcycle-list/motorcycle-list.vue";
import SubCategoryList from "@/components/common/sub-category-list/sub-category-list.vue";
import AccessoriesList from "@/components/common/accessories-list/accessories-list.vue";
import ClassifiedsCategorySelect from "@/components/classifieds-category-select/classifieds-category-select.vue";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "classifieds",
  components: {
    PostList,
    CarList,
    ClassifiedsCategorySelect,
    MotorCycleList,
    SubCategoryList,
    AccessoriesList,
  },
  data() {
    return {};
  },
  async mounted() {
    store.commit(
      "updateSelectedClassifiedCategory",
      this.queryParams.category || this.getSelectedClassifiedCategory || ""
    );
    store.commit(
      "updateSelectedSubcategory",
      this.queryParams.subcategory || this.getSelectedSubCategory || ""
    );
    store.commit(
      "updateSelectedAccessoriesType",
      this.queryParams.type || this.getSelectedAccessoryType || ""
    );
    store.commit(
      "updateSelectedAccessoriesCategory",
      this.queryParams.accCategory || this.getSelectedAccessoryCategory || ""
    );
    store.commit(
      "updateSelectedAccessoriesSubCategory",
      this.queryParams.sub || this.getSelectedAccessorySubCategory || ""
    );
    store.commit(
      "updateSelectedAccessoriesItem",
      this.queryParams.item || this.getSelectedAccessoryItem || ""
    );
  },
  computed: {
    getCategories() {
      return META.classifiedsCategories;
    },
    getPostData() {
      const data = this.$store.state.home.postList;
      const filteredData =
        this.getSelectedClassifiedCategory === "used-cars" ||
        this.getSelectedClassifiedCategory === "motorcycles"
          ? data?.filter(
              (item) =>
                item?.brand?.toLowerCase() ===
                  this.getSelectedCarMake?.toLowerCase() &&
                item?.model?.toLowerCase() ===
                  this.getSelectedCarModel?.toLowerCase()
            )
          : this.getSelectedClassifiedCategory === "boats" ||
            this.getSelectedClassifiedCategory === "truck" ||
            this.getSelectedClassifiedCategory === "number-plates"
          ? data?.filter(
              (item) =>
                item?.subCategory?.toLowerCase() ===
                this.getSelectedSubCategory?.toLowerCase()
            )
          : this.getSelectedClassifiedCategory === "accessories-and-parts"
          ? data?.filter(
              (item) =>
                item?.type?.toLowerCase() ===
                  this.getSelectedAccessoryType?.toLowerCase() &&
                item?.category?.toLowerCase() ===
                  this.getSelectedAccessoryCategory?.toLowerCase() &&
                item?.subCategory?.toLowerCase() ===
                  this.getSelectedAccessorySubCategory?.toLowerCase() &&
                item?.item?.toLowerCase() ===
                  this.getSelectedAccessoryItem?.toLowerCase()
            )
          : null;
      return filteredData;
    },
    getSelectedClassifiedCategory() {
      return (
        this.$store.state.home.selectedClassifiedCategory ||
        this.$route.query.category
      );
    },
    getSelectedMotorcycleSubCategory() {
      return (
        this.$store.state.home.selectedMotorCycleSubcategory ||
        this.$route.query.subcategory
      );
    },
    getSelectedSubCategory() {
      return (
        this.$store.state.home.selectedSubcategory ||
        this.$route.query.subcategory
      );
    },
    getSelectedCarMake() {
      return this.$store.state.home.selectedCarMake || this.$route.query.make;
    },
    getSelectedCarModel() {
      return this.$store.state.home.selectedCarModel || this.$route.query.model;
    },

    getSelectedAccessoryType() {
      return (
        this.$store.state.home.selectedAccessoriesType || this.$route.query.type
      );
    },
    getSelectedAccessoryCategory() {
      return (
        this.$store.state.home.selectedAccessoryCategory ||
        this.$route.query.accCategory
      );
    },
    getSelectedAccessorySubCategory() {
      return (
        this.$store.state.home.selectedAccessorySubCategory ||
        this.$route.query.sub
      );
    },
    getSelectedAccessoryItem() {
      return (
        this.$store.state.home.selectedAccessoryItem || this.$route.query.item
      );
    },

    queryParams() {
      if (!this.$route.query.make) {
        store.commit("updateSelectedCarMake", "");
      }
      if (!this.$route.query.model) {
        store.commit("updateSelectedCarModel", "");
      }
      if (!this.$route.query.category) {
        store.commit("updateSelectedClassifiedCategory", "");
      }
      if (!this.$route.query.subcategory) {
        store.commit("updateSelectedSubcategory", "");
      }
      if (!this.$route.query.type) {
        store.commit("updateSelectedAccessoriesType", "");
      }
      if (!this.$route.query.accCategory) {
        store.commit("updateSelectedAccessoriesCategory", "");
      }
      if (!this.$route.query.sub) {
        store.commit("updateSelectedAccessoriesSubCategory", "");
      }
      if (!this.$route.query.item) {
        store.commit("updateSelectedAccessoriesItem", "");
      }
      return this.$route.query;
    },
    getBreadCrumb() {
      return Object.values(this.queryParams);
    },
    getBreadCrumbImage() {
      return this.getSelectedClassifiedCategory
        ? this.getCategories.find(
            (el) =>
              UTILS.formatTitle(el.name) ===
              UTILS.formatTitle(this.getSelectedClassifiedCategory)
          ).image
        : null;
    },
  },
  methods: {},
};
