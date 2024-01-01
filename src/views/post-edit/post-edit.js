import ClassifiedsForm from "@/components/classifieds-form/classifieds-form.vue";
import RentalForm from "@/components/rental-form/rental-form.vue";
import LeaseForm from "@/components/lease-form/lease-form.vue";
import GaragesForm from "@/components/garages-form/garages-form.vue";
import SparePartsForm from "@/components/spare-parts-form/spare-parts-form.vue";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";
import router from "@/router";
import store from "@/store";

export default {
  name: "PostEdit",
  components: {
    ClassifiedsForm,
    RentalForm,
    LeaseForm,
    GaragesForm,
    SparePartsForm,
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
