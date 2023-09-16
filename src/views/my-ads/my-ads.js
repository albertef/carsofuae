import store from "@/store";
import router from "@/router";
import Button from "@/components/common/button/button.vue";
import Select from "@/components/common/select/select.vue";
import { UTILS } from "@/utility/utils.js";
import { META } from "@/meta/common.js";

export default {
  name: "my-ads",
  components: {
    Button,
    Select,
  },
  data() {
    return {
      page: "",
      type: "",
    };
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    adInfo() {
      return store.state.home.myAds;
    },
    getSelectedClassifiedCategory() {
      return store.state.home.selectedClassifiedCategory;
    },
    mainCategoryList() {
      return META.serviceList.map((item) => item.name);
    },
    spareCategoryList() {
      return META.spareCategoryFormat;
    },
    classifiedsCategoryList() {
      return META.classifiedsCategories;
    },
    deleteMyAdInfo() {
      return store.state.home.deleteMyAd;
    },
    garageCategoryList() {
      return META.garageCategoryFormat;
    },
  },

  methods: {
    setPageCategory(cat) {
      this.page = UTILS.formatTitle(cat);
      if (this.page === "classifieds") {
        this.type = "used-cars";
      } else if (this.page === "spare-parts") {
        this.type = "cars";
      } else if (this.page === "garages") {
        this.type = "garages";
      } else {
        this.type = "null";
      }
      this.getMyAds(this.type);
    },
    async getMyAds(type) {
      store.commit("updateLoader", true);
      this.type = type;
      const params = {
        page: this.page,
        type: this.type,
        id: Number(this.loginInfo?.id),
        userType: this.loginInfo?.userType,
      };
      router.push({
        query: {
          ...this.queryParams,
          page: this.page,
          type: this.type,
        },
      });
      await store.dispatch("getMyAds", params);
      store.commit("updateLoader", false);
    },

    async deleteAd(id) {
      store.commit("updateLoader", true);
      const params = {
        page: this.page,
        type: this.type,
        id: id,
        userType: this.loginInfo?.userType,
      };
      await store.dispatch("deleteMyAd", params);
      if (this.deleteMyAdInfo.status) {
        const alert = {
          show: true,
          type: "success",
          message: this.deleteMyAdInfo.message,
        };
        store.commit("updateAlert", alert);
      } else {
        const alert = {
          show: true,
          type: "error",
          message: this.deleteMyAdInfo.message || META.commonErrorMessage,
        };
        store.commit("updateAlert", alert);
      }
      store.commit("updateLoader", false);
      this.getMyAds(this.type);
    },

    async viewAd(id) {
      if (this.page == "classifieds") {
        await this.$store.dispatch("getPostList", { category: this.type });
        router.push({
          name: "PostDetails",
          query: {
            id: id,
            category: this.type,
            title: this.adInfo[0].desc,
          },
        });
      } else if (this.page == "rental") {
        await this.$store.dispatch("getRentalList");
        router.push({
          name: "RentalDetails",
          query: {
            id: id,
            title: this.adInfo[0].desc,
          },
        });
      } else if (this.page == "lease-a-car") {
        await this.$store.dispatch("getLeaseList");
        router.push({
          name: "LeaseACarDetails",
          query: {
            id: id,
            title: this.adInfo[0].desc,
          },
        });
      } else if (this.page == "garages") {
        if (this.type == "garages") {
          await this.$store.dispatch("getGarageList");
          router.push({
            name: "Garages",
            query: {
              id: id,
              name: this.adInfo[0].name,
            },
          });
        } else {
          router.push({
            name: "Garages",
            query: {
              category: "deals",
            },
          });
        }
      } else if (this.page == "spare-parts") {
        await this.$store.dispatch("getSpareItemList", { type: this.type });
        router.push({
          name: "SparePartsDetails",
          query: {
            id: id,
            type: this.type,
            title: `${UTILS.formatTitle(
              this.adInfo[0].name
            )}-${UTILS.formatTitle(this.adInfo[0].description)}`,
          },
        });
      }

      //await store.commit("updateSelectedClassifiedCategory", this.type);
    },
    editAd(id) {
      alert(`Post ID: ${id} editing development is In Progress`);
    },
    formatDate(date) {
      return UTILS.formatDate(date);
    },
  },

  async mounted() {
    if (!this.loginInfo.isLoggedIn) {
      router.push({
        name: "Login",
      });
    } else {
      this.getMyAds(this.type);
    }
  },
};
