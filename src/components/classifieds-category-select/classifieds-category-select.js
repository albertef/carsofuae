import router from "@/router";
import store from "@/store";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "ClassifiedsCategorySelect",

  data() {
    return {
      value: "",
      filterInputId: "carFilter",
    };
  },
  async mounted() {
    store.commit(
      "updateSelectedClassifiedCategory",
      this.queryParams.category || ""
    );
  },
  computed: {
    getSelectedClassifiedCategory() {
      return this.$store.state.home.selectedClassifiedCategory;
    },
    getCategories() {
      return META.classifiedsCategories;
    },
    queryParams() {
      return this.$route.query;
    },
  },
  methods: {
    getCategoryOptions(category) {
      store.commit("updateSelectedClassifiedCategory", category);
      router.push({
        query: {
          ...this.queryParams,
          category: UTILS.formatTitle(this.getSelectedClassifiedCategory),
        },
      });
    },
  },
};
