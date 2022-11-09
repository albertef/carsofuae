import Banner from "@/components/carousel/carousel.vue";
import Services from "@/components/services/services.vue";
import PostList from "@/components/post-list/post-list.vue";
import FeaturedPostList from "@/components/featured-post-list/featured-post-list.vue";
import FixedHomeButtons from "@/components/fixed-home-buttons/fixed-home-buttons.vue";

export default {
  name: "home",
  components: {
    Banner,
    Services,
    PostList,
    FeaturedPostList,
    FixedHomeButtons,
  },
  async mounted() {
    const params = { 
      category: this.getSelectedClassifiedCategory,
    };
    await this.$store.dispatch("getPostList", params);
  },
  computed: {
    getSelectedClassifiedCategory() {
      return this.$store.state.home.selectedClassifiedCategory;
    },
    fullPostData() {
      return this.$store.state.home.postList;
    },
  },
};
