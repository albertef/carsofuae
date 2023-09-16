import store from "@/store";
import router from "@/router";
import Button from "@/components/common/button/button.vue";
import Select from "@/components/common/select/select.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import { UTILS } from "@/utility/utils.js";
import { META } from "@/meta/common.js";
import TextArea from "@/components/common/text-area/text-area.vue";

export default {
  name: "search",
  components: {
    Button,
    Select,
    InputText,
    TextArea,
  },
  data() {
    return {
      search: {
        key: "",
        category: "",
      },
      searchValidation: {},
    };
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    mainCategoryList() {
      return META.serviceList.map((item) => item.name);
    },
    getSearchData() {
      return store.getters.getSearchData(this.search.category);
    },
    getClassifiedsCategories() {
      return META.classifiedsCategories;
    },
    utils() {
      return UTILS;
    },
    isSearchData() {
      return this.getSearchData?.some(
        (item) => item.length || item[Object.keys(item)].length
      );
    },
  },

  methods: {
    updateSearchData(key, e) {
      store.commit("updateSearchData", {});
      key == "category" ? (e = UTILS.formatTitle(e)) : e;
      this.search = {
        ...this.search,
        [key]: e,
      };
    },

    resetValidation() {
      this.searchValidation = {};
    },

    validateSearchForm() {
      this.searchValidation = {
        ...this.searchValidation,
        key: !this.search.key,
        category: !this.search.category,
      };

      return Object.values(this.searchValidation).every((el) => el === false)
        ? true
        : false;
    },

    async submitPost() {
      store.commit("updateSearchData", {});
      if (this.validateSearchForm()) {
        store.commit("updateLoader", true);
        await store.dispatch("search", this.search);
        store.commit("updateLoader", false);
      }
    },

    getImagePath(image, folder) {
      const folderPath = folder?.split(",")[0];
      return `${this.$baseURL}upload/${folderPath}/${image}`;
    },

    async viewPost(id, category = null) {
      if (this.search.category == "classifieds") {
        await this.$store.dispatch("getPostList", { category: category });
        router.push({
          name: "PostDetails",
          query: {
            id: id,
            category: category,
          },
        });
      } else if (this.search.category == "rental") {
        await this.$store.dispatch("getRentalList");
        router.push({
          name: "RentalDetails",
          query: {
            id: id,
          },
        });
      } else if (this.search.category == "lease-a-car") {
        await this.$store.dispatch("getLeaseList");
        router.push({
          name: "LeaseACarDetails",
          query: {
            id: id,
          },
        });
      } else if (this.search.category == "garages") {
        await this.$store.dispatch("getGarageList");
        router.push({
          name: "Garages",
          query: {
            id: id,
          },
        });
      } else if (this.search.category == "spare-parts") {
        await this.$store.dispatch("getSpareItemList", { type: category });
        router.push({
          name: "SparePartsDetails",
          query: {
            id: id,
            type: category,
          },
        });
      }
      store.commit("updateSearchData", {});
    },
  },

  async mounted() {
    store.commit("updateSearchData", {});
  },
};
