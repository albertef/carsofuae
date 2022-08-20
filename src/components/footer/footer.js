export default {
  name: "Footer",
  computed: {
    fullYear() {
      return new Date().getFullYear();
    },
    loginInfo() {
      return this.$store.state.home.loginInfo;
    },
  },
};
