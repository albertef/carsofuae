import Button from "@/components/common/button/button.vue";
import { Carousel, Slide } from "vue-carousel";
import { UTILS } from "@/utility/utils.js";
import router from "@/router";
import SpareFilter from "@/components/spare-filter/spare-filter.vue";
import Sort from "@/components/sort/sort.vue";

const LOAD_COUNT = 9;

export default {
  name: "PostList",
  components: {
    Button,
    Carousel,
    Slide,
    SpareFilter,
    Sort,
  },
  data() {
    return {
      postCount: LOAD_COUNT,
      filterEnabled: false,
      sortEnabled: false,
    };
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  computed: {
    isPostlength() {
      return this.fullPostData.length > this.postCount;
    },
    postData() {
      return this.fullPostData?.slice(0, this.postCount);
    },
    fullPostData() {
      return this.data;
    },
    listView() {
      return this.$store.state.home.postView;
    },
  },
  methods: {
    loadMore() {
      this.postCount =
        this.fullPostData.length > this.postCount
          ? this.postCount + LOAD_COUNT
          : this.fullPostData.length;
    },
    formatDistance(num, digits) {
      return UTILS.formatDistance(num, digits);
    },
    viewPostDetails(data) {
      debugger;
      router.push({
        name: "SparePartsDetails",
        query: {
          id: data.id,
          title: `${UTILS.formatTitle(data.brand)}-${UTILS.formatTitle(
            data.model
          )}-${UTILS.formatTitle(data.name)}-${UTILS.formatTitle(data.desc)}`,
        },
      });
    },
    filterToggle() {
      this.filterEnabled = !this.filterEnabled;
    },
    sortToggle() {
      this.sortEnabled = !this.sortEnabled;
    },
    viewToggle(value) {
      this.$store.commit("updatePostView", value === "list" ? true : false);
    },
    openPhone(num) {
      document.location.href = `tel:${num}`;
    },
    openWhatsapp(num) {
      window.open(
        `https://wa.me/${num.replace(
          /[^\d\+]/g,
          ""
        )}?text=Hey! I am Interested in your ad. ${encodeURIComponent(
          window.location.href
        )}`
      );
    },
    openEmail(email) {
      window.location.href = `mailto:${email}`;
    },
  },
};
