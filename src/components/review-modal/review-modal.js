import Modal from "@/components/common/modal/modal.vue";
import Button from "@/components/common/button/button.vue";

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
  methods: {
    closeModal() {
      this.$emit("close");
    },
    addReview() {
      this.$emit("addReview");
    },
  },
};
