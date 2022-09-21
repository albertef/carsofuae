import Modal from "@/components/common/modal/modal.vue";
import Button from "@/components/common/button/button.vue";
import router from "@/router";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "ReviewModal",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Modal,
    Button,
  },

  computed: {
    loginInfo() {
      return this.$store.state.home.loginInfo;
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    getStarValue() {
      const starValue = UTILS.calculateStarValue(this.data.reviews);
      return starValue % 1 != 0 ? Number(starValue).toFixed(2) : starValue;
    },
    formatDate(date) {
      return UTILS.formatDate(date);
    },
    addReview() {
      if (this.loginInfo.isLoggedIn) {
        this.$emit("addReview");
      } else {
        router.push({
          name: "Login",
        });
      }
    },
  },
};
