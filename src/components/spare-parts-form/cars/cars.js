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
  name: "SpareCarsForm",
  components: {
    InputText,
    Button,
    Select,
    InputFile,
    TextArea,
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
        name: "",
        description: "",
        // type: "",
        brand: "",
        model: "",
        year: "",
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
    if (this.action === "edit") {
      await this.getPostData();
    }
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    newSpareCarInfo() {
      return store.state.home.newSpareCarInfo;
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
    queryParams() {
      return this.$route.query;
    },
  },
  methods: {
    // getCategoryOptions(type) {
    //   store.commit("updateSelectedSpareType", type);
    // },
    async getPostData() {
      const data = await this.$store.dispatch("getSpareItemList", {
        type: this.queryParams.type,
      });
      this.newPost = data.post?.find(
        (item) => Number(item.id) === Number(this.queryParams?.id)
      );

      //delete this.newGarage.galleryImages;
      //delete this.newGarage.profilePicture;
    },

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
      } else if (key === "brand") {
        this.newPost.model = "";
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
        brand: !this.newPost.brand,
        model: !this.newPost.model,
        year: !this.newPost.year,
        category: !this.newPost.category,
        //subcategory: !this.newPost.subcategory,
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

        if (this.action === "edit") {
          params = {
            ...params,
            id: this.queryParams?.id,
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
          await this.$store.dispatch("newSpareCarPost", params);
        } else {
          const alert = {
            show: true,
            type: "error",
            message:
              this.newSpareCarInfo.message ||
              galleryImageUploadResponse ||
              META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }

        store.commit("updateLoader", false);
        if (this.newSpareCarInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.newSpareCarInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
          router.go(-1);
        } else {
          const alert = {
            show: true,
            type: "error",
            message: this.newSpareCarInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }
        store.commit("updateNewSpareCarInfo", {});
      }
    },
  },
};
