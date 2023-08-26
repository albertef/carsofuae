import router from "@/router";
import store from "@/store";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";
import RentalCategorySelect from "@/components/rental-category-select/rental-category-select.vue";
import Modal from "@/components/common/modal/modal.vue";
import RentalList from "@/components/rental-list/rental-list.vue";

export default {
  name: "rental",
  components: {
    RentalCategorySelect,
    RentalList,
    Modal,
  },
  data() {
    return {
      popularBrand: null,
    };
  },
  async mounted() {
    await this.$store.dispatch("getCarList");
    await this.$store.dispatch("getRentalList");
    if (!this.queryParams) {
      router
        .push({
          name: "Rental",
        })
        .catch(() => {});
    } else {
      store.commit(
        "updateSelectedRentalCategory",
        this.queryParams.category || ""
      );
      store.commit("updateSelectedRentalBrand", this.queryParams.brand || "");
    }
  },
  computed: {
    getRentalData() {
      return this.$store.state.home.rentalData.rental;
    },
    getRentalCarTypes() {
      return META.rentalCarTypes;
    },
    getSelectedRentalCategory() {
      return this.$store.state.home.selectedRentalCategory;
    },
    getSelectedRentalBrand() {
      return this.$store.state.home.selectedRentalBrand;
    },
    currentQuery() {
      return Object.keys(this.$route.query).length;
    },
    queryParams() {
      if (!this.$route.query.category) {
        store.commit("updateSelectedRentalCategory", "");
      }
      if (!this.$route.query.brand) {
        store.commit("updateSelectedRentalBrand", "");
      }
      return this.$route.query;
    },
    getCarMakes() {
      store.commit("updateSelectedClassifiedCategory", "used-cars");
      return store.getters.getAllMakes;
    },
  },
  watch: {
    currentQuery: {
      handler(newVal) {
        if (newVal === 0) {
          store.commit("updateSelectedRentalCategory", "");
          store.commit("updateSelectedRentalBrand", "");
        }
      },
      immediate: true,
    },
  },
  methods: {
    formatTitle(value) {
      return UTILS.formatTitle(value);
    },
    getRentalCarList(make) {
      store.commit("updateSelectedRentalBrand", UTILS.formatTitle(make));
      router.push({
        query: {
          ...router.query,
          brand: UTILS.formatTitle(make),
        },
      });
    },
  },
};
