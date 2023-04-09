import Radio from "@/components/common/radio/radio.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import Button from "@/components/common/button/button.vue";
import store from "@/store";
import router from "@/router";
import { META } from "@/meta/common.js";

export default {
  name: "ForgotPasswordForm",
  components: {
    Radio,
    InputText,
    Button,
  },

  data() {
    return {
      username: "",
      forgotPasswordValidation: {},
    };
  },
  mounted() {
    if (this.loginInfo.isLoggedIn) {
      this.$router.go(-1);
    }
    if (!this.selectedUserType) {
      this.selectedUserType = this.userTypes?.individual?.title;
    }
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    forgotPasswordInfo() {
      return store.state.home.forgotPasswordInfo;
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
  },
  methods: {
    validateForgotPasswordForm() {
      this.forgotPasswordValidation = {
        ...this.forgotPasswordValidation,
        username: !this.username,
      };
      return Object.values(this.forgotPasswordValidation).every(
        (el) => el === false
      )
        ? true
        : false;
    },
    updateUsername(e) {
      this.username = e;
    },
    async forgotPassword() {
      if (this.validateForgotPasswordForm()) {
        const params = {
          username: this.username,
          userType: this.selectedUserType,
        };
        store.commit("updateLoader", true);
        await this.$store.dispatch("forgotPassword", params);
        store.commit("updateLoader", false);
        if (this.forgotPasswordInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.forgotPasswordInfo.message,
          };
          store.commit("updateAlert", alert);
          router.push({ name: "Login" });
        } else {
          const alert = {
            show: true,
            type: "error",
            message: this.forgotPasswordInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }
      }
    },
    cancelReset() {
      router.push({ name: "Login" });
    },
  },
};
