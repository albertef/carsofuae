import store from "@/store";
import router from "@/router";
import Button from "@/components/common/button/button.vue";
import { CONSTANTS } from "@/utility/constants.js";
import { UTILS } from "@/utility/utils.js";
import { META } from "@/meta/common.js";

export default {
  name: "user-profile",
  components: {
    Button,
  },
  computed: {
    userInfo() {
      return store.state.home.userDetails;
    },
    loginInfo() {
      return store.state.home.loginInfo;
    },
    baseURL() {
      return CONSTANTS.APP_BASE_URL;
    },
    selectedUserType() {
      return store.state.home.selectedUserType;
    },
    userTypes() {
      return META.loginUserType[0];
    },
  },

  methods: {
    openPhone(num) {
      document.location.href = `tel:${num}`;
    },
    socialOpen(link) {
      window.open(link);
    },
    openWhatsapp(num) {
      window.open(`https://wa.me/${num.replace(/[^\d\+]/g, "")}`);
    },
    openEmail(email) {
      window.location.href = `mailto:${email}`;
    },
    formatDate(date) {
      return UTILS.formatDate(date);
    },
    logout() {
      store.commit("updateLoginInfo", null);
      store.commit("updateUserDetails", null);
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
    getImageFolderName(value) {
      return value.split(",")[0];
    },
    getSliderImages(value) {
      return value.split(",");
    },
  },

  async mounted() {
    if (!this.loginInfo.isLoggedIn) {
      router.push({
        name: "Login",
      });
    } else {
      if (!this.selectedUserType) {
        store.commit("updateSelectedUserType", this.loginInfo.userType);
      }
      if (!this.userInfo?.id) {
        store.commit("updateLoader", true);
        const usernameParams = {
          username: this.loginInfo?.username,
          id: Number(this.loginInfo?.id),
          userType: this.loginInfo.userType,
        };
        await this.$store.dispatch("userDetails", usernameParams);
        store.commit("updateLoader", false);
      }
    }
  },
};
