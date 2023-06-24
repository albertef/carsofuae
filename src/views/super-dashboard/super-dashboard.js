import store from "@/store";
import router from "@/router";
import Button from "@/components/common/button/button.vue";
import Select from "@/components/common/select/select.vue";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";
import rentalFeaturesList from "@/meta/features.json";

export default {
  name: "super-dashboard",
  components: {
    Button,
    Select,
  },
  data() {
    return {
      page: "classifieds",
      type: "used-cars",
    };
  },
  async created() {
    if (this.superLoginInfo && this.superLoginInfo.status) {
      store.commit("updateLoader", true);
      const params = {
        page: "classifieds",
        type: "used-cars",
      };
      await store.dispatch("getNonApprovedPosts", params);
      store.commit("updateLoader", false);
    } else {
      router.push({ name: "SuperLogin" });
    }
  },
  computed: {
    nonApprovedPostList() {
      return store.state.home.nonApprovedPostList;
    },
    postApproval() {
      return store.state.home.postApproval;
    },
    postDecline() {
      return store.state.home.postDecline;
    },
    superLoginInfo() {
      return store.state.home.superLoginInfo;
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
  },
  methods: {
    setPageCategory(cat) {
      this.page = UTILS.formatTitle(cat);
      if (this.page === "classifieds") {
        this.type = "used-cars";
      } else if (this.page === "spare-parts") {
        this.type = "cars";
      } else {
        this.type = "other";
      }
      this.getNonApprovedPosts(this.type);
    },
    async getNonApprovedPosts(type) {
      store.commit("updateLoader", true);
      this.type = type;
      const params = {
        page: this.page,
        type: this.type,
      };
      router.push({
        query: {
          ...this.queryParams,
          page: this.page,
          type: this.type,
        },
      });
      await store.dispatch("getNonApprovedPosts", params);
      store.commit("updateLoader", false);
    },
    getImagePath(image, folder) {
      const folderPath = folder?.split(",")[0];
      return `${this.$baseURL}upload/${folderPath}/${image}`;
    },
    getFeaturesList(value) {
      return rentalFeaturesList.filter((item) => value.includes(item.id));
    },
    async approve(id) {
      store.commit("updateLoader", true);
      const params = {
        page: this.page,
        type: this.type,
        id: id,
      };
      await store.dispatch("approvePost", params);
      await store.dispatch("getNonApprovedPosts", params);
      store.commit("updateLoader", false);
      if (this.postApproval.status) {
        const alert = {
          show: true,
          type: "success",
          message: this.postApproval.message,
        };
        store.commit("updateAlert", alert);
      }
    },
    async decline(id) {
      store.commit("updateLoader", true);
      const params = {
        page: this.page,
        type: this.type,
        id: id,
      };
      await store.dispatch("declinePost", params);
      await store.dispatch("getNonApprovedPosts", params);
      store.commit("updateLoader", false);
      if (this.postDecline.status) {
        const alert = {
          show: true,
          type: "success",
          message: this.postDecline.message,
        };
        store.commit("updateAlert", alert);
      }
    },
    logout() {
      store.commit("updateSuperLoginInfo", null);
      const alert = {
        show: true,
        type: "success",
        message: "User Logged out Successfully!",
      };
      store.commit("updateAlert", alert);
      router.push({
        name: "Home",
      });
    },
  },
};
