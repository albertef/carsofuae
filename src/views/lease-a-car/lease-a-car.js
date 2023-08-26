import router from "@/router";
import store from "@/store";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";
import LeaseCategorySelect from "@/components/lease-category-select/lease-category-select.vue";
import Modal from "@/components/common/modal/modal.vue";
import LeaseList from "@/components/lease-list/lease-list.vue";

export default {
  name: "lease",
  components: {
    LeaseCategorySelect,
    LeaseList,
    Modal,
  },
  data() {
    return {};
  },
  async mounted() {
    await this.$store.dispatch("getCarList");
    await this.$store.dispatch("getLeaseList");
    if (!this.queryParams) {
      router
        .push({
          name: "LeaseACar",
        })
        .catch(() => {});
    } else {
      store.commit(
        "updateSelectedLeaseCategory",
        this.queryParams.category || ""
      );
      store.commit("updateSelectedLeaseBrand", this.queryParams.brand || "");
    }
  },
  computed: {
    getLeaseData() {
      return this.$store.state.home.leaseData?.lease;
    },
    getLeaseCarTypes() {
      return META.leaseCarTypes;
    },
    getSelectedLeaseCategory() {
      return this.$store.state.home.selectedLeaseCategory;
    },
    getSelectedLeaseBrand() {
      return this.$store.state.home.selectedLeaseBrand;
    },
    currentQuery() {
      return Object.keys(this.$route.query).length;
    },
    queryParams() {
      if (!this.$route.query.category) {
        store.commit("updateSelectedLeaseCategory", "");
      }
      if (!this.$route.query.brand) {
        store.commit("updateSelectedLeaseBrand", "");
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
          store.commit("updateSelectedLeaseBrand", "");
        }
      },
      immediate: true,
    },
  },
  methods: {
    formatTitle(value) {
      return UTILS.formatTitle(value);
    },
    getLeaseCarList(make) {
      store.commit("updateSelectedLeaseBrand", UTILS.formatTitle(make));
      router.push({
        query: {
          ...router.query,
          brand: UTILS.formatTitle(make),
        },
      });
    },
  },
};
