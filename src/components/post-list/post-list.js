import Button from "@/components/common/button/button.vue";
import { Carousel, Slide } from "vue-carousel";
import { UTILS } from "@/utility/utils.js";
import router from "@/router";
import PostFilter from "@/components/post-filter/post-filter.vue";
import Sort from "@/components/sort/sort.vue";

const LOAD_COUNT = 9;

export default {
  name: "PostList",
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
      fullPostData: null,
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "Latest <span>Posts</span>",
    },
  },
  async mounted() {
    await this.getPostData();
  },
  computed: {
    isPostlength() {
      return this.fullPostData.length > this.postCount;
    },
    postData: {
      get() {
        return this.fullPostData?.slice(0, this.postCount);
      },
      set(filteredData) {
        this.fullPostData = filteredData;
      },
    },
    isFilter() {
      return this.$store.state.home.isFilterApplied;
    },
    listView() {
      return this.$store.state.home.postView;
    },
    getSelectedClassifiedCategory() {
      return (
        this.$store.state.home.selectedClassifiedCategory ||
        this.$route.query.category
      );
    },
    getSelectedMotorcycleSubCategory() {
      return (
        this.$store.state.home.selectedMotorCycleSubcategory ||
        this.$route.query.subcategory
      );
    },
    getSelectedSubCategory() {
      return (
        this.$store.state.home.selectedSubcategory ||
        this.$route.query.subcategory
      );
    },
    getSelectedCarMake() {
      return this.$store.state.home.selectedCarMake || this.$route.query.make;
    },
    getSelectedCarModel() {
      return this.$store.state.home.selectedCarModel || this.$route.query.model;
    },
    getSelectedAccessoryType() {
      return (
        this.$store.state.home.selectedAccessoriesType || this.$route.query.type
      );
    },
    getSelectedAccessoryCategory() {
      return (
        this.$store.state.home.selectedAccessoryCategory ||
        this.$route.query.accCategory
      );
    },
    getSelectedAccessorySubCategory() {
      return (
        this.$store.state.home.selectedAccessorySubCategory ||
        this.$route.query.sub
      );
    },
    getSelectedAccessoryItem() {
      return (
        this.$store.state.home.selectedAccessoryItem || this.$route.query.item
      );
    },
  },
  methods: {
    async getPostData() {
      if (this.data.length) {
        this.fullPostData = this.data;
      } else {
        this.$store.commit("updateLoader", true);
        const params =
          this.getSelectedClassifiedCategory ||
          this.$route.query.category ||
          "used-cars";
        this.fullPostData = (
          await this.$store.dispatch("getPostList", {
            category: params,
          })
        ).post;
        this.$store.commit("updateLoader", false);
      }
      if (this.$route.name === "Classifieds") {
        const filteredData =
          this.getSelectedClassifiedCategory === "used-cars" ||
          this.getSelectedClassifiedCategory === "motorcycles"
            ? this.fullPostData?.filter(
                (item) =>
                  item?.brand?.toLowerCase() ===
                    this.getSelectedCarMake?.toLowerCase() &&
                  item?.model?.toLowerCase() ===
                    this.getSelectedCarModel?.toLowerCase()
              )
            : this.getSelectedClassifiedCategory === "boats" ||
              this.getSelectedClassifiedCategory === "truck" ||
              this.getSelectedClassifiedCategory === "number-plates"
            ? this.fullPostData?.filter(
                (item) =>
                  item?.subCategory?.toLowerCase() ===
                  this.getSelectedSubCategory?.toLowerCase()
              )
            : this.getSelectedClassifiedCategory === "accessories-and-parts"
            ? this.fullPostData?.filter(
                (item) =>
                  item?.type?.toLowerCase() ===
                    this.getSelectedAccessoryType?.toLowerCase() &&
                  item?.category?.toLowerCase() ===
                    this.getSelectedAccessoryCategory?.toLowerCase() &&
                  item?.subCategory?.toLowerCase() ===
                    this.getSelectedAccessorySubCategory?.toLowerCase() &&
                  item?.item?.toLowerCase() ===
                    this.getSelectedAccessoryItem?.toLowerCase()
              )
            : null;
        this.fullPostData = filteredData;
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
        name: "PostDetails",
        query: {
          id: data.id,
          category: data.category,
          title: `${UTILS.formatTitle(data.make)}-${UTILS.formatTitle(
            data.company
          )}-${UTILS.formatTitle(data.model)}-${UTILS.formatTitle(data.desc)}`,
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
    getGalleryImagePath(image, folder) {
      const folderPath = folder?.split(",")[0];
      return `${this.$baseURL}upload/${folderPath}/${image}`;
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
    getTitle(post) {
      return this.getSelectedClassifiedCategory === "used-cars" ||
        (post.make && post.brand && post.model)
        ? `${post.make} ${post.brand} ${post.model}`
        : this.getSelectedClassifiedCategory === "motorcycles" ||
          (post.brand && post.model && post.trim)
        ? `${post.brand} ${post.model} ${post.trim}`
        : `${post.name}`;
    },

    updatePostData(data) {
      this.postData = data;
    },

    async clearFilter() {
      await this.getPostData();
      this.postData = this.fullPostData;
      this.$store.commit("updateIsFilterApplied", false);
    },
  },
};
