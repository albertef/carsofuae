import SuperLoginForm from "@/components/super-login-form/super-login-form.vue";
import store from "@/store";

export default {
  name: "superLogin",
  components: {
    SuperLoginForm,
  },

  mounted() {
    if (store.state.home.superLoginInfo.status) {
      this.$router.push({ name: "SuperDashboard" });
    }
  },
};
