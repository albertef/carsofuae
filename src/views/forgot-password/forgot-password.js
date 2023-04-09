import ForgotPasswordForm from "@/components/forgot-password-form/forgot-password-form.vue";
import store from "@/store";

export default {
  name: "login",
  components: {
    ForgotPasswordForm,
  },

  mounted() {
    if (store.state.home.loginInfo.isLoggedIn) {
      router.push({ name: "Home" });
    }
  },
  computed: {
    fullPostData() {
      return this.$store.state.home.postList;
    },
  },
};
