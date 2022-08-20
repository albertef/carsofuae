import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import { getLogin } from "@/utility/helper";
import store from "@/store";
export default {
  name: "app",
  components: {
    Header,
    Footer,
  },
  created() {
    document.body.classList.add("hide-overflow");
    if (getLogin()) {
      store.state.home.loginInfo = getLogin();
    }
  },
  computed: {
    showLoader() {
      return this.$store.state.common.loader;
    },
    alert() {
      return store.state.common.alert;
    },
  },
};
