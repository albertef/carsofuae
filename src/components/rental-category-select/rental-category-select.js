import router from "@/router";
import store from "@/store";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";
import Button from "@/components/common/button/button.vue";

export default {
  name: "RentalCategorySelect",
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
      "updateSelectedRentalCategory",
      this.queryParams.category || ""
    );
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    getSelectedRentalCategory() {
      return this.$store.state.home.selectedRentalCategory;
    },
    getCategories() {
      return META.rentalCarTypes;
    },
    queryParams() {
      return this.$route.query;
    },
  },
  methods: {
    getCategoryOptions(category) {
      store.commit("updateSelectedRentalCategory", category);
      router.push({
        query: {
          ...this.queryParams,
          category: UTILS.formatTitle(this.getSelectedRentalCategory),
        },
      });
    },
    newPost() {
      if (this.loginInfo.isLoggedIn) {
        router.push({
          name: "AddNewRental",
        });
      } else {
        router.push({
          name: "Login",
        });
      }
    },
  },
};
