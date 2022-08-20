import Button from "@/components/common/button/button.vue";
import { META } from "@/meta/common.js";
import store from "@/store";
import router from "@/router";
import classifiedsCategorySelect from "../classifieds-category-select/classifieds-category-select";

export default {
  name: "Header",
  components: {
    Button,
  },
  computed: {
    services() {
      return META.serviceList;
    },
    loginInfo() {
      return this.$store.state.home.loginInfo;
    },
  },
  methods: {
    clicked(e) {
      console.log("clicked");
    },
    logout() {
      store.commit("updateLoginInfo", null);
      store.commit("updateUserDetails", null);
      const alert = {
        show: true,
        type: "success",
        message: "User Logged out Successfully!",
      };
      store.commit("updateAlert", alert);
      router.push({
        name: "Home",
      });
    },
    newPost() {
      if (this.loginInfo.isLoggedIn) {
        router.push({
          name: "AddNewPost",
        });
      } else {
        router.push({
          name: "Login",
        });
      }
    },
  },
};
