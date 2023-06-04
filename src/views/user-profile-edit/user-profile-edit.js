import Radio from "@/components/common/radio/radio.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import InputFile from "@/components/common/input-file/input-file.vue";
import InputDate from "@/components/common/input-date/input-date.vue";
import Button from "@/components/common/button/button.vue";
import Checkbox from "@/components/common/checkbox/checkbox.vue";
import Select from "@/components/common/select/select.vue";
import store from "@/store";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";
import router from "@/router";

export default {
  name: "UserProfileEdit",
  components: {
    Radio,
    InputText,
    InputFile,
    InputDate,
    Button,
    Checkbox,
    Select,
  },

  data() {
    return {
      individualUserDetails: {},
      companyUserDetails: {},
      registerValidation: {},
    };
  },
  async mounted() {
    if (!this.loginInfo.isLoggedIn) {
      router.push({
        name: "Login",
      });
    } else {
      if (!this.selectedUserType) {
        store.commit("updateSelectedUserType", this.loginInfo.userType);
      }
      if (!this.userInfo?.id) {
        store.commit("updateLoader", true);
        const usernameParams = {
          username: this.loginInfo?.username,
          id: Number(this.loginInfo?.id),
          userType: this.loginInfo.userType,
        };
        await this.$store.dispatch("userDetails", usernameParams);
        store.commit("updateLoader", false);
      }
      if (this.selectedUserType === this.userTypes.individual.title) {
        this.individualUserDetails = {
          ...this.individualUserDetails,
          id: Number(this.loginInfo?.id),
          username: this.userInfo.username,
          firstname: this.userInfo.firstName,
          lastname: this.userInfo.lastName,
          email: this.userInfo.email,
          contactNumber: this.userInfo.contactNumber,
          whatsappNumber: this.userInfo.whatsappNumber,
          nl: this.userInfo.newsletter,
        };
      } else if (this.selectedUserType === this.userTypes.company.title) {
        this.companyUserDetails = {
          ...this.companyUserDetails,
          id: Number(this.loginInfo?.id),
          username: this.userInfo.username,
          firstname: this.userInfo.firstName,
          lastname: this.userInfo.lastName,
          businessName: this.userInfo.businessName,
          email: this.userInfo.email,
          contactNumber: this.userInfo.contactNumber,
          whatsappNumber: this.userInfo.whatsappNumber,
          address: this.userInfo.address,
          streetAddress: this.userInfo.streetAddress,
          addressLine2: this.userInfo.addressLine2,
          emirate: this.userInfo.emirate,
          postalCode: this.userInfo.postalCode,
          facebook: this.userInfo.facebook,
          instagram: this.userInfo.instagram,
          linkedin: this.userInfo.linkedin,
          nl: this.userInfo.newsletter,
        };
      }
    }
  },
  computed: {
    userInfo() {
      return store.state.home.userDetails;
    },
    userTypes() {
      return META.loginUserType[0];
    },
    selectedUserType() {
      return store.state.home.selectedUserType;
    },
    loginInfo() {
      return store.state.home.loginInfo;
    },
    registerInfo() {
      return store.state.home.registerInfo;
    },
  },
  methods: {
    updateUserDetails(key, e) {
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

    resetValidation() {
      this.registerValidation = {};
    },

    validateRegisterForm() {
      if (this.selectedUserType === this.userTypes?.individual?.title) {
        this.registerValidation = {
          ...this.registerValidation,
          firstname: !this.individualUserDetails.firstname,
          lastname: !this.individualUserDetails.lastname,
          email:
            !this.individualUserDetails.email ||
            !UTILS.isValidEmail(this.individualUserDetails.email),
          contactNumber:
            !this.individualUserDetails.contactNumber ||
            !UTILS.isValidPhone(this.individualUserDetails.contactNumber),
          whatsappNumber:
            !this.individualUserDetails.whatsappNumber ||
            !UTILS.isValidPhone(this.individualUserDetails.whatsappNumber),
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
        };
      }
      return Object.values(this.registerValidation).every((el) => el === false)
        ? true
        : false;
    },

    logout() {
      store.commit("updateLoginInfo", null);
      store.commit("updateUserDetails", null);
      router.push({
        name: "Login",
      });
    },

    async submitLogin() {
      if (this.validateRegisterForm()) {
        let params = null;
        store.commit("updateLoader", true);
        if (this.selectedUserType === this.userTypes?.individual?.title) {
          params = this.individualUserDetails;
          await this.$store.dispatch("individualUserUpdate", params);
        } else if (this.selectedUserType === this.userTypes?.company?.title) {
          params = this.companyUserDetails;
          await this.$store.dispatch("companyUserUpdate", params);
        }

        store.commit("updateLoader", false);
        if (this.registerInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.registerInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
          this.logout();
        } else {
          const alert = {
            show: true,
            type: "error",
            message: this.registerInfo.message || META.commonErrorMessage,
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
      router.go(-1);
    },
  },
};
