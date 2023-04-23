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
  name: "AccessoriesForm",
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
        type: "",
        category: "",
        subcategory: "",
        accessoryItem: "",
        price: "",
        sellerType: "",
        accessoriesCondition: "",
        accessoriesUsage: "",
        warranty: "",
        name: "",
        phone: "",
        whatsappNumber: "",
        email: "",
        place: "",
        galleryImages: "",
        imageFolder: "",
        displayPicture: "",
        postedBy: "",
      },
      newPostValidation: {},
    };
  },
  async mounted() {
    await store.dispatch("getAccessoriesList");
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    newAccessoriesInfo() {
      return store.state.home.newAccessoriesInfo;
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
    accessoriesTypeList() {
      return META.accessoriesTypeFormat.map((item) => item.id);
    },
    accessoriesCategoryList() {
      return store.getters.getAccessoriesCategories;
    },
    subCategoryList() {
      return store.getters.getAccessoriesSubCategories;
    },
    // update by jesmi
    accessoryItemList() {
      return store.getters.getAccessoriesItemList;
    },
  },
  methods: {
    updatePostData(key, e) {
      if (key === "type") {
        store.commit("updateSelectedAccessoriesType", e);
      } else if (key === "category") {
        store.commit("updateSelectedAccessoriesCategory", e);
      } else if (key === "subcategory") {
        store.commit("updateSelectedAccessoriesSubCategory", e);
      } else if (key === "accessoryItem") {
        store.commit("updateSelectedAccessoriesItem", e);
      }
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
        type: !this.newPost.type,
        category: !this.newPost.category,
        subcategory: !this.newPost.subcategory,
        accessoryItem: !this.newPost.accessoryItem,
        price: !this.newPost.price,
        sellerType: !this.newPost.sellerType,
        accessoriesCondition: !this.newPost.accessoriesCondition,
        accessoriesUsage: !this.newPost.accessoriesUsage,
        warranty: !this.newPost.warranty,
        name: !this.newPost.name,
        phone: !this.newPost.phone || !UTILS.isValidPhone(this.newPost.phone),
        whatsappNumber:
          !this.newPost.whatsappNumber ||
          !UTILS.isValidPhone(this.newPost.whatsappNumber),
        email: !this.newPost.email || !UTILS.isValidEmail(this.newPost.email),
        place: !this.newPost.place,
        galleryImages: !this.newPost.galleryImages,
        displayPicture: !this.newPost.displayPicture,
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
          await this.$store.dispatch("newAccessoriesPost", params);
        }

        store.commit("updateLoader", false);
        if (this.newAccessoriesInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.newAccessoriesInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
          router.go(-1);
        } else {
          const errorMessage = this.newAccessoriesInfo.message
            ? this.newAccessoriesInfo.message
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
        store.commit("updateNewAccessoriesInfo", {});
      }
    },
  },
};
