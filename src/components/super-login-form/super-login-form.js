import InputText from "@/components/common/input-text/input-text.vue";
import Button from "@/components/common/button/button.vue";
import store from "@/store";
import router from "@/router";
import { META } from "@/meta/common.js";

export default {
  name: "SuperLoginForm",
  components: {
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
    if (this.superLoginInfo.status) {
      router.push({ name: "SuperDashboard" });
    }
  },
  computed: {
    superLoginInfo() {
      return store.state.home.superLoginInfo;
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
      };
      store.commit("updateLoader", true);
      await this.$store.dispatch("superUserLogin", params);
      store.commit("updateLoader", false);
      if (this.superLoginInfo.status) {
        const alert = {
          show: true,
          type: "success",
          message: this.superLoginInfo.message,
        };
        store.commit("updateAlert", alert);
        router.push({ name: "SuperDashboard" });
      } else {
        const alert = {
          show: true,
          type: "error",
          message: this.superLoginInfo.message || META.commonErrorMessage,
        };
        store.commit("updateAlert", alert);
      }
    },
    cancelLogin() {
      this.$router.go(-1);
    },
  },
};
