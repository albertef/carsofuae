import LoginForm from "@/components/login-form/login-form.vue";
import store from "@/store";

export default {
  name: "login",
  components: {
    LoginForm,
  },

  mounted() {
    if (store.state.home.loginInfo.isLoggedIn) {
      this.$router.go(-1);
    }
  },
  computed: {
    fullPostData() {
      return this.$store.state.home.postList;
    },
  },
};
