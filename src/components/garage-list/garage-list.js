import router from "@/router";
import Star from "@/components/star/star.vue";
import garageServiceList from "@/meta/services.json";

const GARAGE_CATEGORY = {
  deals: "deals",
  browse: "browse",
};

export default {
  name: "garageList",
  components: {
    Star,
  },
  mounted() {
    this.$store.dispatch("getGarageList");
  },
  computed: {
    garageCategory() {
      return this.$route.query.category;
    },
    garageList() {
      if (this.garageCategory === GARAGE_CATEGORY.deals) {
        return this.$store.state.home.garageList.filter(
          (item) => item.deals === true
        );
      }
      return this.$store.state.home.garageList;
    },
  },
  methods: {
    updateGarageCategory(value) {
      this.$store.commit("updateGarageCategory", value);
      router.push({
        name: "Garages",
        query: {
          category: value,
        },
      });
    },
    getServiceList(value) {
      return garageServiceList.filter((item) => value.includes(item.id));
    },
    calculateStarValue(value) {
      let starValue = 0;
      for (let index of value) {
        starValue += index.star;
      }
      return starValue / value.length;
    },
  },
};
