import Modal from "@/components/common/modal/modal.vue";
import Button from "@/components/common/button/button.vue";
import TextArea from "@/components/common/text-area/text-area.vue";
import Select from "@/components/common/select/select.vue";
import store from "@/store";
import router from "@/router";
import { META } from "@/meta/common.js";

export default {
  name: "ReviewModal",
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
    Modal,
    Button,
    TextArea,
    Select,
  },
  data() {
    return {
      ratingOptions: [1, 2, 3, 4, 5],
      newReview: {
        rating: "",
        reviewDesc: "",
        userId: "",
        userName: "",
        pageType: "",
        pageId: "",
      },
      newReviewValidation: {},
    };
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    newReviewInfo() {
      return store.state.home.newReviewInfo;
    },
  },
  methods: {
    closeAddReview() {
      this.$emit("close");
    },
    updateReviewData(key, e) {
      this.newReview = {
        ...this.newReview,
        [key]: e,
      };
    },
    validateNewReviewForm() {
      this.newReviewValidation = {
        ...this.newReviewValidation,
        reviewDesc: !this.newReview.reviewDesc,
        rating: !this.newReview.rating,
      };
      return Object.values(this.newReviewValidation).every((el) => el === false)
        ? true
        : false;
    },
    async addReview() {
      if (this.validateNewReviewForm()) {
        let params = {
          ...this.newReview,
          userId: this.loginInfo?.id,
          userName: this.loginInfo?.username,
          pageType: this.pageType,
          pageId: this.pageId,
        };
        store.commit("updateLoader", true);
        await this.$store.dispatch("addNewReview", params);
        const getReviewParams = {
          pageType: params.pageType,
          pageId: params.pageId,
        };
        await this.$store.dispatch("getReviewList", getReviewParams);

        store.commit("updateLoader", false);
        if (this.newReviewInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.newReviewInfo.message || META.commonErrorMessage,
          };
          this.closeAddReview();
          store.commit("updateAlert", alert);
        } else {
          const alert = {
            show: true,
            type: "error",
            message: this.newReviewInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }
        store.commit("updateNewReviewInfo", {});
      }
    },
    getSelectInput(e) {
      console.log(e);
    },
  },
};
