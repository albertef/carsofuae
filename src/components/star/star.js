import { UTILS } from "@/utility/utils.js";
import ReviewModal from "@/components/review-modal/review-modal.vue";
import AddReview from "@/components/add-review/add-review.vue";
import store from "@/store";

const MAX = 5;
export default {
  name: "Star",
  props: {
    pageType: {
      type: String,
      default: "",
    },
    pageId: {
      type: Number,
      default: "",
    },
  },
  components: {
    ReviewModal,
    AddReview,
  },
  data() {
    return {
      halfStar: false,
      actualValue: 0,
      showReviewModal: false,
      addModal: false,
    };
  },
  async created() {
    store.commit("updateLoader", true);
    const params = {
      pageType: this.pageType,
      pageId: this.pageId,
    };
    await this.$store.dispatch("getReviewList", params);
    store.commit("updateLoader", false);
  },
  computed: {
    starValue() {
      return UTILS.calculateStarValue(this.reviewData.reviews);
    },
    reviewData() {
      return store.state.home.reviewList;
    },
    roundedValue() {
      this.halfStar = false;
      if (Number.isInteger(this.starValue)) {
        this.actualValue = this.starValue;
        return this.starValue;
      }
      this.halfStar = true;
      this.actualValue = this.starValue.toFixed(2);
      return Math.floor(this.starValue);
    },
    remainingStarValue() {
      return this.halfStar
        ? MAX - (this.roundedValue + 1)
        : MAX - this.roundedValue;
    },
  },
  methods: {
    showReviews() {
      this.showReviewModal = true;
    },
    closeReviewModal() {
      this.showReviewModal = false;
    },
    showAddModal() {
      this.addModal = true;
      this.showReviewModal = false;
    },
    closeAddModal() {
      this.addModal = false;
    },
  },
};
