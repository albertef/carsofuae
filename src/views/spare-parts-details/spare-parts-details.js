import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import { Disqus } from "vue-disqus";
import SpareDetailTable from "@/components/spare-detail-table/spare-detail-table.vue";
import store from "@/store";
import router from "@/router";
import Button from "@/components/common/button/button.vue";
import Modal from "@/components/common/modal/modal.vue";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "post-details",
  components: {
    CoolLightBox,
    SpareDetailTable,
    Disqus,
    Button,
    Modal,
  },
  data() {
    return {
      index: null,
      modalDisplay: false,
    };
  },
  async mounted() {
    store.commit("updateLoader", true);
    const params = {
      type: this.getSelectedSpareType || this.$route.query.type || "cars",
    };
    await this.$store.dispatch("getSpareItemList", params);
    await this.$store.dispatch("getPostedByList");
    store.commit("updateLoader", false);
  },
  computed: {
    getSelectedSpareType() {
      return this.$store.state.home.selectedSpareType;
    },
    getPostId() {
      return this.$route.query.id;
    },
    postData() {
      return this.$store?.getters.getSingleSpareData(this.getPostId);
    },
    postedByName() {
      const postedByList = this.$store?.state.home.postedByList;
      return (
        postedByList?.find((item) => item.id === Number(this.postData.postedBy))
          ?.name || "Guest"
      );
    },
    galleryImages() {
      return [
        this.postData.displayPicture,
        ...this.postData.galleryImages.split(","),
      ];
    },
    getVideoId() {
      return UTILS.isValidYTLink(this.postData.video);
    },
  },
  methods: {
    getImagePath(image, folder) {
      const folderPath = folder?.split(",")[0];
      return `${this.$baseURL}upload/${folderPath}/${image}`;
    },
    createLightBoxImage(image, folder) {
      const images = [this.postData.displayPicture, ...image.split(",")];
      const imageArr = images.map((item) => this.getImagePath(item, folder));
      return imageArr;
    },
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
      num &&
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
    openStore(id, userType) {
      router.push({
        name: "StoreProfile",
        query: {
          id: id,
          userType: userType,
          type: "spare",
          user: `${UTILS.formatTitle(this.postedByName)}`,
        },
      });
    },
  },
};
