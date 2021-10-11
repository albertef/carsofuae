import router from "@/router";
import store from "@/store";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "LeaseCategorySelect",

  data() {
    return {
      value: "",
      filterInputId: "carFilter",
    };
  },
  async mounted() {
    store.commit(
      "updateSelectedLeaseCategory",
      this.queryParams.category || ""
    );
  },
  computed: {
    getSelectedLeaseCategory() {
      return this.$store.state.home.selectedLeaseCategory;
    },
    getCategories() {
      return META.leaseCarTypes;
    },
    queryParams() {
      return this.$route.query;
    },
  },
  methods: {
    getCategoryOptions(category) {
      store.commit("updateSelectedLeaseCategory", category);
      router.push({
        query: {
          ...this.queryParams,
          category: UTILS.formatTitle(this.getSelectedLeaseCategory),
        },
      });
    },
  },
};
