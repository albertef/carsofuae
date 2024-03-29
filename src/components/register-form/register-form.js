import Radio from "@/components/common/radio/radio.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import InputFile from "@/components/common/input-file/input-file.vue";
import InputDate from "@/components/common/input-date/input-date.vue";
import Button from "@/components/common/button/button.vue";
import Checkbox from "@/components/common/checkbox/checkbox.vue";
import Select from "@/components/common/select/select.vue";
import TextArea from "@/components/common/text-area/text-area.vue";
import LocationMapInstructions from "@/components/location-map-instructions/location-map-instructions.vue";
import store from "@/store";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";
import router from "@/router";

export default {
  name: "RegisterForm",
  components: {
    Radio,
    InputText,
    InputFile,
    InputDate,
    Button,
    Checkbox,
    Select,
    TextArea,
    LocationMapInstructions,
  },

  data() {
    return {
      individualUserDetails: {
        firstname: "",
        lastname: "",
        dob: "",
        email: "",
        gender: "",
        username: "",
        password: "",
        confirmPassword: "",
        contactNumber: "",
        whatsappNumber: "",
        location: "",
        displayPicture: "",
        imageFolder: "",
        tc: false,
        nl: true,
      },
      companyUserDetails: {
        firstname: "",
        lastname: "",
        businessName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        contactNumber: "",
        whatsappNumber: "",
        address: "",
        streetAddress: "",
        addressLine2: "",
        emirate: "",
        postalCode: "",
        businessType: "",
        tradeLicense: "",
        logo: "",
        facebook: "",
        instagram: "",
        linkedin: "",
        sliderImages: "",
        imageFolder: "",
        locationMap: "",
        tc: false,
        nl: true,
      },
      // selectedUserType: null,
      date: new Date(),
      registerValidation: {},
      showLocationModal: false,
    };
  },
  mounted() {
    if (!this.selectedUserType) {
      this.selectedUserType = this.userTypes?.individual?.title;
    }
  },
  computed: {
    userTypes() {
      return META.loginUserType[0];
    },
    genderOptions() {
      return META.genderOptions;
    },
    locationOptions() {
      return UTILS.emiratesLocationList();
    },
    businessTypeOptions() {
      return META.businessTypeOptions;
    },
    registerInfo() {
      return store.state.home.registerInfo;
    },
    selectedUserType: {
      get() {
        return store.state.home.selectedUserType;
      },
      set(value) {
        this.resetValidation();
        store.commit("updateSelectedUserType", value);
      },
    },
  },
  methods: {
    updateUserDetails(key, e) {
      if (key === "locationMap") {
        e = UTILS.formatMapSrc(e);
      }
      if (this.selectedUserType === this.userTypes?.individual?.title) {
        this.individualUserDetails = {
          ...this.individualUserDetails,
          [key]: e,
        };
      } else if (this.selectedUserType === this.userTypes?.company?.title) {
        this.companyUserDetails = {
          ...this.companyUserDetails,
          [key]: e,
        };
      }
    },

    showLocationInstructions() {
      this.showLocationModal = true;
    },

    closeReviewModal() {
      this.showLocationModal = false;
    },

    resetValidation() {
      this.registerValidation = {};
    },

    validateRegisterForm() {
      if (this.selectedUserType === this.userTypes?.individual?.title) {
        this.registerValidation = {
          ...this.registerValidation,
          firstname: !this.individualUserDetails.firstname,
          lastname: !this.individualUserDetails.lastname,
          dob: !this.individualUserDetails.dob,
          email:
            !this.individualUserDetails.email ||
            !UTILS.isValidEmail(this.individualUserDetails.email),
          gender: !this.individualUserDetails.gender,
          username:
            !this.individualUserDetails.username ||
            this.individualUserDetails.username.includes(" "),
          password: !this.individualUserDetails.password,
          confirmPassword:
            !this.individualUserDetails.confirmPassword ||
            this.individualUserDetails.password !==
              this.individualUserDetails.confirmPassword,
          contactNumber:
            !this.individualUserDetails.contactNumber ||
            !UTILS.isValidPhone(this.individualUserDetails.contactNumber),
          whatsappNumber:
            !this.individualUserDetails.whatsappNumber ||
            !UTILS.isValidPhone(this.individualUserDetails.whatsappNumber),
          location: !this.individualUserDetails.location,
          displayPicture: !this.individualUserDetails.displayPicture,
          tc: !this.individualUserDetails.tc,
        };
      } else {
        this.registerValidation = {
          ...this.registerValidation,
          firstname: !this.companyUserDetails.firstname,
          lastname: !this.companyUserDetails.lastname,
          businessName: !this.companyUserDetails.businessName,
          email:
            !this.companyUserDetails.email ||
            !UTILS.isValidEmail(this.companyUserDetails.email),
          username:
            !this.companyUserDetails.username ||
            this.companyUserDetails.username.includes(" "),
          password: !this.companyUserDetails.password,
          confirmPassword:
            !this.companyUserDetails.confirmPassword ||
            this.companyUserDetails.password !==
              this.companyUserDetails.confirmPassword,
          contactNumber:
            !this.companyUserDetails.contactNumber ||
            !UTILS.isValidPhone(this.companyUserDetails.contactNumber),
          whatsappNumber:
            !this.companyUserDetails.whatsappNumber ||
            !UTILS.isValidPhone(this.companyUserDetails.whatsappNumber),
          address: !this.companyUserDetails.address,
          streetAddress: !this.companyUserDetails.streetAddress,
          emirate: !this.companyUserDetails.emirate,
          postalCode: !this.companyUserDetails.postalCode,
          businessType: !this.companyUserDetails.businessType,
          tradeLicense: !this.companyUserDetails.tradeLicense,
          logo: !this.companyUserDetails.logo,
          sliderImages: !this.companyUserDetails.sliderImages,
          tc: !this.companyUserDetails.tc,
        };
      }
      return Object.values(this.registerValidation).every((el) => el === false)
        ? true
        : false;
    },

    async submitLogin() {
      if (this.validateRegisterForm()) {
        let params = null;
        store.commit("updateLoader", true);
        if (this.selectedUserType === this.userTypes?.individual?.title) {
          params = this.individualUserDetails;
          var imageUploadResponse = await this.$store.dispatch(
            "imageUpload",
            params.displayPicture
          );
          if (imageUploadResponse.status) {
            params = {
              ...params,
              displayPicture: imageUploadResponse.fileName,
              imageFolder: imageUploadResponse.folderName,
            };
            await this.$store.dispatch("individualUserRegister", params);
          }
        } else if (this.selectedUserType === this.userTypes?.company?.title) {
          params = this.companyUserDetails;
          var sliderImageUploadResponse = await this.$store.dispatch(
            "imageUpload",
            params.sliderImages
          );
          var response = null;
          if (sliderImageUploadResponse.length > 1) {
            response = sliderImageUploadResponse.find(
              (item) => item.status === false
            )
              ? false
              : true;
            params = {
              ...params,
              sliderImages: sliderImageUploadResponse
                .map((item) => item.fileName)
                .join(","),
              imageFolder: sliderImageUploadResponse
                .map((item) => item.folderName)
                .join(","),
            };
          } else {
            params = {
              ...params,
              sliderImages: sliderImageUploadResponse.fileName,
              imageFolder: sliderImageUploadResponse.folderName,
            };
          }
          var logoImageUploadResponse = await this.$store.dispatch(
            "imageUpload",
            params.logo
          );
          var tradeImageUploadResponse = await this.$store.dispatch(
            "imageUpload",
            params.tradeLicense
          );
          if (
            (response || sliderImageUploadResponse.status) &&
            logoImageUploadResponse.status &&
            tradeImageUploadResponse.status
          ) {
            params = {
              ...params,
              logo: logoImageUploadResponse.fileName,
              tradeLicense: tradeImageUploadResponse.fileName,
            };
            await this.$store.dispatch("companyUserRegister", params);
          }
        }
        store.commit("updateLoader", false);
        if (this.registerInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.registerInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
          this.$router.go(-1);
        } else {
          const errorMessage = this.registerInfo.message
            ? this.registerInfo.message
            : !response || sliderImageUploadResponse.status
            ? sliderImageUploadResponse.message
            : !logoImageUploadResponse.status
            ? logoImageUploadResponse.message
            : !tradeImageUploadResponse.status
            ? tradeImageUploadResponse.message
            : !imageUploadResponse.status
            ? imageUploadResponse.message
            : META.commonErrorMessage;
          const alert = {
            show: true,
            type: "error",
            message: errorMessage,
          };
          store.commit("updateAlert", alert);
        }
        store.commit("updateRegisterInfo", {});
      } else {
        const firstError = Object.keys(this.registerValidation).find(
          (i) => this.registerValidation[i] === true
        );
        document.getElementById(firstError).scrollIntoView({
          behavior: "smooth",
        });
      }
    },

    cancelLogin() {
      router.push({
        name: "Login",
      });
    },
  },
};
