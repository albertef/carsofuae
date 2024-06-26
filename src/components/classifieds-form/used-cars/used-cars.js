import Radio from "@/components/common/radio/radio.vue";
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
  name: "ClassifiedsForm",
  components: {
    Radio,
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
        description: "",
        place: "",
        price: "",
        distance: "",
        phone: "",
        whatsappNumber: "",
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
        userType: "",
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
    queryParams() {
      return this.$route.query;
    },
  },
  methods: {
    async getPostData() {
      const data = await this.$store.dispatch("getPostList", {
        category: this.queryParams?.type,
      });
      const originalData = data.post?.find(
        (item) => Number(item.id) === Number(this.queryParams?.id)
      );

      this.newPost = {
        ...originalData,
        description: originalData.desc,
        cylinders: originalData.noOfCylinders,
        transmission: originalData.transmissionType,
        fuel: originalData.fuelType,
      };

      delete this.newPost.desc;
      delete this.newPost.noOfCylinders;
      delete this.newPost.transmissionType;
      delete this.newPost.fuelType;
    },

    updatePostData(key, e) {
      if (key === "brand") {
        this.newPost.model = "";
        this.newPost.trim = "";
      }
      if (key === "model") {
        this.newPost.trim = "";
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
        brand: !this.newPost.brand,
        model: !this.newPost.model,
        make: !this.newPost.make,
        description: !this.newPost.description,
        place: !this.newPost.place,
        price: !this.newPost.price,
        email: !this.newPost.email || !UTILS.isValidEmail(this.newPost.email),
        distance: !this.newPost.distance,
        phone: !this.newPost.phone || !UTILS.isValidPhone(this.newPost.phone),
        whatsappNumber:
          !this.newPost.whatsappNumber ||
          !UTILS.isValidPhone(this.newPost.whatsappNumber),
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
          if (this.action === "edit") {
            params = {
              ...params,
              id: this.queryParams?.id,
            };
          }
          await this.$store.dispatch("newClassifiedPost", params);
        }

        store.commit("updateLoader", false);
        if (this.newPostInfo.status) {
          const alert = {
            show: true,
            type: "success",
            message: this.newPostInfo.message,
          };
          store.commit("updateAlert", alert);
          router.go(-1);
        } else {
          const errorMessage = this.newPostInfo.message
            ? this.newPostInfo.message
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
        store.commit("updateNewPostInfo", {});
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
