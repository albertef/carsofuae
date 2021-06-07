import Header from "@/components/header/header.vue";
import Banner from "@/components/carousel/carousel.vue";
import Services from "@/components/services/services.vue";
import PostList from "@/components/post-list/post-list.vue";
import Footer from "@/components/footer/footer.vue";
import FixedHomeButtons from "@/components/fixed-home-buttons/fixed-home-buttons.vue"

export default {
  name: "app",
  components: {
    Header,
    Banner,
    Services,
    PostList,
    Footer,
    FixedHomeButtons
  },
  mounted() {
    document.body.classList.add('hide-overflow');
  }
}
