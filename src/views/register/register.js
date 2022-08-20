import RegisterForm from "@/components/register-form/register-form.vue";
import store from "@/store";

export default {
  name: "register",
  components: {
    RegisterForm,
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
