import router from "@/router";
import store from "@/store";
import PostList from "@/components/post-list/post-list.vue";
import CarList from "@/components/common/car-list/car-list.vue";
import MotorCycleList from "@/components/common/motorcycle-list/motorcycle-list.vue";
import SubCategoryList from "@/components/common/sub-category-list/sub-category-list.vue";

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
  },
  data() {
    return {};
  },
  async mounted() {
    store.commit(
      "updateSelectedClassifiedCategory",
      this.queryParams.category || this.getSelectedClassifiedCategory || ""
    );
    store.commit("updateSelectedSubcategory", "");
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

    queryParams() {
      if (!this.$route.query.make) {
        store.commit("updateSelectedCarMake", "");
      } else if (!this.$route.query.model) {
        store.commit("updateSelectedCarModel", "");
      } else if (!this.$route.query.category) {
        store.commit("updateSelectedClassifiedCategory", "");
      } else if (!this.$route.query.subcategory) {
        store.commit("updateSelectedSubcategory", "");
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
