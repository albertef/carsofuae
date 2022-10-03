import Button from "@/components/common/button/button.vue";
import { Carousel, Slide } from "vue-carousel";
import { UTILS } from "@/utility/utils.js";
import router from "@/router";
import PostFilter from "@/components/post-filter/post-filter.vue";
import Sort from "@/components/sort/sort.vue";

const LOAD_COUNT = 9;

export default {
  name: "RentalList",
  components: {
    Button,
    Carousel,
    Slide,
    PostFilter,
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
      default: () => [],
    },
    title: {
      type: String,
      default: "Latest <span>Rental Cars</span>",
    },
  },
  computed: {
    isPostlength() {
      return this.fullPostData.length > this.postCount;
    },
    postData() {
      return this.fullPostData?.slice(0, this.postCount);
    },
    getSelectedRentalCategory() {
      return this.$store.state.home.selectedRentalCategory;
    },
    fullPostData() {
      if (this.getSelectedRentalCategory) {
        return this.data.filter(
          (item) => item.type === this.getSelectedRentalCategory.toLowerCase()
        );
      }
      return this.data;
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
    getDealerLogo(image, folder) {
      const folderName = folder?.split(",")[0];
      return `${this.$baseURL}upload/${folderName}/${image}`;
    },
    getGalleryImagePath(image, folder) {
      const folderPath = folder?.split(",")[0];
      return `${this.$baseURL}upload/${folderPath}/${image}`;
    },
    viewPostDetails(data) {
      this.$store.commit("updateSelectedRental", data.id);
      router.push({
        name: "RentalDetails",
        query: {
          id: data.id,
          title: `${UTILS.formatTitle(data.name)}-${UTILS.formatTitle(
            data.desc
          )}`,
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
  },
};
