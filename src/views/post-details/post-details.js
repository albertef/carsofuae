import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import { Disqus } from "vue-disqus";
import PostDetailTable from "@/components/post-detail-table/post-detail-table.vue";
import store from "@/store";
import Button from "@/components/common/button/button.vue";
import Modal from "@/components/common/modal/modal.vue";

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
    store.commit("updateLoader", false);
  },
  computed: {
    getPostId() {
      return this.$route.query.id;
    },
    postData() {
      return this.$store?.getters.getSinglePostData(this.getPostId);
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
    async sharePage() {
      const shareData = {
        title: "MDN",
        text: "Learn web development on MDN!",
        url: "https://developer.mozilla.org",
      };
      try {
        await navigator.share(shareData);
        alert("MDN shared successfully");
      } catch (err) {
        this.modalDisplay = true;
      }
    },
    hideModal() {
      this.modalDisplay = false;
    },
  },
};
