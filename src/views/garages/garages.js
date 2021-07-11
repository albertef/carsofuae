import router from "@/router";
import garageList from "@/components/garage-list/garage-list.vue";

export default {
  name: "garages",
  components: {
    garageList,
  },
  mounted() {},
  computed: {
    garageCategory() {
      return this.$route.query.category;
    },
  },
  methods: {
    getServiceList1(value) {
      return this.garageServices.filter((item) => value.includes(item.id));
    },
  },
};
