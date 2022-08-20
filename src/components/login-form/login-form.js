import Radio from "@/components/common/radio/radio.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import Button from "@/components/common/button/button.vue";
import store from "@/store";
import router from "@/router";
import { META } from "@/meta/common.js";

export default {
  name: "LoginForm",
  components: {
    Radio,
    InputText,
    Button,
  },

  data() {
    return {
      username: "",
      password: "",
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
    updateUsername(e) {
      this.username = e;
    },
    updatePassword(e) {
      this.password = e;
    },
    async submitLogin() {
      const params = {
        username: this.username,
        password: this.password,
        userType: this.selectedUserType,
      };
      store.commit("updateLoader", true);
      await this.$store.dispatch("userLogin", params);
      store.commit("updateLoader", false);
      if (this.loginInfo.isLoggedIn) {
        const alert = {
          show: true,
          type: "success",
          message: this.loginInfo.message,
        };
        store.commit("updateAlert", alert);
        this.$router.go(-1);
      } else {
        const alert = {
          show: true,
          type: "error",
          message: this.loginInfo.message || META.commonErrorMessage,
        };
        store.commit("updateAlert", alert);
      }
    },
    cancelLogin() {
      this.$router.go(-1);
    },
    newUserRegister() {
      router.push({
        name: "Register",
      });
    },
  },
};
