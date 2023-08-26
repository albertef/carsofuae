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
import leaseFeaturesList from "@/meta/features.json";
import FAQ from "@/components/faq/faq.vue";

export default {
  name: "lease-details",
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
    FAQ,
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
    await this.$store.dispatch("getLeaseList");
    this.$store.commit("updateSelectedLease", this.$route.query.id);
    router
      .push({
        name: "LeaseACarDetails",
        query: {
          id: this.getLeaseId,
          title: `${UTILS.formatTitle(this.leaseData.name)}-${UTILS.formatTitle(
            this.leaseData.desc
          )}`,
        },
      })
      .catch(() => {});
    store.commit("updateLoader", false);
  },
  unmounted() {
    router.push({
      name: "LeaseACar",
    });
  },
  computed: {
    getLeaseId() {
      return this.$store.state.home.selectedLease;
    },
    leaseData() {
      return this.$store.getters.getSingleLeaseData(this.getLeaseId);
    },
    getLeaseFAQ() {
      return this.$store?.state.home?.faqList;
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
    getFeaturesList(value) {
      return leaseFeaturesList.filter((item) => value.includes(item.id));
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
    getDealerLogo(image, folder) {
      const folderName = folder?.split(",")[0];
      return `${this.$baseURL}upload/${folderName}/${image}`;
    },
    calculateStarValue(value) {
      return UTILS.calculateStarValue(value);
    },
    getGalleryImagePath(image, folder) {
      const folderPath = folder?.split(",")[0];
      return `${this.$baseURL}upload/${folderPath}/${image}`;
    },
    checkOpenTime(data) {
      const today = dayjs().format("dddd");
      const newData = data.filter(
        (item) => item.day.toLowerCase() === today.toLowerCase()
      );
      const times = newData[0]?.time?.split(" - ");
      if (times[0] === "Closed") {
        return {
          title: "Closed Now",
          data: newData,
        };
      } else {
        const openTime = dayjs().hour(times[0]?.split(".")[0]).format("H");
        const closeTime = dayjs().hour(times[1]?.split(".")[0]).format("H");
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
      const one = price.filter((el) => el.per === "1")[0];
      const two = price.filter((el) => el.per === "2")[0];
      const three = price.filter((el) => el.per === "3")[0];

      return Number(one.price) ? one : Number(two.price) ? two : three;
    },
    socialOpen(link) {
      window.open(link);
    },
    openStore(id, userType) {
      router.push({
        name: "StoreProfile",
        query: {
          id: id,
          userType: userType,
          type: "lease",
          user: `${UTILS.formatTitle(this.postedByName)}`,
        },
      });
    },
  },
};
