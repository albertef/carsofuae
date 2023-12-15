import ClassifiedsForm from "@/components/classifieds-form/classifieds-form.vue";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";
import router from "@/router";
import store from "@/store";

export default {
  name: "PostEdit",
  components: {
    ClassifiedsForm,
  },

  data() {
    return {
      individualUserDetails: {},
      companyUserDetails: {},
      registerValidation: {},
    };
  },
  async mounted() {},

  computed: {
    loginInfo() {
      return store.state.home.loginInfo;
    },
    selectedType() {
      return this.$route?.query?.page;
    },
    selectedCategory() {
      return this.$route?.query?.type;
    },
  },
  methods: {
    cancelLogin() {
      router.go(-1);
    },
  },
};
