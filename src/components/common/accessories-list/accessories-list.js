import router from "@/router";
import store from "@/store";
import InputText from "@/components/common/input-text/input-text.vue";
import { META } from "@/meta/common.js";

export default {
  name: "AccessoriesList",
  components: {
    InputText,
  },
  data() {
    return {
      value: "",
      filterInputId: "accessoriesFilter",
    };
  },
  async mounted() {
     await this.$store.dispatch("getAccessoriesList");
     store.commit("updateSelectedAccessoriesType", this.queryParams.type || "");
    store.commit("updateSelectedAccessoriesCategory", this.queryParams.category || "");
    store.commit("updateSelectedAccessoriesSubCategory", this.queryParams.sub || "");
    document.getElementById(this.filterInputId)?.focus();
  },
  computed: {
    queryParams() {
      return this.$route.query;
    },
    getCategories() {
      return META.accessoriesCategoryFormat;
    },
    // getCarMakes() {
    //   const filteredData = this.$store.getters.getAllMakes;
    //   return filteredData.filter((make) =>
    //     String(make).toLowerCase().includes(this.value.toLowerCase())
    //   );
    // },
    getAccessoriesTypeCount() {
      return this.getCategories.length;
    },
    getCarModelCount() {
      return this.getAllModels.length;
    },
    getAllModels() {
      const filteredData = this.$store.getters.getAllModels(
        this.getSelectedCarMake
      );
      return filteredData.filter((model) =>
        String(model).toLowerCase().includes(this.value.toLowerCase())
      );
    },
    // getSelectedCarMake() {
    //   return this.$store.state.home.selectedCarMake;
    // },
    getSelectedAccessoriesType() {
      if(this.$store.state.home.selectedAccessoriesTyp){
        return "Category";
      }else if(this.$store.state.home.selectedAccessoryCategory){
        return "SubCategory"
      }else{
        return "Type"; 
      }  
    },
  
    getSelectedCarModel() {
      return this.$store.state.home.selectedCarModel;
    },
    getBreadCrumb() {
      return Object.values(this.queryParams);
    },
  },
  methods: {
    //changes by jesmi 1
    async getCategoryOptions(category = this.$route.query.category) {
      // store.commit("updateSelectedClassifiedCategory", category);

      // await this.$store.dispatch("getPostList", { category: category });

      // router.push({
      //   query: {
      //     ...this.queryParams,
      //     category: UTILS.formatTitle(this.getSelectedClassifiedCategory),
      //   },
      // });
    },
    getCarModels(make) {
      store.commit("updateSelectedCarMake", make);
      this.value = "";
      document.getElementById(this.filterInputId).focus();
      router.push({
        query: {
          ...this.queryParams,
          make: this.getSelectedCarMake,
        },
      });
    },
    getposts(model) {
      store.commit("updateSelectedCarModel", model);
      router.push({
        query: {
          ...this.queryParams,
          model: this.getSelectedCarModel,
        },
      });
    },
    filterAccessoriesData(e) {
      debugger;
      this.value = e;
    },
  },
};
