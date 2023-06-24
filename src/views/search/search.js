import store from "@/store";
import router from "@/router";
import Button from "@/components/common/button/button.vue";
import Select from "@/components/common/select/select.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import { UTILS } from "@/utility/utils.js";
import { META } from "@/meta/common.js";

export default {
  name: "search",
  components: {
    Button,
    Select,
    InputText,
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
      return store.getters.getSearchData;
    },
    getClassifiedsCategories() {
      return META.classifiedsCategories;
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
  },

  async mounted() {
    // if (!this.loginInfo.isLoggedIn) {
    //   router.push({
    //     name: "Login",
    //   });
    // } else {
    //   this.getMyAds(this.type);
    // }
  },
};
