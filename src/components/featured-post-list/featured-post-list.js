import { Carousel, Slide } from "vue-carousel";
import { UTILS } from "@/utility/utils.js";
import router from "@/router";

export default {
  name: "FeaturedPostList",
  components: {
    Carousel,
    Slide,
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  computed: {
    featuredPostData() {
      return this.fullPostData.filter((item) => item.featured === true);
    },
    fullPostData() {
      return this.data;
    },
  },
  methods: {
    formatDistance(num, digits) {
      return UTILS.formatDistance(num, digits);
    },
    viewPostDetails(data) {
      router.push({
        name: "PostDetails",
        query: {
          id: data.id,
          title: `${UTILS.formatTitle(data.make)}-${UTILS.formatTitle(
            data.company
          )}-${UTILS.formatTitle(data.model)}-${UTILS.formatTitle(data.desc)}`,
        },
      });
    },
  },
};
