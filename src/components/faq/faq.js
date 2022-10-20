import Modal from "@/components/common/modal/modal.vue";
import Button from "@/components/common/button/button.vue";
import TextArea from "@/components/common/text-area/text-area.vue";
import InputText from "@/components/common/input-text/input-text.vue";
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
    InputText,
  },
  data() {
    return {
      newFAQ: {
        faqQuestion: "",
        faqAnswer: "",
        userId: "",
        userName: "",
        pageType: "",
        pageId: "",
      },
      newFAQValidation: {},
      isAddFAQ: false,
    };
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    newFAQInfo() {
      return store.state.home.newFAQInfo;
    },
  },
  methods: {
    closeAddFAQ() {
      this.isAddFAQ=false;
    },
    openAddFAQ() {
      this.isAddFAQ=true;
    },
    updateFAQData(key, e) {
      this.newFAQ = {
        ...this.newFAQ,
        [key]: e,
      };
    },
    validateNewFAQForm() {
      this.newFAQValidation = {
        ...this.newFAQValidation,
        faqAnswer: !this.newFAQ.faqAnswer,
        faqQuestion: !this.newFAQ.faqQuestion,
      };
      return Object.values(this.newFAQValidation).every((el) => el === false)
        ? true
        : false;
    },
    async addFAQ() {
      if (this.validateNewFAQForm()) {
        let params = {
          ...this.newFAQ,
          userId: this.loginInfo?.id,
          userName: this.loginInfo?.username,
          pageType: this.pageType,
          pageId: this.pageId,
        };
        store.commit("updateLoader", true);
        await this.$store.dispatch("addNewFAQ", params);
        const getFAQParams = {
          pageType: params.pageType,
          pageId: params.pageId,
        };
        await this.$store.dispatch("getFAQList", getFAQParams);
        store.commit("updateLoader", false);
        if (this.newFAQInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.newFAQInfo.message || META.commonErrorMessage,
          };
          this.closeAddFAQ();
          store.commit("updateAlert", alert);
        } else {
          const alert = {
            show: true,
            type: "error",
            message: this.newFAQInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }
        store.commit("updateNewFAQInfo", {});
      }
    },
  },
};
