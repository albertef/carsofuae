import router from "@/router";
import Star from "@/components/star/star.vue";
import dayjs from "dayjs";
import Button from "@/components/common/button/button.vue";
import garageServiceList from "@/meta/services.json";
import { Carousel, Slide } from "vue-carousel";
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
    Button,
    Carousel,
    Slide,
  },
  async mounted() {
    await this.$store.dispatch("getGarageList");
    this.$store.commit("updateGarageCategory", this.$route.query.category);
    router
      .push({
        name: "Garages",
        query: {
          id: this.selectedGarage,
          name: UTILS.formatTitle(this.getSingleGarageDetails.name),
        },
      })
      .catch(() => {});
  },
  unmounted() {
    router.push({
      name: "Garages",
      query: {
        category: this.garageCategory,
      },
    });
  },
  computed: {
    selectedGarage() {
      return this.$store.state.home.selectedGarage;
    },
    garageCategory() {
      return this.$store.state.home.garageCategory;
    },
    getSingleGarageDetails() {
      return this.$store.getters.getSingleGarageData(this.selectedGarage);
    },
  },
  methods: {
    openPhone(num) {
      document.location.href = `tel:${num}`;
    },
    socialOpen(link) {
      window.open(link);
    },
    openWhatsapp(num) {
      window.open(`https://wa.me/${num.replace(/[^\d\+]/g, "")}`);
    },
    openEmail(email) {
      window.location.href = `mailto:${email}`;
    },

    getServiceList(value) {
      return garageServiceList.filter((item) => value.includes(item.id));
    },
    backToGarageList() {
      this.$store.commit("updateSelectedGarage", null);
      this.$store.commit("updateGarageDetailsEnabled", false);
      router.push({
        name: "Garages",
        query: {
          category: this.garageCategory ? this.garageCategory : "browse",
        },
      });
    },
  },
};
