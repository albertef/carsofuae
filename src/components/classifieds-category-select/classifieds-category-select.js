import router from "@/router";
import store from "@/store";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";
import Button from "@/components/common/button/button.vue";

export default {
  name: "ClassifiedsCategorySelect",

  components: {
    Button,
  },

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
      return store.state.home.selectedClassifiedCategory;
    },
    getCategories() {
      return META.classifiedsCategories;
    },
    queryParams() {
      return this.$route.query;
    },
    loginInfo() {
      return store.state.home.loginInfo;
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
    newPost() {
      if (this.loginInfo.isLoggedIn) {
        router.push({
          name: "AddNewPost",
        });
      } else {
        router.push({
          name: "Login",
        });
      }
    },
  },
};
