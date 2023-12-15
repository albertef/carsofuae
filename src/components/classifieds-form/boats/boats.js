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
  name: "BoatsForm",
  components: {
    Radio,
    InputText,
    Button,
    Select,
    InputFile,
  },

  props: {
    action: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      newPost: {
        subCategory: "",
        name: "",
        age: "",
        phone: "",
        whatsappNumber: "",
        email: "",
        place: "",
        galleryImages: "",
        displayPicture: "",
        imageFolder: "",
        boatCondition: "",
        boatHistory: "",
        length: "",
        warranty: "",
        sellerType: "",
        price: "",
        year: "",
        postedBy: "",
        userType: "",
        video: "",
      },
      newPostValidation: {},
    };
  },
  async mounted() {
    //await store.dispatch("getCarList");
    if (this.action === "edit") {
      await this.getPostData();
    }
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    newBoatInfo() {
      return store.state.home.newBoatInfo;
    },
    utils() {
      return UTILS;
    },
    getSelectedClassifiedCategory() {
      return (
        this.$store.state.home.selectedClassifiedCategory ||
        this.$route.query.category
      );
    },
    queryParams() {
      return this.$route.query;
    },
  },
  methods: {
    async getPostData() {
      const data = await this.$store.dispatch("getPostList", {
        category: this.queryParams?.type,
      });
      this.newPost = data.post?.find(
        (item) => Number(item.id) === Number(this.queryParams?.id)
      );
    },

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
        subCategory: !this.newPost.subCategory,
        name: !this.newPost.name,
        age: !this.newPost.age,
        phone: !this.newPost.phone || !UTILS.isValidPhone(this.newPost.phone),
        whatsappNumber:
          !this.newPost.whatsappNumber ||
          !UTILS.isValidPhone(this.newPost.whatsappNumber),
        email: !this.newPost.email || !UTILS.isValidEmail(this.newPost.email),
        place: !this.newPost.place,
        galleryImages: !this.newPost.galleryImages,
        displayPicture: !this.newPost.displayPicture,
        boatCondition: !this.newPost.boatCondition,
        boatHistory: !this.newPost.boatHistory,
        length: !this.newPost.length,
        warranty: !this.newPost.warranty,
        sellerType: !this.newPost.sellerType,
        price: !this.newPost.price,
        year: !this.newPost.year,
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
          await this.$store.dispatch("newBoatsPost", params);
        }

        store.commit("updateLoader", false);
        if (this.newBoatInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.newBoatInfo.message,
          };
          store.commit("updateAlert", alert);
          router.go(-1);
        } else {
          const errorMessage = this.newBoatInfo.message
            ? this.newBoatInfo.message
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
        store.commit("updateNewBoatInfo", {});
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
