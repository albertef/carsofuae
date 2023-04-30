import router from "@/router";
import store from "@/store";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";
import Button from "@/components/common/button/button.vue";

export default {
  name: "SpareCategorySelect",

  components: {
    Button,
  },
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
    loginInfo() {
      return store.state.home.loginInfo;
    },
    userTypes() {
      return META.loginUserType[0];
    },
    showNewPost() {
      return this.loginInfo.userType === this.userTypes.company.title;
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
    newPost() {
      if (this.loginInfo.isLoggedIn) {
        router.push({
          name: "AddNewSparePartsPost",
        });
      } else {
        router.push({
          name: "Login",
        });
      }
    },
  },
};
