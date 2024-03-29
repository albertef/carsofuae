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
import LocationMapInstructions from "@/components/location-map-instructions/location-map-instructions.vue";

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
    LocationMapInstructions,
  },

  props: {
    action: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      newGarage: {
        name: "",
        description: "",
        place: "",
        phone: "",
        whatsappNumber: "",
        email: "",
        profilePicture: "",
        galleryImages: "",
        imageFolder: "",
        postedBy: "",
        services: "",
        openTimes: "",
        userType: "",
        facebook: "",
        instagram: "",
        linkedin: "",
        locationMap: "",
      },
      newGarageValidation: {},
      selectedServices: [],
      showLocationModal: false,
    };
  },
  async mounted() {
    //await store.dispatch("getCarList");
    if (this.action === "edit") {
      await this.getGarageData();
      this.selectedServices = this.newGarage?.services;
    }
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
    locationOptions() {
      return UTILS.emiratesLocationList();
    },
    queryParams() {
      return this.$route.query;
    },
  },
  methods: {
    async getGarageData() {
      const data = await this.$store.dispatch("getGarageList");
      this.newGarage = data.garages?.find(
        (item) => Number(item.id) === Number(this.queryParams?.id)
      );

      delete this.newGarage.galleryImages;
      delete this.newGarage.profilePicture;
    },

    updateGarageData(key, e) {
      if (key === "locationMap") {
        e = UTILS.formatMapSrc(e);
      }
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
      return (
        (this.selectedServices.length && this.selectedServices.includes(id)) ||
        this.newGarage.services.includes(id)
      );
    },

    resetValidation() {
      this.newGarageValidation = {};
    },

    showLocationInstructions() {
      this.showLocationModal = true;
    },

    closeReviewModal() {
      this.showLocationModal = false;
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
        whatsappNumber:
          !this.newGarage.whatsappNumber ||
          !UTILS.isValidPhone(this.newGarage.whatsappNumber),
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
        let params = {
          ...this.newGarage,
          postedBy: this.loginInfo?.id,
          userType: this.loginInfo?.userType,
        };
        store.commit("updateLoader", true);

        const galleryImageUploadResponse = await this.$store.dispatch(
          "imageUpload",
          params.galleryImages
        );
        let response = null;
        if (galleryImageUploadResponse.length > 1) {
          response = galleryImageUploadResponse?.find(
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

        if (this.action === "edit") {
          params = {
            ...params,
            id: this.queryParams?.id,
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
