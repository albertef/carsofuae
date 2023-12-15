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
      fullPostData: null,
      filteredData: null,
    };
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  async mounted() {
    await this.getPostData();
  },
  computed: {
    isPostlength() {
      return this.fullPostData.length > this.postCount;
    },
    // postData() {
    //   return this.fullPostData?.slice(0, this.postCount);
    // },
    postData: {
      get() {
        return this.fullPostData?.slice(0, this.postCount);
      },
      set(filteredData) {
        this.fullPostData = filteredData;
      },
    },
    // fullPostData() {
    //   return this.data;
    // },
    listView() {
      return this.$store.state.home.postView;
    },
    isFilter() {
      return this.$store.state.home.isFilterApplied;
    },
  },
  watch: {
    data: {
      handler(newVal) {
        this.getPostData();
      },
      immediate: true,
    },
  },
  methods: {
    async getPostData() {
      debugger;
      if (this.data?.length && this.filteredData?.length) {
        this.fullPostData = this.filteredData;
      } else if (this.data?.length && !this.isFilter) {
        this.fullPostData = this.data;
      } else {
        this.fullPostData = [];
      }
    },
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
    getGalleryImagePath(image, folder) {
      const folderPath = folder?.split(",")[0];
      return `${this.$baseURL}upload/${folderPath}/${image}`;
    },

    updatePostData(data) {
      this.postData = data?.length ? data : null;
    },

    async clearFilter() {
      this.$store.commit("updateIsFilterApplied", false);
      await this.getPostData();
      this.filteredData = null;
    },
  },
};
