import Radio from "@/components/common/radio/radio.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import InputFile from "@/components/common/input-file/input-file.vue";
import Button from "@/components/common/button/button.vue";
import Select from "@/components/common/select/select.vue";
import store from "@/store";
import router from "@/router";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "MotorCyclesForm",
  components: {
    Radio,
    InputText,
    Button,
    Select,
    InputFile,
  },
 
  data() {
    return {
      newPost: {
        name: "",
        phone: "",
        email: "",
        place: "",
        displayPicture: "",
        galleryImages: "",
        imageFolder: "",
        subcategory: "",
        finalDriveSystem: "",
        wheels: "",
        engineSize: "",
        subSpecification: "",
        regionalSpec: "",
        priceToPrice: "",
        exteriorColor: "",
        bodyCondition: "",
        mechanicalCondition: "",
        sellerType: "",
        postedBy: "",
      },
      newPostValidation: {},
    };
  },
  async mounted() {
    await store.dispatch("getCarList");
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    newMotorCyclesInfo() {
      return store.state.home.newMotorCyclesInfo;
    },
    brandsList() {
      return store.getters.getAllCarMakes;
    },
    modelsList() {
      return store.getters.getAllCarModels(this.newPost.brand);
    },
    trimList() {
      return store.getters.getTrimList(this.newPost.brand, this.newPost.model);
    },
    utils() {
      return UTILS;
    },
  },
  methods: {
    updatePostData(key, e) {
      this.newPost = {
        ...this.newPost,
        [key]: e,
      };
    },

    resetValidation() {
      this.newPostValidation = {};
    },

    validateNewPostForm() {
      this.newPostValidation = {
        ...this.newPostValidation,
        name: !this.newPost.name,
        phone: !this.newPost.phone || !UTILS.isValidPhone(this.newPost.phone),
        email: !this.newPost.email || !UTILS.isValidEmail(this.newPost.email),
        place: !this.newPost.place,
        displayPicture: !this.newPost.displayPicture,
        galleryImages: !this.newPost.galleryImages,
        subcategory: !this.newPost.subcategory,
        finalDriveSystem: !this.newPost.finalDriveSystem,
        wheels: !this.newPost.wheels,
        engineSize: !this.newPost.engineSize,
        subSpecification: !this.newPost.subSpecification,
        regionalSpec: !this.newPost.regionalSpec,
        priceToPrice: !this.newPost.priceToPrice,
        exteriorColor: !this.newPost.exteriorColor,
        bodyCondition: !this.newPost.bodyCondition,
        mechanicalCondition: !this.newPost.mechanicalCondition,
        sellerType: !this.newPost.sellerType,
      };

      return Object.values(this.newPostValidation).every((el) => el === false)
        ? true
        : false;
    },
    cancelPost() {
      this.$router.go(-1);
    },
    async submitPost() {
       if (this.validateNewPostForm()) {
        let params = { ...this.newPost, postedBy: this.loginInfo?.id };
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
          params.displayPicture
        );

        if (
          (response || galleryImageUploadResponse.status) &&
          displayPictureUploadResponse.status
        ) {
          params = {
            ...params,
            displayPicture: displayPictureUploadResponse.fileName,
          };
          await this.$store.dispatch("newMotorCyclesPost", params);
        } else {
          const alert = {
            show: true,
            type: "error",
            message:
              this.newMotorCyclesInfo.message ||
              galleryImageUploadResponse ||
              META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }

        store.commit("updateLoader", false);
        if (this.newMotorCyclesInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.newMotorCyclesInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
          router.go(-1);
        } else {
          const alert = {
            show: true,
            type: "error",
            message: this.newMotorCyclesInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }
        store.commit("updateNewMotorCyclesInfo", {});
      }
    },
  },
};
