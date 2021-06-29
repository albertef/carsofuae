import Button from "@/components/common/button/button.vue";
import { META } from "@/meta/common.js";

export default {
  name: "PostDetailTable",
  components: {
    Button,
  },
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  computed: {
    services() {
      return META.serviceList;
    },
  },
};
