export default {
  name: "PostSort",
  components: {},
  data() {
    return {
      sortedData: null,
    };
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    this.$store.commit("updateSortCriteria", "new");
    this.applySort(this.sortCriteria);
  },
  computed: {
    sortCriteria() {
      return this.$store.state.home.sortCriteria;
    },
  },
  methods: {
    applySort(value) {
      this.$store.commit("updateSortCriteria", value);
      if (this.$route.name !== "Rental" && this.$route.name !== "LeaseACar") {
        if (value === "new") {
          this.sortedData = this.data?.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        } else if (value === "old") {
          this.sortedData = this.data?.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
        } else if (value === "high") {
          this.sortedData = this.data?.sort(
            (a, b) => Number(b.price) - Number(a.price)
          );
        } else if (value === "low") {
          this.sortedData = this.data?.sort(
            (a, b) => Number(a.price) - Number(b.price)
          );
        }
      } else {
        if (value === "new") {
          this.sortedData = this.data?.sort(
            (a, b) =>
              new Date(b.created).getTime() - new Date(a.created).getTime()
          );
        } else if (value === "old") {
          this.sortedData = this.data?.sort(
            (a, b) => new Date(a.created) - new Date(b.created)
          );
        } else if (value === "high") {
          this.sortedData = this.data?.sort(
            (a, b) => Number(b.price[2].price) - Number(a.price[2].price)
          );
        } else if (value === "low") {
          this.sortedData = this.data?.sort(
            (a, b) => Number(a.price[2].price) - Number(b.price[2].price)
          );
        }
      }
      this.$emit("sortedData", this.sortedData);
    },
    closeFilter() {
      this.$emit("close");
    },
  },
};
