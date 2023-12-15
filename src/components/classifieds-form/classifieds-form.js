import Select from "@/components/common/select/select.vue";
import UsedCars from "@/components/classifieds-form/used-cars/used-cars.vue";
import Boats from "@/components/classifieds-form/boats/boats.vue";
import Motorcycles from "@/components/classifieds-form/motorcycles/motorcycles.vue";
import Truck from "@/components/classifieds-form/truck/truck.vue";
import NumberPlates from "@/components/classifieds-form/number-plates/number-plates.vue";
import Accessories from "@/components/classifieds-form/accessories-and-parts/accessories-and-parts.vue";

import store from "@/store";
import { META } from "@/meta/common.js";

export default {
  name: "ClassifiedsForm",
  components: {
    Select,
    UsedCars,
    Boats,
    Motorcycles,
    Truck,
    NumberPlates,
    Accessories,
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
    if (this.category) {
      getCategoryOptions(this.category);
    }
  },

  computed: {
    categoryList() {
      return META.classifiedsCategories.map((item) => item.name);
    },
    selectedCategory() {
      return (
        this.queryParams?.type || store.state.home.selectedClassifiedCategory
      );
    },
    queryParams() {
      return this.$route.query;
    },
  },
  methods: {
    async getCategoryOptions(category) {
      store.commit("updateSelectedClassifiedCategory", category);
    },
  },
};
