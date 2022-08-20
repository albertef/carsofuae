import Modal from "@/components/common/modal/modal.vue";
import Button from "@/components/common/button/button.vue";
import router from "@/router";

export default {
  name: "ReviewModal",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Modal,
    Button,
  },
  computed: {
    loginInfo() {
      return this.$store.state.home.loginInfo;
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    addReview() {
      if (this.loginInfo.isLoggedIn) {
        this.$emit("addReview");
      } else {
        router.push({
          name: "Login",
        });
      }
    },
  },
};
