import Button from "@/components/common/button/button.vue";
import store from "@/store";
import router from "@/router";

export default {
  name: "FixedHomeButtons",
  components: {
    Button,
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
  },
  methods: {
    postNewAd() {
      if (this.loginInfo.isLoggedIn) {
        router.push({ name: "AddNewPost" });
      } else {
        router.push({ name: "Login" });
      }
    },
    gotoProfile() {
      if (this.loginInfo.isLoggedIn) {
        router.push({ name: "UserProfile" });
      } else {
        router.push({ name: "Login" });
      }
    },
  },
};
