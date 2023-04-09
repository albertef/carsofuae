import ResetPasswordForm from "@/components/reset-password-form/reset-password-form.vue";
import store from "@/store";

export default {
  name: "reset",
  components: {
    ResetPasswordForm,
  },

  mounted() {
    if (store.state.home.loginInfo.isLoggedIn) {
      router.push({ name: "Login" });
    }
  },
  computed: {
    fullPostData() {
      return this.$store.state.home.postList;
    },
  },
};
