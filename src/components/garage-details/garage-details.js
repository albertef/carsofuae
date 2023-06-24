import router from "@/router";
import Star from "@/components/star/star.vue";
import dayjs from "dayjs";
import Button from "@/components/common/button/button.vue";
import garageServiceList from "@/meta/services.json";
import { Carousel, Slide } from "vue-carousel";
import { UTILS } from "@/utility/utils.js";
import GarageDeal from "@/components/garage-deal/garage-deal.vue";

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
    GarageDeal,
  },
  async mounted() {
    await this.$store.dispatch("getGarageList");
    await this.$store.dispatch("getDealsList");
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
    loginInfo() {
      return this.$store.state.home.loginInfo;
    },
    garageDeals() {
      const deals = this.$store.state.home.garageDeals?.deals;
      const sort = deals?.filter(
        (item) =>
          Number(this.getSingleGarageDetails?.id) === Number(item.garageId)
      );
      return sort;
    },
    isDeals() {
      return this.garageDeals?.length;
    },
  },
  methods: {
    getServiceList(value) {
      return garageServiceList.filter((item) => value.includes(item.id));
    },
    getImagePath(image, folder) {
      const folderPath = folder?.split(",")[0];
      return `${this.$baseURL}upload/${folderPath}/${image}`;
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
    getProfilePic(garage) {
      const folder = garage.imageFolder.split(",")[0];
      return `${this.$baseURL}upload/${folder}/${garage.profilePicture}`;
    },
    getGalleryArray(galleryImages) {
      return galleryImages.length > 1
        ? galleryImages.split(",")
        : galleryImages[0];
    },
    getGalleryImagePath(image, folder) {
      const folderPath = folder.split(",")[0];
      return `${this.$baseURL}upload/${folderPath}/${image}`;
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
    openPhone(num) {
      document.location.href = `tel:${num}`;
    },
    openWhatsapp(num) {
      window.open(
        `https://wa.me/${num.replace(
          /[^\d\+]/g,
          ""
        )}?text=Hey! I am Interested in your ad. ${encodeURIComponent(
          window.location.href
        )}`
      );
    },
    openEmail(email) {
      window.location.href = `mailto:${email}`;
    },
    socialOpen(link) {
      let formattedLink = link;
      if (!link.includes("http")) {
        formattedLink = `https://${link}`;
      }
      window.open(formattedLink);
    },
  },
};
