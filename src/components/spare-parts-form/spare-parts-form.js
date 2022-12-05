import Radio from "@/components/common/radio/radio.vue";
import InputText from "@/components/common/input-text/input-text.vue";
import InputFile from "@/components/common/input-file/input-file.vue";
import Button from "@/components/common/button/button.vue";
import Select from "@/components/common/select/select.vue";
import UsedCars from "@/components/classifieds-form/used-cars/used-cars.vue";
import Boats from "@/components/classifieds-form/boats/boats.vue";
import Motorcycles from "@/components/classifieds-form/motorcycles/motorcycles.vue";
import Truck from "@/components/classifieds-form/truck/truck.vue";
import NumberPlates from "@/components/classifieds-form/number-plates/number-plates.vue";

import store from "@/store";
import router from "@/router";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "ClassifiedsForm",
  components: {
    Radio,
    InputText,
    Button,
    Select,
    InputFile,
    UsedCars,
    Boats,
    Motorcycles,
    Truck,
    NumberPlates,
  },

  data() {
    return {
      newPost: {
        description: "",
        place: "",
        price: "",
        distance: "",
        phone: "",
        email: "",
        brand: "",
        model: "",
        make: "",
        trim: "",
        displayPicture: "",
        galleryImages: "",
        imageFolder: "",
        exteriorColor: "",
        interiorColor: "",
        bodyCondition: "",
        mechanicalCondition: "",
        warranty: "",
        doors: "",
        sellerType: "",
        bodyType: "",
        transmission: "",
        cylinders: "",
        regionalSpecs: "",
        fuel: "",
        horsePower: "",
        steeringSide: "",
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
    newPostInfo() {
      return store.state.home.newPostInfo;
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
    categoryList() {
      return META.classifiedsCategories.map((item) => item.name);
    },
    selectedCategory() {
      return store.state.home.selectedClassifiedCategory;
    },
  },
  methods: {
    getCategoryOptions(category) {
      store.commit("updateSelectedClassifiedCategory", category);
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
        description: !this.newPost.description,
        place: !this.newPost.place,
        price: !this.newPost.price,
        email: !this.newPost.email || !UTILS.isValidEmail(this.newPost.email),
        distance: !this.newPost.distance,
        brand: !this.newPost.brand,
        phone: !this.newPost.phone || !UTILS.isValidPhone(this.newPost.phone),
        model: !this.newPost.model,
        make: !this.newPost.make,
        displayPicture: !this.newPost.displayPicture,
        galleryImages: !this.newPost.galleryImages,
        exteriorColor: !this.newPost.exteriorColor,
        interiorColor: !this.newPost.interiorColor,
        bodyCondition: !this.newPost.bodyCondition,
        mechanicalCondition: !this.newPost.mechanicalCondition,
        warranty: !this.newPost.warranty,
        doors: !this.newPost.doors,
        sellerType: !this.newPost.sellerType,
        bodyType: !this.newPost.bodyType,
        transmission: !this.newPost.transmission,
        cylinders: !this.newPost.cylinders,
        regionalSpecs: !this.newPost.regionalSpecs,
        fuel: !this.newPost.fuel,
        horsePower: !this.newPost.horsePower,
        steeringSide: !this.newPost.steeringSide,
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
          await this.$store.dispatch("newClassifiedPost", params);
        } else {
          const alert = {
            show: true,
            type: "error",
            message:
              this.newPostInfo.message ||
              galleryImageUploadResponse ||
              META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }

        store.commit("updateLoader", false);
        if (this.newPostInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.newPostInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
          router.go(-1);
        } else {
          const alert = {
            show: true,
            type: "error",
            message: this.newPostInfo.message || META.commonErrorMessage,
          };
          store.commit("updateAlert", alert);
        }
        store.commit("updateNewPostInfo", {});
      }
    },
  },
};
