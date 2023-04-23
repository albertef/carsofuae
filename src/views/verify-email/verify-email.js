import VerifyEmailForm from "@/components/verify-email-form/verify-email-form.vue";
import store from "@/store";

export default {
  name: "verify-email",
  components: {
    VerifyEmailForm,
  },

  mounted() {
    if (store.state.home.loginInfo.isLoggedIn) {
      router.push({ name: "Login" });
    }
  },
};
