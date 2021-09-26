import router from "@/router";
import store from "@/store";
import PostList from "@/components/post-list/post-list.vue";
import CarList from "@/components/common/car-list/car-list.vue";
import ClassifiedsCategorySelect from "@/components/classifieds-category-select/classifieds-category-select.vue";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "classifieds",
  components: {
    PostList,
    CarList,
    ClassifiedsCategorySelect,
  },
  data() {
    return {};
  },
  async mounted() {
    await this.$store.dispatch("getPostList");
    store.commit(
      "updateSelectedClassifiedCategory",
      this.queryParams.category || ""
    );
  },
  computed: {
    getCategories() {
      return META.classifiedsCategories;
    },
    getPostData() {
      const data = this.$store.state.home.postList;
      return data.filter(
        (item) =>
          item.company.toLowerCase() ===
            this.getSelectedCarMake.toLowerCase() &&
          item.model.toLowerCase() === this.getSelectedCarModel.toLowerCase()
      );
    },
    getSelectedClassifiedCategory() {
      return this.$store.state.home.selectedClassifiedCategory;
    },
    getSelectedCarMake() {
      return this.$store.state.home.selectedCarMake;
    },
    getSelectedCarModel() {
      return this.$store.state.home.selectedCarModel;
    },

    queryParams() {
      if (!this.$route.query.make) {
        store.commit("updateSelectedCarMake", "");
      } else if (!this.$route.query.model) {
        store.commit("updateSelectedCarModel", "");
      } else if (!this.$route.query.category) {
        store.commit("updateSelectedClassifiedCategory", "");
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
