import Radio from "@/components/common/radio/radio.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import InputFile from "@/components/common/input-file/input-file.vue";
import Button from "@/components/common/button/button.vue";
import Select from "@/components/common/select/select.vue";
import OpenTimes from "@/components/common/open-times/open-times.vue";
import TextArea from "@/components/common/text-area/text-area.vue";
import RentalPrice from "@/components/common/rental-price/rental-price.vue";
import rentalFeaturesList from "@/meta/features.json";
import Checkbox from "@/components/common/checkbox/checkbox.vue";
import LocationMapInstructions from "@/components/location-map-instructions/location-map-instructions.vue";

import store from "@/store";
import router from "@/router";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "RentalForm",
  components: {
    Radio,
    InputText,
    Button,
    Select,
    InputFile,
    OpenTimes,
    TextArea,
    RentalPrice,
    Checkbox,
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
      newRental: {
        description: "",
        brand: "",
        model: "",
        make: "",
        place: "",
        price: "",
        galleryImages: "",
        imageFolder: "",
        openTimes: "",
        phone: "",
        whatsappNumber: "",
        email: "",
        mileageLimit: "",
        additionalMileageCharge: "",
        insurance: "",
        minAge: "",
        securityDeposit: "",
        acceptedIn: "",
        additionalDriverInsurance: "",
        excessClaim: "",
        tollCharges: "",
        features: "",
        type: "",
        doors: "",
        seats: "",
        whyChoose: "",
        whyUs: "",
        canDeliver: "",
        note: "",
        facebook: "",
        instagram: "",
        linkedin: "",
        listBullets: "",
        postedBy: "",
        userType: "",
        locationMap: "",
      },
      newRentalValidation: {},
      selectedFeatures: [],
      showLocationModal: false,
    };
  },
  async mounted() {
    await store.dispatch("getCarList", true);
    if (this.action === "edit") {
      await this.getRentalData();
      this.selectedFeatures = this.newRental?.features;
    }
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    rentalFeaturesList() {
      return rentalFeaturesList;
    },
    newRentalInfo() {
      return store.state.home.newRentalInfo;
    },
    brandsList() {
      return store.getters.getAllMakes;
    },
    modelsList() {
      return store.getters.getAllModels(this.newRental.brand);
    },
    trimList() {
      return store.getters.getTrimList(
        this.newPost.brand,
        this.newRental.model
      );
    },
    utils() {
      return UTILS;
    },
    getRentalTypes() {
      return META.rentalCarTypes.map((item) => item.name);
    },
    queryParams() {
      return this.$route.query;
    },
  },
  methods: {
    async getRentalData() {
      const data = await this.$store.dispatch("getRentalList");
      this.newRental = data.rental?.find(
        (item) => Number(item.id) === Number(this.queryParams?.id)
      );

      delete this.newRental.galleryImages;
    },

    updateRentalData(key, e) {
      if (key === "brand") {
        this.newRental.model = "";
      }
      if (key === "locationMap") {
        e = UTILS.formatMapSrc(e);
      }
      this.newRental = {
        ...this.newRental,
        [key]: e,
      };
      //this.validateNewRentalForm();
    },
    updateRentalFeaturesList(id) {
      this.selectedFeatures = [...this.selectedFeatures, id];
      this.updateRentalData("features", this.selectedFeatures);
    },
    isSelected(id) {
      return (
        (this.selectedFeatures.length && this.selectedFeatures.includes(id)) ||
        this.newRental.features.includes(id)
      );
    },
    resetValidation() {
      this.newRentalValidation = {};
    },

    showLocationInstructions() {
      this.showLocationModal = true;
    },

    closeReviewModal() {
      this.showLocationModal = false;
    },

    validateNewRentalForm() {
      this.newRentalValidation = {
        ...this.newRentalValidation,
        description: !this.newRental.description,
        brand: !this.newRental.brand,
        model: !this.newRental.model,
        make: !this.newRental.make,
        place: !this.newRental.place,
        price: !this.newRental.price,
        galleryImages: !this.newRental.galleryImages,
        openTimes: !this.newRental.openTimes,
        phone:
          !this.newRental.phone || !UTILS.isValidPhone(this.newRental.phone),
        whatsappNumber:
          !this.newRental.whatsappNumber ||
          !UTILS.isValidPhone(this.newRental.whatsappNumber),
        email:
          !this.newRental.email || !UTILS.isValidEmail(this.newRental.email),
        mileageLimit:
          !this.newRental.mileageLimit || isNaN(this.newRental.mileageLimit),
        additionalMileageCharge:
          !this.newRental.additionalMileageCharge ||
          isNaN(this.newRental.additionalMileageCharge),
        insurance: !this.newRental.insurance,
        minAge: !this.newRental.minAge || isNaN(this.newRental.minAge),
        securityDeposit:
          !this.newRental.securityDeposit ||
          isNaN(this.newRental.securityDeposit),
        acceptedIn: !this.newRental.acceptedIn,
        additionalDriverInsurance: !this.newRental.additionalDriverInsurance,
        excessClaim: !this.newRental.excessClaim,
        tollCharges:
          !this.newRental.tollCharges || isNaN(this.newRental.tollCharges),
        features: !this.newRental.features,
        type: !this.newRental.type,
        doors: !this.newRental.doors,
        seats: !this.newRental.seats,
        whyChoose: !this.newRental.whyChoose,
        whyUs: !this.newRental.whyUs,
        canDeliver: !this.newRental.canDeliver,
        note: !this.newRental.note,
        listBullets: !this.newRental.listBullets,
      };

      return Object.values(this.newRentalValidation).every((el) => el === false)
        ? true
        : false;
    },
    cancelRental() {
      this.$router.go(-1);
    },
    async submitRental() {
      if (this.validateNewRentalForm()) {
        let params = {
          ...this.newRental,
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

        if (response || galleryImageUploadResponse.status) {
          await this.$store.dispatch("addNewRental", params);
        }

        store.commit("updateLoader", false);
        if (this.newRentalInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.newRentalInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
          router.go(-1);
        } else {
          const errorMessage = this.newRentalInfo.message
            ? this.newRentalInfo.message
            : !response || galleryImageUploadResponse.status
            ? galleryImageUploadResponse.message
            : META.commonErrorMessage;
          const alert = {
            show: true,
            type: "error",
            message: errorMessage,
          };
          store.commit("updateAlert", alert);
        }
        store.commit("updateNewRentalInfo", {});
      } else {
        const firstError = Object.keys(this.newRentalValidation).find(
          (i) => this.newRentalValidation[i] === true
        );
        document.getElementById(firstError).scrollIntoView({
          behavior: "smooth",
        });
      }
    },
  },
};
