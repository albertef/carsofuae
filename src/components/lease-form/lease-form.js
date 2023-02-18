import Radio from "@/components/common/radio/radio.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import InputFile from "@/components/common/input-file/input-file.vue";
import Button from "@/components/common/button/button.vue";
import Select from "@/components/common/select/select.vue";
import OpenTimes from "@/components/common/open-times/open-times.vue";
import TextArea from "@/components/common/text-area/text-area.vue";
import LeasePrice from "@/components/common/lease-price/lease-price.vue";
import leaseFeaturesList from "@/meta/features.json";
import store from "@/store";
import router from "@/router";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";
import Checkbox from "@/components/common/checkbox/checkbox.vue";

export default {
  name: "LeaseForm",
  components: {
    Radio,
    InputText,
    Button,
    Select,
    InputFile,
    OpenTimes,
    TextArea,
    LeasePrice,
    Checkbox,
  },

  data() {
    return {
      newLease: {
        name: "",
        description: "",
        company: "",
        model: "",
        make: "",
        place: "",
        price: "",
        galleryImages: "",
        imageFolder: "",
        openTimes: "",
        phone: "",
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
        luggage: "",
        whyChoose: "",
        whyUs: "",
        canDeliver: "",
        note: "",
        facebook: "",
        instagram: "",
        linkedin: "",
        dealerName: "",
        dealerLogo: "",
        listBullets: "",
        descDetails: "",
        postedBy: "",
      },
      newLeaseValidation: {},
      selectedFeatures: [],
    };
  },
  async mounted() {
    await store.dispatch("getCarList");
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    leaseFeaturesList() {
      return leaseFeaturesList;
    },
    getLeaseTypes() {
      return META.leaseCarTypes.map((item) => item.name);
    },
    newLeaseInfo() {
      return store.state.home.newLeaseInfo;
    },
    companyList() {
      return store.getters.getAllMakes;
    },
    modelsList() {
      return store.getters.getAllModels(this.newLease.company);
    },
    trimList() {
      return store.getters.getTrimList(
        this.newPost.company,
        this.newLease.model
      );
    },
    utils() {
      return UTILS;
    },
  },
  methods: {
    updateLeaseData(key, e) {
      this.newLease = {
        ...this.newLease,
        [key]: e,
      };
      this.validateNewLeaseForm();
    },
    updateLeaseFeaturesList(id) {
      this.selectedFeatures = [...this.selectedFeatures, id];
      this.updateLeaseData("features", this.selectedFeatures);
    },
    isSelected(id) {
      return this.selectedFeatures.length && this.selectedFeatures.includes(id);
    },
    resetValidation() {
      this.newLeaseValidation = {};
    },

    validateNewLeaseForm() {
      this.newLeaseValidation = {
        ...this.newLeaseValidation,
        name: !this.newLease.name,
        description: !this.newLease.description,
        company: !this.newLease.company,
        model: !this.newLease.model,
        make: !this.newLease.make,
        place: !this.newLease.place,
        price: !this.newLease.price,
        galleryImages: !this.newLease.galleryImages,
        openTimes: !this.newLease.openTimes,
        phone: !this.newLease.phone || !UTILS.isValidPhone(this.newLease.phone),
        email: !this.newLease.email || !UTILS.isValidEmail(this.newLease.email),
        mileageLimit:
          !this.newLease.mileageLimit || isNaN(this.newLease.mileageLimit),
        additionalMileageCharge:
          !this.newLease.additionalMileageCharge ||
          isNaN(this.newLease.additionalMileageCharge),
        insurance: !this.newLease.insurance,
        minAge: !this.newLease.minAge || isNaN(this.newLease.minAge),
        securityDeposit:
          !this.newLease.securityDeposit ||
          isNaN(this.newLease.securityDeposit),
        acceptedIn: !this.newLease.acceptedIn,
        additionalDriverInsurance: !this.newLease.additionalDriverInsurance,
        excessClaim: !this.newLease.excessClaim,
        tollCharges:
          !this.newLease.tollCharges || isNaN(this.newLease.tollCharges),
        features: !this.newLease.features,
        type: !this.newLease.type,
        doors: !this.newLease.doors,
        seats: !this.newLease.seats,
        luggage: !this.newLease.luggage,
        whyChoose: !this.newLease.whyChoose,
        whyUs: !this.newLease.whyUs,
        canDeliver: !this.newLease.canDeliver,
        note: !this.newLease.note,
        dealerName: !this.newLease.dealerName,
        dealerLogo: !this.newLease.dealerLogo,
        listBullets: !this.newLease.listBullets,
        descDetails: !this.newLease.descDetails,
      };

      return Object.values(this.newLeaseValidation).every((el) => el === false)
        ? true
        : false;
    },
    cancelLease() {
      this.$router.go(-1);
    },
    async submitLease() {
      if (this.validateNewLeaseForm()) {
        let params = { ...this.newLease, postedBy: this.loginInfo?.id };
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
        const dealerLogoUploadResponse = await this.$store.dispatch(
          "imageUpload",
          params.dealerLogo
        );

        if (
          (response || galleryImageUploadResponse.status) &&
          dealerLogoUploadResponse.status
        ) {
          params = {
            ...params,
            dealerLogo: dealerLogoUploadResponse.fileName,
          };
          await this.$store.dispatch("addNewLease", params);
        } else {
          const alert = {
            show: true,
            type: "error",
            message:
              this.newLeaseInfo.message ||
              galleryImageUploadResponse ||
              META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }

        store.commit("updateLoader", false);
        if (this.newLeaseInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.newLeaseInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
          router.go(-1);
        } else {
          const alert = {
            show: true,
            type: "error",
            message: this.newLeaseInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }
        store.commit("updateNewLeaseInfo", {});
      } else {
        const firstError = Object.keys(this.newLeaseValidation).find(
          (i) => this.newLeaseValidation[i] === true
        );
        document.getElementById(firstError).scrollIntoView({
          behavior: "smooth",
        });
      }
    },
  },
};
