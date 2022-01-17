import store from "@/store";
import Button from "@/components/common/button/button.vue";
import Modal from "@/components/common/modal/modal.vue";
import RentalList from "@/components/rental-list/rental-list.vue";
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "rental-store",
  components: {
    Button,
    Modal,
    RentalList,
    Carousel,
    Slide,
  },
  data() {
    return {
      index: null,
      modalDisplay: false,
    };
  },
  async mounted() {
    store.commit("updateLoader", true);
    await this.$store.dispatch("getRentalList");
    await this.$store.dispatch("getPostedByList");
    store.commit("updateLoader", false);
  },
  computed: {
    getPostId() {
      return this.$route.query.id;
    },
    postedByData() {
      const postedByList = this.$store?.state.home.postedByList;
      return postedByList?.find((item) => item.id === Number(this.getPostId));
    },
    filteredData() {
      const data = this.$store?.state.home.rentalData;
      return data?.filter((item) => item.postedBy === Number(this.getPostId));
    },
  },
  methods: {
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
    async sharePage() {
      const shareData = {
        title: "Cars Of UAE",
        text: "Cars Of UAE",
        url: decodeURIComponent(window.location.href),
      };

      try {
        await navigator.share(shareData);
        alert("Page Shared successfully");
      } catch (err) {
        if (err.toString().includes("AbortError")) {
          return;
        }
        this.modalDisplay = true;
      }
    },
    hideModal() {
      this.modalDisplay = false;
    },
  },
};
