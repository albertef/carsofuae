import { UTILS } from "@/utility/utils.js";
import ReviewModal from "@/components/review-modal/review-modal.vue";
import AddReview from "@/components/add-review/add-review.vue";

const MAX = 5;
export default {
  name: "Star",
  props: {
    data: {
      type: Array,
      default: () => [],
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
  computed: {
    starValue() {
      return UTILS.calculateStarValue(this.data);
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
