import Button from "@/components/common/button/button.vue";
import { Carousel, Slide } from "vue-carousel";
import { UTILS } from "@/utility/utils.js";
import router from "@/router";
import RentalFilter from "@/components/rental-filter/rental-filter.vue";
import Sort from "@/components/sort/sort.vue";
import leaseBulletsFeaturesList from "@/meta/features.json";

const LOAD_COUNT = 9;

export default {
  name: "LeaseList",
  components: {
    Button,
    Carousel,
    Slide,
    RentalFilter,
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
      default: () => [],
    },
    title: {
      type: String,
      default: "Latest <span>Lease Cars</span>",
    },
  },
  async mounted() {
    await this.getPostData();
  },
  watch: {
    data: {
      handler(newVal) {
        this.getPostData();
      },
      immediate: true,
    },
  },
  computed: {
    isPostlength() {
      return this.fullPostData.length > this.postCount;
    },
    isFilter() {
      return this.$store.state.home.isFilterApplied;
    },
    postData() {
      this.getPostData();
      return this.fullPostData?.slice(0, this.postCount);
    },
    getSelectedLeaseCategory() {
      return this.$store.state.home.selectedLeaseCategory;
    },
    getSelectedLeaseBrand() {
      return this.$store.state.home.selectedLeaseBrand;
    },
    // fullPostData() {
    //   if (this.getSelectedLeaseCategory) {
    //     return this.data.filter(
    //       (item) =>
    //         item.type?.toLowerCase() ===
    //         this.getSelectedLeaseCategory.toLowerCase()
    //     );
    //   } else if (this.getSelectedLeaseBrand) {
    //     return this.data.filter(
    //       (item) =>
    //         UTILS.formatTitle(item.company) ===
    //         UTILS.formatTitle(this.getSelectedLeaseBrand)
    //     );
    //   }
    //   return this.data;
    // },
  },
  methods: {
    async getPostData() {
      if (this.data?.length && this.filteredData?.length) {
        this.fullPostData = this.filteredData;
      } else if (this.data?.length && this.getSelectedLeaseCategory) {
        this.fullPostData = this.data.filter(
          (item) =>
            item.type?.toLowerCase() ===
            this.getSelectedLeaseCategory.toLowerCase()
        );
      } else if (this.data?.length && this.getSelectedLeaseBrand) {
        this.fullPostData = this.data?.filter(
          (item) =>
            UTILS.formatTitle(item.company) ===
            UTILS.formatTitle(this.getSelectedLeaseBrand)
        );
      } else if (
        this.data?.length &&
        !this.getSelectedLeaseBrand &&
        !this.getSelectedLeaseCategory &&
        !this.isFilter
      ) {
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
    getBulletFeaturesList(value) {
      return leaseBulletsFeaturesList.filter((item) => value.includes(item.id));
    },
    getGalleryImagePath(image, folder) {
      const folderPath = folder?.split(",")[0];
      return `${this.$baseURL}upload/${folderPath}/${image}`;
    },
    getDealerLogo(image, folder) {
      const folderName = folder?.split(",")[0];
      return `${this.$baseURL}upload/${folderName}/${image}`;
    },
    viewPostDetails(data) {
      this.$store.commit("updateSelectedLease", data.id);
      router.push({
        name: "LeaseACarDetails",
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

    updatePostData(data) {
      this.filteredData = data?.length ? data : null;
    },

    async clearFilter() {
      await this.getPostData();
      this.filteredData = null;
      this.$store.commit("updateIsFilterApplied", false);
    },
  },
};
