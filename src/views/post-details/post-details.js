import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import { Disqus } from "vue-disqus";
import PostDetailTable from "@/components/post-detail-table/post-detail-table.vue";
import store from "@/store";
import router from "@/router";
import Button from "@/components/common/button/button.vue";
import Modal from "@/components/common/modal/modal.vue";
import { UTILS } from "@/utility/utils.js";

export default {
  name: "post-details",
  components: {
    CoolLightBox,
    PostDetailTable,
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
    await this.$store.dispatch("getPostList");
    await this.$store.dispatch("getPostedByList");
    store.commit("updateLoader", false);
  },
  computed: {
    getPostId() {
      return this.$route.query.id;
    },
    postData() {
      return this.$store?.getters.getSinglePostData(this.getPostId);
    },
    postedByName() {
      const postedByList = this.$store?.state.home.postedByList;
      return (
        postedByList?.find((item) => item.id === Number(this.postData.postedBy))
          ?.name || "Guest"
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
    openStore(id) {
      router.push({
        name: "StoreProfile",
        query: {
          id: id,
          type: "classifieds",
          user: `${UTILS.formatTitle(this.postedByName)}`,
        },
      });
    },
  },
};
