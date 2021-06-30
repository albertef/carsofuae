import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import { Disqus } from "vue-disqus";
import PostDetailTable from "@/components/post-detail-table/post-detail-table.vue";

export default {
  name: "post-details",
  components: {
    CoolLightBox,
    PostDetailTable,
    Disqus,
  },
  data() {
    return {
      index: null,
    };
  },
  async mounted() {
    await this.$store.dispatch("getPostList");
  },
  computed: {
    getPostId() {
      return this.$route.query.id;
    },
    postData() {
      return this.$store?.getters.getSinglePostData(this.getPostId);
    },
  },
};
