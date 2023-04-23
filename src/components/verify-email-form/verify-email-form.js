import Button from "@/components/common/button/button.vue";
import store from "@/store";
import router from "@/router";
import { META } from "@/meta/common.js";
import dayjs from "dayjs";

export default {
  name: "VerifyEmailForm",
  components: {
    Button,
  },

  data() {
    return {
      isSuccess: false,
      textInfo: "",
    };
  },

  async mounted() {
    if (this.loginInfo.isLoggedIn) {
      router.push({ name: "Login" });
    }

    if (this.isValid) {
      const params = {
        username: this.userName,
        userType: this.userType,
      };
      store.commit("updateLoader", true);
      await this.$store.dispatch("verifyEmail", params);
      store.commit("updateLoader", false);
      if (this.verifyEmailInfo.status) {
        this.textInfo =
          "You have successfully verified your email. You can continue to login using your credentials.";
        const alert = {
          show: true,
          type: "success",
          message: this.verifyEmailInfo.message,
        };
        store.commit("updateAlert", alert);
        //router.push({ name: "Login" });
      } else {
        this.textInfo =
          "The link you have clicked is not valid anymore. Use below buttons to navigate.";
        const alert = {
          show: true,
          type: "error",
          message: this.verifyEmailInfo.message || META.commonErrorMessage,
        };
        store.commit("updateAlert", alert);
      }
    } else {
      this.textInfo =
        "The link you have clicked is not valid anymore. Use below buttons to navigate.";
    }
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    verifyEmailInfo() {
      return store.state.home.verifyEmailInfo;
    },
    queryParams() {
      return this.$route.query;
    },
    resetDate() {
      return this.queryParams.d
        ? dayjs.utc(window.atob(this.queryParams.d))
        : null;
    },
    currentDate() {
      return dayjs();
    },
    timeDiff() {
      return this.currentDate.diff(this.resetDate);
    },
    isValid() {
      return (
        Boolean(this.userType) &&
        Boolean(this.resetDate) &&
        Boolean(this.userName) &&
        this.timeDiff < 900000
      );
    },
    userType() {
      return this.queryParams.t ? window.atob(this.queryParams.t) : null;
    },
    userName() {
      return this.queryParams.u ? window.atob(this.queryParams.u) : null;
    },
  },
  methods: {
    homePage() {
      router.push({ name: "Home" });
    },
    loginPage() {
      router.push({ name: "Login" });
    },
  },
};
