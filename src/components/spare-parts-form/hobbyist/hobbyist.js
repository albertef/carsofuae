import InputText from "@/components/common/input-text/input-text.vue";
import InputFile from "@/components/common/input-file/input-file.vue";
import Button from "@/components/common/button/button.vue";
import Select from "@/components/common/select/select.vue";
import TextArea from "@/components/common/text-area/text-area.vue";
import store from "@/store";
import router from "@/router";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "SpareHobbyistForm",
  components: {
    InputText,
    Button,
    Select,
    InputFile,
    TextArea,
  },

  data() {
    return {
      newPost: {
        name: "",
        description: "",
        // type: "",
        category: "",
        subcategory: "",
        spareItem: "",
        partNo: "",
        price: "",
        displayPicture: "",
        galleryImages: "",
        warranty: "",
        phone: "",
        whatsappNumber: "",
        email: "",
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
    newSpareHobbyistInfo() {
      return store.state.home.newSpareHobbyistInfo;
    },
    utils() {
      return UTILS;
    },
    sparePartsCategoryList() {
      return META.spareCategoryFormat.map((item) => item.title);
    },
    categoryList() {
      return store.getters.getSpareCategories;
    },
    subCategoryList() {
      return store.getters.getSpareSubCategories;
    },
    spareItemList() {
      return store.getters.getSpareItemList;
    },
  },
  methods: {
    // getCategoryOptions(type) {
    //   store.commit("updateSelectedSpareType", type);
    // },
    updatePostData(key, e) {
      if (key === "category") {
        this.newPost.subcategory = "";
        this.newPost.spareItem = "";
        store.commit("updateSelectedSpareCategory", e);
      } else if (key === "subcategory") {
        this.newPost.spareItem = "";
        store.commit("updateSelectedSpareSubCategory", e);
      } else if (key === "spareItem") {
        store.commit("updateSelectedSpareItem", e);
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
        name: !this.newPost.name,
        description: !this.newPost.description,
        // type: !this.newPost.type,
        category: !this.newPost.category,
        // subcategory: !this.newPost.subcategory,
        // spareItem: !this.newPost.spareItem,
        partNo: !this.newPost.partNo,
        price: !this.newPost.price,
        displayPicture: !this.newPost.displayPicture,
        galleryImages: !this.newPost.galleryImages,
        warranty: !this.newPost.warranty,
        phone: !this.newPost.phone || !UTILS.isValidPhone(this.newPost.phone),
        whatsappNumber:
          !this.newPost.whatsappNumber ||
          !UTILS.isValidPhone(this.newPost.whatsappNumber),
        email: !this.newPost.email || !UTILS.isValidEmail(this.newPost.email),
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
          await this.$store.dispatch("newSpareHobbyistPost", params);
        } else {
          const alert = {
            show: true,
            type: "error",
            message:
              this.newSpareHobbyistInfo.message ||
              galleryImageUploadResponse ||
              META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }

        store.commit("updateLoader", false);
        if (this.newSpareHobbyistInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message:
              this.newSpareHobbyistInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
          router.go(-1);
        } else {
          const alert = {
            show: true,
            type: "error",
            message:
              this.newSpareHobbyistInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }
        store.commit("updateNewSpareHobbyistInfo", {});
      }
    },
  },
};
