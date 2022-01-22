import store from "@/store";
import SellerProfile from "@/components/seller-profile/seller-profile.vue";

export default {
  name: "rental-store",
  components: {
    SellerProfile,
  },
  computed: {
    getPageType() {
      return this.$route.query.type;
    },
    getPostId() {
      return this.$route.query.id;
    },
  },
};
