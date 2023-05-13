import store from "@/store";
import router from "@/router";
import Button from "@/components/common/button/button.vue";

export default {
  name: "super-dashboard",
  components: {
    Button,
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
  },
  methods: {
    async getNonApprovedPosts(page, type) {
      this.page = page;
      this.type = type;
      const params = {
        page: page,
        type: type,
      };
      await store.dispatch("getNonApprovedPosts", params);
    },
    getImagePath(image, folder) {
      const folderPath = folder?.split(",")[0];
      return `${this.$baseURL}upload/${folderPath}/${image}`;
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
