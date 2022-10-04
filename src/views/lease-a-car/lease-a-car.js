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
    await this.$store.dispatch("getLeaseList");
    !this.queryParams
      ? router
          .push({
            name: "LeaseACar",
          })
          .catch(() => {})
      : store.commit(
          "updateSelectedLeaseCategory",
          this.queryParams.category || ""
        );
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
    queryParams() {
      if (!this.$route.query.category) {
        store.commit("updateSelectedLeaseCategory", "");
      }
      return this.$route.query;
    },
  },
  methods: {},
};
