import Modal from "@/components/common/modal/modal.vue";
import Button from "@/components/common/button/button.vue";
import store from "@/store";
import { META } from "@/meta/common.js";
import { UTILS } from "@/utility/utils.js";
import router from "@/router";

export default {
  name: "LocationMapInstructions",
  components: {
    Modal,
    Button,
  },

  computed: {
    userTypes() {
      return META.loginUserType[0];
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
