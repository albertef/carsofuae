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
    return {};
  },
  async mounted() {
    await this.$store.dispatch("getRentalList");
    store.commit(
      "updateSelectedRentalCategory",
      this.queryParams.category || ""
    );
  },
  computed: {
    getRentalData() {
      return this.$store.state.home.rentalData;
    },
    getRentalCarTypes() {
      return META.rentalCarTypes;
    },
    getSelectedRentalCategory() {
      return this.$store.state.home.selectedClassifiedCategory;
    },
    queryParams() {
      if (!this.$route.query.category) {
        store.commit("updateSelectedRentalCategory", "");
      }
      return this.$route.query;
    },
  },
  methods: {},
};
