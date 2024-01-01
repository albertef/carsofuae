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
  name: "ClassifiedsEdit",
  components: {
    Radio,
    InputText,
    InputFile,
    InputDate,
    Button,
    Checkbox,
    Select,
  },
  props: {
    type: String,
  },
  data() {
    return {
      usedCarDetails: {},
      motorcycleDetails: {},
      boatDetails: {},
      truckDetails: {},
      accessoriesDetails: {},
      newPostValidation: {},
      newPost: {},
    };
  },
  async mounted() {
    await store.dispatch("getCarList");
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
          //username: this.loginInfo?.username,
          id: Number(this.loginInfo?.id),
          userType: this.loginInfo.userType,
        };
        await this.$store.dispatch("userDetails", usernameParams);
        store.commit("updateLoader", false);
      }
      if (this.type === "used-cars") {
        this.usedCarDetails = {
          ...this.usedCarDetails,
          id: Number(this.loginInfo?.id),
        };
      }
    }
  },
  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    queryParams() {
      return this.$route.query;
    },
    async postData() {
      this.newPost = await this.getPostData();
      return this.newPost;
    },
    brandsList() {
      return store.getters.getAllMakes;
    },
    modelsList() {
      return store.getters.getAllModels(this.postData.brand);
    },
    trimList() {
      return store.getters.getTrimList(
        this.postData.brand,
        this.postData.model
      );
    },
    utils() {
      return UTILS;
    },
  },
  methods: {
    async getPostData() {
      if (this.queryParams?.page == "classifieds") {
        const data = await this.$store.dispatch("getPostList", {
          category: this.queryParams?.type,
        });
        return data.post?.find(
          (item) => Number(item.id) === Number(this.queryParams?.id)
        );
      } else if (this.queryParams?.page == "rental") {
        const data = await this.$store.dispatch("getRentalList");
        return data.rental?.find(
          (item) => Number(item.id) === Number(this.queryParams?.id)
        );
      } else if (this.queryParams?.page == "lease-a-car") {
        const data = await this.$store.dispatch("getLeaseList");
        return data.lease?.find(
          (item) => Number(item.id) === Number(this.queryParams?.id)
        );
      } else if (this.queryParams?.page == "garages") {
        if (this.queryParams?.type == "garages") {
          const data = await this.$store.dispatch("getGarageList");
          return data.garages?.find(
            (item) => Number(item.id) === Number(this.queryParams?.id)
          );
        }
      } else if (this.queryParams?.page == "spare-parts") {
        const data = await this.$store.dispatch("getSpareItemList", {
          type: this.queryParams?.type,
        });
        return data.post?.find(
          (item) => Number(item.id) === Number(this.queryParams?.id)
        );
      }
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
  },
};
