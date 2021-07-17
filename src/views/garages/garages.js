import router from "@/router";
import garageList from "@/components/garage-list/garage-list.vue";
import garageDetails from "@/components/garage-details/garage-details.vue";

export default {
  name: "garages",
  components: {
    garageList,
    garageDetails,
  },
  mounted() {
    if (this.$route.query.id) {
      this.$store.commit("updateSelectedGarage", this.$route.query.id);
      this.$store.commit("updateGarageDetailsEnabled", true);
    } else {
      this.$store.commit("updateSelectedGarage", null);
      this.$store.commit("updateGarageDetailsEnabled", false);
    }
  },
  computed: {
    garageCategory() {
      return this.$store.state.home.garageCategory;
    },
    isDetailEnabled() {
      return this.$store.state.home.garageDetailsEnabled;
    },
    isListEnabled() {
      if (this.$route.query.category) {
        this.$store.commit("updateGarageDetailsEnabled", false);
        return true;
      } else {
        this.$store.commit("updateGarageDetailsEnabled", true);
        return false;
      }
    },
  },
};
