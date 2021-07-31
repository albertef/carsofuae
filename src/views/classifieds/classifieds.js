import router from "@/router";
import store from "@/store";
import PostList from "@/components/post-list/post-list.vue";
import CarList from "@/components/common/car-list/car-list.vue";

export default {
  name: "classifieds",
  components: {
    PostList,
    CarList,
  },
  data() {
    return {};
  },
  async mounted() {
    await this.$store.dispatch("getPostList");
  },
  computed: {
    getPostData() {
      const data = this.$store.state.home.postList;
      return data.filter(
        (item) =>
          item.company.toLowerCase() ===
            this.getSelectedCarMake.toLowerCase() &&
          item.model.toLowerCase() === this.getSelectedCarModel.toLowerCase()
      );
    },
    getSelectedCarMake() {
      return this.$store.state.home.selectedCarMake;
    },
    getSelectedCarModel() {
      return this.$store.state.home.selectedCarModel;
    },

    queryParams() {
      if (!this.$route.query.make) {
        store.commit("updateSelectedCarMake", "");
      } else if (!this.$route.query.model) {
        store.commit("updateSelectedCarModel", "");
      }
      return this.$route.query;
    },
    getBreadCrumb() {
      return Object.values(this.queryParams);
    },
  },
  methods: {},
};
