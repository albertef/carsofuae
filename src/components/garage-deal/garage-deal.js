import Modal from "@/components/common/modal/modal.vue";
import Button from "@/components/common/button/button.vue";
import InputDate from "@/components/common/input-date/input-date.vue";
import InputFile from "@/components/common/input-file/input-file.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import store from "@/store";
import router from "@/router";
import { META } from "@/meta/common.js";

export default {
  name: "GarageDeal",
  props: {
    garageId: {
      type: Number,
      default: "",
    },
    userId: {
      type: String,
      default: "",
    },
  },
  components: {
    Modal,
    Button,
    InputDate,
    InputFile,
    InputText,
  },
  data() {
    return {
      newDeal: {
        userId: "",
        start: "",
        end: "",
        dealBanner: "",
        garageId: "",
        title: "",
      },
      newDealValidation: {},
      isAddDeal: false,
    };
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    newDealInfo() {
      return store.state.home.newDealInfo;
    },
    isCurrentUser() {
      const currentUserId = this.loginInfo?.id;
      return Number(this.userId) === Number(currentUserId);
    },
  },
  methods: {
    closeAddDeal() {
      this.isAddDeal = false;
    },
    openAddDeal() {
      if (this.loginInfo.isLoggedIn) {
        this.isAddDeal = true;
      } else {
        router.push({
          name: "Login",
        });
      }
    },
    updateDealData(key, e) {
      this.newDeal = {
        ...this.newDeal,
        [key]: e,
      };
    },
    validateNewDealForm() {
      this.newDealValidation = {
        ...this.newDealValidation,
        title: !this.newDeal.title,
        start: !this.newDeal.start,
        end: !this.newDeal.end,
        dealBanner: !this.newDeal.dealBanner,
      };
      return Object.values(this.newDealValidation).every((el) => el === false)
        ? true
        : false;
    },
    async addDeal() {
      if (this.validateNewDealForm()) {
        let params = {
          ...this.newDeal,
          userId: this.loginInfo?.id,
          userType: this.loginInfo?.userType,
          garageId: this.garageId,
        };
        store.commit("updateLoader", true);
        const dealBannerUploadResponse = await this.$store.dispatch(
          "imageUpload",
          params.dealBanner
        );
        if (dealBannerUploadResponse.status) {
          params = {
            ...params,
            dealBanner: dealBannerUploadResponse.fileName,
            imageFolder: dealBannerUploadResponse.folderName,
          };
          await this.$store.dispatch("addNewDeal", params);
        }

        store.commit("updateLoader", false);
        if (this.newDealInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.newDealInfo.message || META.commonErrorMessage,
          };
          this.closeAddDeal();
          store.commit("updateAlert", alert);
        } else {
          const alert = {
            show: true,
            type: "error",
            message: this.newDealInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }
        store.commit("updateNewDealInfo", {});
      }
    },
  },
};
