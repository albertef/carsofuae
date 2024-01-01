import Select from "@/components/common/select/select.vue";
import Cars from "@/components/spare-parts-form/cars/cars.vue";
import Bikes from "@/components/spare-parts-form/bikes/bikes.vue";
import Apparels from "@/components/spare-parts-form/apparel/apparel.vue";
import Hobbyist from "@/components/spare-parts-form/hobbyist/hobbyist.vue";
import HeavyVehicles from "@/components/spare-parts-form/heavy/heavy.vue";

import store from "@/store";
import { META } from "@/meta/common.js";

export default {
  name: "SparePartsForm",
  components: {
    Select,
    Cars,
    Bikes,
    Apparels,
    Hobbyist,
    HeavyVehicles,
  },

  props: {
    action: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
  },

  async mounted() {
    await store.dispatch("getSpareList");
    store.commit(
      "updateSelectedSpareType",
      this.queryParams.type?.toLowerCase()
    );
  },
  computed: {
    sparePartsCategoryList() {
      return META.spareCategoryFormat.map((item) => item.title);
    },
    selectedSpareType() {
      return this.queryParams?.type || store.state.home.selectedSpareType;
    },
    queryParams() {
      return this.$route.query;
    },
  },
  methods: {
    getCategoryOptions(type) {
      store.commit("updateSelectedSpareType", type.toLowerCase());
    },
  },
};
