import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import PostDetailTable from "@/components/post-detail-table/post-detail-table.vue";
import store from "@/store";
import Button from "@/components/common/button/button.vue";
import Modal from "@/components/common/modal/modal.vue";
import { UTILS } from "@/utility/utils.js";
import { Carousel, Slide } from "vue-carousel";
import Star from "@/components/star/star.vue";
import router from "@/router";
import dayjs from "dayjs";
import { META } from "@/meta/common.js";
import Accordion from "@/components/common/accordion/accordion.vue";
import AccordionItem from "@/components/common/accordion/accordion-item.vue";

export default {
  name: "post-details",
  components: {
    CoolLightBox,
    PostDetailTable,
    Button,
    Modal,
    Carousel,
    Slide,
    Star,
    Accordion,
    AccordionItem,
  },
  data() {
    return {
      index: null,
      modalDisplay: false,
      timing: false,
    };
  },
  async mounted() {
    store.commit("updateLoader", true);
    await store.dispatch("getPostedByList");
    await store.dispatch("getRentalList");
    store.commit("updateSelectedRental", this.$route.query.id);
    router
      .push({
        name: "RentalDetails",
        query: {
          id: this.getRentalId,
          title: `${UTILS.formatTitle(
            this.rentalData.name
          )}-${UTILS.formatTitle(this.rentalData.desc)}`,
        },
      })
      .catch(() => {});

    store.commit("updateLoader", false);
  },
  unmounted() {
    router.push({
      name: "Rental",
    });
  },
  computed: {
    getRentalId() {
      return this.$store.state.home.selectedRental;
    },
    rentalData() {
      return this.$store.getters.getSingleRentalData(this.getRentalId);
    },
    getRentalSpecs() {
      return META.rentalCarSpecs;
    },
    getRentalFeatures() {
      return META.rentalCarFeatures;
    },
    getRentalFAQ() {
      return META.faq;
    },
    postedByName() {
      const postedByList = this.$store?.state.home?.postedByList;
      return (
        postedByList?.find(
          (item) => item.id === Number(this.rentalData.postedBy)
        )?.name || "Guest"
      );
    },
  },
  methods: {
    leftArrowClick() {
      this.$refs.scroller.scrollLeft -= 1250;
    },
    rightArrowClick() {
      this.$refs.scroller.scrollLeft += 1250;
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
    checkOpenTime(data) {
      const today = dayjs().format("dddd");
      const newData = data.filter((item) => item.day === today);
      const times = newData[0].time.split(" - ");
      if (times[0] === "Closed") {
        return {
          title: "Closed Now",
          data: newData,
        };
      } else {
        const openTime = dayjs().hour(times[0].split(":")[0]).format("H");
        const closeTime = dayjs().hour(times[1].split(":")[0]).format("H");
        const currentTime = dayjs().hour();
        if (currentTime < Number(openTime) && currentTime > Number(closeTime)) {
          return {
            title: "Closed Now",
            data: newData,
          };
        } else {
          return {
            title: "Open Now",
            data: newData,
          };
        }
      }
    },
    openTimingContainer() {
      this.timing = !this.timing;
    },
    getPrice(price) {
      const day = price.filter((el) => el.per === "day")[0];
      const week = price.filter((el) => el.per === "week")[0];
      const month = price.filter((el) => el.per === "month")[0];

      return Number(day.price) ? day : Number(week.price) ? week : month;
    },
    socialOpen(link) {
      window.open(link);
    },
    openStore(id) {
      router.push({
        name: "StoreProfile",
        query: {
          id: id,
          type: "rental",
          user: `${UTILS.formatTitle(this.postedByName)}`,
        },
      });
    },
  },
};
