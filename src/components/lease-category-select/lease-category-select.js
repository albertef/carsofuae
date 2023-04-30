import router from "@/router";
import store from "@/store";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";
import Button from "@/components/common/button/button.vue";

export default {
  name: "LeaseCategorySelect",
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
      "updateSelectedLeaseCategory",
      this.queryParams.category || ""
    );
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    getSelectedLeaseCategory() {
      return this.$store.state.home.selectedLeaseCategory;
    },
    getCategories() {
      return META.leaseCarTypes;
    },
    queryParams() {
      return this.$route.query;
    },
    userTypes() {
      return META.loginUserType[0];
    },
    showNewPost() {
      return this.loginInfo.userType === this.userTypes.company.title;
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
    newPost() {
      if (this.loginInfo.isLoggedIn) {
        router.push({
          name: "AddNewLease",
        });
      } else {
        router.push({
          name: "Login",
        });
      }
    },
  },
};
