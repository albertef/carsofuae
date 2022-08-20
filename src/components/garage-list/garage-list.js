import Star from "@/components/star/star.vue";
import garageServiceList from "@/meta/services.json";
import dayjs from "dayjs";
import { UTILS } from "@/utility/utils.js";
import GarageFilter from "@/components/garage-filter/garage-filter.vue";
import store from "@/store";
import router from "@/router";
import Button from "@/components/common/button/button.vue";

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
    GarageFilter,
    Button,
  },
  data() {
    return {
      filterEnabled: false,
    };
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
    loginInfo() {
      return this.$store.state.home.loginInfo;
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
    filterToggle() {
      this.filterEnabled = !this.filterEnabled;
    },
    addGarage() {
      if (this.loginInfo.isLoggedIn) {
        router.push({
          name: "AddNewGarage",
        });
      } else {
        router.push({
          name: "Login",
        });
      }
    },
  },
};
