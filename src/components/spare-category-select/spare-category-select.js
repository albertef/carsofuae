import router from "@/router";
import store from "@/store";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "SpareCategorySelect",

  data() {
    return {
      value: "",
      filterInputId: "spareFilter",
    };
  },
  async mounted() {
    store.commit("updateSelectedSpareType", this.queryParams.type || "");
  },
  computed: {
    getSelectedSpareType() {
      return this.$store.state.home.selectedSpareType;
    },
    getCategories() {
      return this.getSpareList && this.getSpareList[0]
        ? Object.keys(this.getSpareList[0])
        : null;
    },

    getSpareList() {
      return this.$store.state.home.spareList;
    },
    queryParams() {
      return this.$route.query;
    },
  },
  methods: {
    getCategoryOptions(type) {
      store.commit("updateSelectedSpareType", type);
      router.push({
        query: {
          ...this.queryParams,
          type: UTILS.formatTitle(this.getSelectedSpareType),
        },
      });
    },
    formatCategory(val) {
      const asd = META.spareCategoryFormat.find((item) => item.id === val);
      return asd || null;
    },
  },
};
