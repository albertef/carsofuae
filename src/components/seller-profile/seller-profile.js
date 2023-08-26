import store from "@/store";
import Button from "@/components/common/button/button.vue";
import Modal from "@/components/common/modal/modal.vue";
import PostList from "@/components/post-list/post-list.vue";
import RentalList from "@/components/rental-list/rental-list.vue";
import LeaseList from "@/components/lease-list/lease-list.vue";
import SpareItemsList from "@/components/spare-items-list/spare-items-list.vue";
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
    SpareItemsList,
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
    userType: {
      type: String | null,
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
    const usernameParams = {
      //username: this.loginInfo?.username,
      id: this.id,
      userType: this.userType,
    };
    await this.$store.dispatch("userDetails", usernameParams);

    if (this.type === "classifieds") {
      const params = {
        category:
          this.getSelectedClassifiedCategory || this.$route.query.category,
      };
      await this.$store.dispatch("getPostList", params);
    } else if (this.type === "rental") {
      await this.$store.dispatch("getRentalList");
    } else if (this.type === "lease") {
      await this.$store.dispatch("getLeaseList");
    } else if (this.type === "spare") {
      await this.$store.dispatch("getSpareItemList");
    }
    //await this.$store.dispatch("getPostedByList");
    store.commit("updateLoader", false);
  },
  computed: {
    getSelectedClassifiedCategory() {
      return this.$store.state.home.selectedClassifiedCategory;
    },
    postedByData() {
      return this.$store?.state.home.userDetails;
      //return postedByList?.find((item) => item.id === Number(this.id));
    },
    filteredData() {
      let data = null;
      if (this.type === "classifieds") {
        data = this.$store?.state.home.postList;
      } else if (this.type === "rental") {
        data = this.$store?.state.home.rentalData.rental;
      } else if (this.type === "lease") {
        data = this.$store?.state.home.leaseData.lease;
      } else if (this.type === "spare") {
        data = this.$store?.state.home.spareItemList;
      }
      console.log("data: ", data);
      console.log(
        data?.filter((item) => Number(item.postedBy) === Number(this.id))
      );
      return data?.filter((item) => Number(item.postedBy) === Number(this.id));
    },
  },
  methods: {
    openPhone(num) {
      document.location.href = `tel:${num}`;
    },
    getImagePath(image, folder) {
      const folderPath = folder?.split(",")[0];
      return `${this.$baseURL}upload/${folderPath}/${image}`;
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
    socialOpen(link) {
      let formattedLink = link;
      if (!link.includes("http")) {
        formattedLink = `https://${link}`;
      }
      window.open(formattedLink);
    },
  },
};
