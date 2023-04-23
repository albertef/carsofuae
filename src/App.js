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
  // mounted() {
  //   const element = document.getElementsByClassName("main")[0];
  //   element.addEventListener("scroll", () => {
  //     const lastScrollTop = 0;
  //     const scrollTop = element.scrollTop;
  //     if (scrollTop > lastScrollTop) {
  //       document.documentElement.requestFullscreen();
  //     } else if (scrollTop < lastScrollTop) {
  //       document.exitFullscreen();
  //     }
  //     console.log(element.scrollTop);
  //   });
  // },
  computed: {
    showLoader() {
      return this.$store.state.common.loader;
    },
    alert() {
      return store.state.common.alert;
    },
  },
};
