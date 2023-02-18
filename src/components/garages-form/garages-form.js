import Radio from "@/components/common/radio/radio.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import InputFile from "@/components/common/input-file/input-file.vue";
import Button from "@/components/common/button/button.vue";
import Select from "@/components/common/select/select.vue";
import TextArea from "@/components/common/text-area/text-area.vue";
import store from "@/store";
import router from "@/router";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";
import garageServiceList from "@/meta/services.json";
import Checkbox from "@/components/common/checkbox/checkbox.vue";
import OpenTimes from "@/components/common/open-times/open-times.vue";

export default {
  name: "ClassifiedsForm",
  components: {
    Radio,
    InputText,
    Button,
    Select,
    InputFile,
    TextArea,
    Checkbox,
    OpenTimes,
  },

  data() {
    return {
      newGarage: {
        name: "",
        description: "",
        place: "",
        phone: "",
        email: "",
        profilePicture: "",
        galleryImages: "",
        imageFolder: "",
        postedBy: "",
        services: "",
        openTimes: "",
        postedBy: "",
        facebook: "",
        instagram: "",
        linkedin: "",
      },
      newGarageValidation: {},
      selectedServices: [],
    };
  },
  async mounted() {
    await store.dispatch("getCarList");
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    newGarageInfo() {
      return store.state.home.newGarageInfo;
    },
    utils() {
      return UTILS;
    },
    garageServiceList() {
      return garageServiceList;
    },
  },
  methods: {
    updateGarageData(key, e) {
      this.newGarage = {
        ...this.newGarage,
        [key]: e,
      };
    },

    updateGarageServiceList(id) {
      this.selectedServices = [...this.selectedServices, id];
      this.updateGarageData("services", this.selectedServices);
    },

    isSelected(id) {
      return this.selectedServices.length && this.selectedServices.includes(id);
    },

    resetValidation() {
      this.newGarageValidation = {};
    },

    validateNewGarageForm() {
      this.newGarageValidation = {
        ...this.newGarageValidation,
        description: !this.newGarage.description,
        place: !this.newGarage.place,
        services: !this.newGarage.services,
        email:
          !this.newGarage.email || !UTILS.isValidEmail(this.newGarage.email),
        name: !this.newGarage.name,
        openTimes:
          !this.newGarage.openTimes || this.newGarage.openTimes.length < 7,
        phone:
          !this.newGarage.phone || !UTILS.isValidPhone(this.newGarage.phone),
        profilePicture: !this.newGarage.profilePicture,
        galleryImages: !this.newGarage.galleryImages,
      };

      return Object.values(this.newGarageValidation).every((el) => el === false)
        ? true
        : false;
    },
    cancelPost() {
      this.$router.go(-1);
    },
    async submitPost() {
      if (this.validateNewGarageForm()) {
        let params = { ...this.newGarage, postedBy: this.loginInfo?.id };
        store.commit("updateLoader", true);

        const galleryImageUploadResponse = await this.$store.dispatch(
          "imageUpload",
          params.galleryImages
        );
        let response = null;
        if (galleryImageUploadResponse.length > 1) {
          response = galleryImageUploadResponse.find(
            (item) => item.status === false
          )
            ? false
            : true;
          params = {
            ...params,
            galleryImages: galleryImageUploadResponse
              .map((item) => item.fileName)
              .join(","),
            imageFolder: galleryImageUploadResponse
              .map((item) => item.folderName)
              .join(","),
          };
        } else {
          params = {
            ...params,
            galleryImages: galleryImageUploadResponse.fileName,
            imageFolder: galleryImageUploadResponse.folderName,
          };
        }
        const displayPictureUploadResponse = await this.$store.dispatch(
          "imageUpload",
          params.profilePicture
        );

        if (
          (response || galleryImageUploadResponse.status) &&
          displayPictureUploadResponse.status
        ) {
          params = {
            ...params,
            profilePicture: displayPictureUploadResponse.fileName,
          };
          await this.$store.dispatch("addNewGarage", params);
        } else {
          const alert = {
            show: true,
            type: "error",
            message:
              this.newGarageInfo.message ||
              galleryImageUploadResponse ||
              META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }

        store.commit("updateLoader", false);
        if (this.newGarageInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.newGarageInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
          router.go(-1);
        } else {
          const alert = {
            show: true,
            type: "error",
            message: this.newGarageInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }
        store.commit("updateNewGarageInfo", {});
      } else {
        const firstError = Object.keys(this.newGarageValidation).find(
          (i) => this.newGarageValidation[i] === true
        );
        document.getElementById(firstError).scrollIntoView({
          behavior: "smooth",
        });
      }
    },
  },
};
