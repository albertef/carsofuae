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
  name: "NumberPlatesForm",
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
        whatsappNumber: "",
        email: "",
        place: "",
        displayPicture: "",
        galleryImages: "",
        imageFolder: "",
        subcategory: "",
        emirate: "",
        digits: "",
        postedBy: "",
        userType: "",
        video: "",
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
    newNumberPlatesInfo() {
      return store.state.home.newNumberPlatesInfo;
    },
    brandsList() {
      return store.getters.getAllMakes;
    },
    modelsList() {
      return store.getters.getAllModels(this.newPost.brand);
    },
    trimList() {
      return store.getters.getTrimList(this.newPost.brand, this.newPost.model);
    },
    utils() {
      return UTILS;
    },
    removeAlAinList() {
      const locationList = this.utils.emiratesLocationList();
      return locationList.filter((item) => item != "Al Ain");
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
        whatsappNumber:
          !this.newPost.whatsappNumber ||
          !UTILS.isValidPhone(this.newPost.whatsappNumber),
        email: !this.newPost.email || !UTILS.isValidEmail(this.newPost.email),
        place: !this.newPost.place,
        displayPicture: !this.newPost.displayPicture,
        galleryImages: !this.newPost.galleryImages,
        subcategory: !this.newPost.subcategory,
        emirate: !this.newPost.emirate,
        digits: !this.newPost.digits,
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
        let params = {
          ...this.newPost,
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
          await this.$store.dispatch("newNumberPlatesPost", params);
        }

        store.commit("updateLoader", false);
        if (this.newNumberPlatesInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.newNumberPlatesInfo.message,
          };
          store.commit("updateAlert", alert);
          router.go(-1);
        } else {
          const errorMessage = this.newNumberPlatesInfo.message
            ? this.newNumberPlatesInfo.message
            : !response || galleryImageUploadResponse.status
            ? galleryImageUploadResponse.message
            : !displayPictureUploadResponse.status
            ? displayPictureUploadResponse.message
            : META.commonErrorMessage;
          const alert = {
            show: true,
            type: "error",
            message: errorMessage,
          };
          store.commit("updateAlert", alert);
        }
        store.commit("updateNewNumberPlatesInfo", {});
      } else {
        const firstError = Object.keys(this.newPostValidation).find(
          (i) => this.newPostValidation[i] === true
        );
        document.getElementById(firstError).scrollIntoView({
          behavior: "smooth",
        });
      }
    },
  },
};
