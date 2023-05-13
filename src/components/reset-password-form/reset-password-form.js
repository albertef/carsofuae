import Radio from "@/components/common/radio/radio.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import Button from "@/components/common/button/button.vue";
import store from "@/store";
import router from "@/router";
import { META } from "@/meta/common.js";
import dayjs from "dayjs";

export default {
  name: "ResetPasswordForm",
  components: {
    Radio,
    InputText,
    Button,
  },

  data() {
    return {
      resetValues: {
        newPassword: "",
        confirmNewPassword: "",
      },
      resetPasswordValidation: {},
    };
  },
  mounted() {
    if (this.loginInfo.isLoggedIn) {
      router.push({ name: "Login" });
    }
    if (!this.selectedUserType) {
      this.selectedUserType = this.userTypes?.individual?.title;
    }
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    resetPasswordInfo() {
      return store.state.home.resetPasswordInfo;
    },
    userTypes() {
      return META.loginUserType[0];
    },
    selectedUserType: {
      get() {
        return store.state.home.selectedUserType;
      },
      set(value) {
        //this.resetValidation();
        store.commit("updateSelectedUserType", value);
      },
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
    validateResetPasswordForm() {
      this.resetPasswordValidation = {
        ...this.resetPasswordValidation,
        newPassword: !this.resetValues.newPassword,
        confirmNewPassword:
          !this.resetValues.confirmNewPassword ||
          this.resetValues.newPassword !== this.resetValues.confirmNewPassword,
      };
      return Object.values(this.resetPasswordValidation).every(
        (el) => el === false
      )
        ? true
        : false;
    },
    updatePassword(key, e) {
      this.resetValues = {
        ...this.resetValues,
        [key]: e,
      };
      this.validateResetPasswordForm();
    },
    async resetPassword() {
      if (this.validateResetPasswordForm()) {
        const params = {
          username: this.userName,
          userType: this.userType,
          password: this.resetValues.newPassword,
        };
        store.commit("updateLoader", true);
        await this.$store.dispatch("resetPassword", params);
        store.commit("updateLoader", false);
        if (this.resetPasswordInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.resetPasswordInfo.message,
          };
          store.commit("updateAlert", alert);
          router.push({ name: "Login" });
        } else {
          const alert = {
            show: true,
            type: "error",
            message: this.resetPasswordInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }
      }
    },
    cancelReset() {
      router.push({ name: "Login" });
    },
    homePage() {
      router.push({ name: "Home" });
    },
    forgotPasswordPage() {
      router.push({ name: "ForgotPassword" });
    },
    loginPage() {
      router.push({ name: "Login" });
    },
  },
};
