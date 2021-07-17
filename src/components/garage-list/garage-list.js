import router from "@/router";
import Star from "@/components/star/star.vue";
import garageServiceList from "@/meta/services.json";
import dayjs from "dayjs";
import { UTILS } from "@/utility/utils.js";

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const GARAGE_CATEGORY = {
  deals: "deals",
  browse: "browse",
};

export default {
  name: "garageList",
  components: {
    Star,
  },
  async mounted() {
    await this.$store.dispatch("getGarageList");
    this.$store.commit("updateGarageCategory", this.$route.query.category);
  },
  computed: {
    garageCategory() {
      return this.$store.state.home.garageCategory;
    },
    garageList() {
      return this.$store.state.home.garageList;
    },
    dealsList() {
      let dealsArray = [];
      this.$store.state.home.garageList.filter((item) => {
        if (item.isDeals && item.deals.length) {
          const deals = item.deals.map((deal) => {
            let id = { id: item.id };
            return { ...id, ...deal };
          });
          dealsArray = [...dealsArray, ...deals];
        }
      });
      return dealsArray.sort((a, b) => dayjs(b.date) - dayjs(a.date));
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
      return UTILS.calculateStarValue(value);
    },
    formatDate(date) {
      return UTILS.formatDate(date);
    },
    garageDetails(id) {
      this.$store.commit("updateSelectedGarage", id);
      this.$store.commit("updateGarageDetailsEnabled", true);
    },
  },
};
