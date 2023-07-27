import Star from "@/components/star/star.vue";
import garageServiceList from "@/meta/services.json";
import dayjs from "dayjs";
import { UTILS } from "@/utility/utils.js";
import { META } from "@/meta/common.js";
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
      fullGarageData: [],
    };
  },
  async mounted() {
    await this.$store.dispatch("getGarageList");
    await this.$store.dispatch("getDealsList");
    this.$store.commit("updateGarageCategory", this.$route.query.category);
    this.fullGarageData = this.garageListData;
  },
  computed: {
    garageCategory() {
      return this.$store.state.home.garageCategory;
    },
    garageListData() {
      return this.$store.state.home.garageList.garages;
    },
    garageList: {
      get() {
        return this.fullGarageData;
      },
      set(filteredData) {
        this.fullGarageData = filteredData;
      },
    },
    garageDeals() {
      return this.$store.state.home.garageDeals.deals;
    },
    dealsList() {
      let dealsArray = [];
      this.garageList.filter((item) => {
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
    userTypes() {
      return META.loginUserType[0];
    },
    showNewPost() {
      return this.loginInfo.userType === this.userTypes.company.title;
    },
    isFilter() {
      return this.$store.state.home.isFilterApplied;
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
    getImagePath(image, folder) {
      const folderPath = folder?.split(",")[0];
      return `${this.$baseURL}upload/${folderPath}/${image}`;
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
    getProfilePic(garages) {
      const folder = garages.imageFolder.split(",")[0];
      return `${this.$baseURL}upload/${folder}/${garages.profilePicture}`;
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
    updatePostData(data) {
      this.fullGarageData = data;
    },
    clearFilter() {
      this.fullGarageData = this.garageListData;
      this.$store.commit("updateIsFilterApplied", false);
    },
  },
};
