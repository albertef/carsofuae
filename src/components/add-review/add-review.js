import Modal from "@/components/common/modal/modal.vue";
import Button from "@/components/common/button/button.vue";
import TextArea from "@/components/common/text-area/text-area.vue";
import Select from "@/components/common/select/select.vue";

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
    TextArea,
    Select,
  },
  data() {
    return {
      ratingOptions: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    closeAddReview() {
      this.$emit("close");
    },
    addReview() {
      console.log("Review Add");
      this.closeAddReview();
    },
    getSelectInput(e) {
      console.log(e);
    },
  },
};
