import store from "@/store";
import Button from "@/components/common/button/button.vue";
import Modal from "@/components/common/modal/modal.vue";
import PostList from "@/components/post-list/post-list.vue";
import RentalList from "@/components/rental-list/rental-list.vue";
import LeaseList from "@/components/lease-list/lease-list.vue";
import { Carousel, Slide } from "vue-carousel";
import Star from "@/components/star/star.vue";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "classifieds-store",
  components: {
    Button,
    Modal,
    PostList,
    RentalList,
    LeaseList,
    Carousel,
    Slide,
    Star,
  },
  props: {
    type: {
      type: String | null,
      default: null,
    },
    id: {
      type: Number | null,
      default: null,
    },
  },
  data() {
    return {
      index: null,
      modalDisplay: false,
    };
  },
  async mounted() {
    store.commit("updateLoader", true);
    if (this.type === "classifieds") {
      await this.$store.dispatch("getPostList");
    } else if (this.type === "rental") {
      await this.$store.dispatch("getRentalList");
    } else if (this.type === "lease") {
      await this.$store.dispatch("getLeaseList");
    } else if (this.type === "spare") {
      await this.$store.dispatch("getPostList");
    }
    await this.$store.dispatch("getPostedByList");
    store.commit("updateLoader", false);
  },
  computed: {
    postedByData() {
      const postedByList = this.$store?.state.home.postedByList;
      return postedByList?.find((item) => item.id === Number(this.id));
    },
    filteredData() {
      let data = null;
      if (this.type === "classifieds") {
        data = this.$store?.state.home.postList;
      } else if (this.type === "rental") {
        data = this.$store?.state.home.rentalData;
      } else if (this.type === "lease") {
        data = this.$store?.state.home.leaseData;
      } else if (this.type === "spare") {
        data = this.$store?.state.home.postList;
      }
      return data?.filter((item) => item.postedBy === Number(this.id));
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
    calculateStarValue(value) {
      return UTILS.calculateStarValue(value);
    },
  },
};
