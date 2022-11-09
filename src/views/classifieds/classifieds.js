import router from '@/router'
import store from '@/store'
import PostList from '@/components/post-list/post-list.vue'
import CarList from '@/components/common/car-list/car-list.vue'
import MotorCycleList from '@/components/common/motorcycle-list/motorcycle-list.vue'
import BoatList from '@/components/common/boat-list/boat-list.vue'

import ClassifiedsCategorySelect from '@/components/classifieds-category-select/classifieds-category-select.vue'
import { META } from '@/meta/common.js'
import { UTILS } from '@/utility/utils.js'

export default {
  name: 'classifieds',
  components: {
    PostList,
    CarList,
    ClassifiedsCategorySelect,
    MotorCycleList,
    BoatList,
  },
  data() {
    return {}
  },
  async mounted() {
    store.commit(
      'updateSelectedClassifiedCategory',
      this.queryParams.category || '',
    )
  },
  computed: {
    getCategories() {
      return META.classifiedsCategories
    },
    getPostData() {
      const data = this.$store.state.home.postList
      const filteredData =
        this.getSelectedClassifiedCategory === 'Used Cars'
          ? data?.filter(
              (item) =>
                item?.company?.toLowerCase() ===
                  this.getSelectedCarMake?.toLowerCase() &&
                item?.model?.toLowerCase() ===
                  this.getSelectedCarModel?.toLowerCase(),
            )
          : this.getSelectedClassifiedCategory === 'Motorcycles'
          ? data?.filter(
              (item) =>
                item?.subcategory?.toLowerCase() ===
                this.getSelectedMotorcycleSubCategory?.toLowerCase(),
            )
            : this.getSelectedClassifiedCategory === 'Boats'
            ? data?.filter(
                (item) =>
                  item?.subcategory?.toLowerCase() ===
                  this.getSelectedBoatSubCategory?.toLowerCase(),
              )
          : null;
          return filteredData;
    },
    getSelectedClassifiedCategory() {
      return this.$store.state.home.selectedClassifiedCategory
    },
    getSelectedMotorcycleSubCategory() {
      return this.$store.state.home.selectedMotorCycleSubcategory
    },
    getSelectedBoatSubCategory() {
      return this.$store.state.home.selectedBoatSubcategory
    },
    getSelectedCarMake() {
      return this.$store.state.home.selectedCarMake
    },
    getSelectedCarModel() {
      return this.$store.state.home.selectedCarModel
    },

    queryParams() {
      if (!this.$route.query.make) {
        store.commit('updateSelectedCarMake', '')
      } else if (!this.$route.query.model) {
        store.commit('updateSelectedCarModel', '')
      } else if (!this.$route.query.category) {
        store.commit('updateSelectedClassifiedCategory', '')
      } else if (!this.$route.query.subcategory) {
        store.commit('updateSelectedMotorCycleSubcategory', '')
      }
      return this.$route.query
    },
    getBreadCrumb() {
      return Object.values(this.queryParams)
    },
    getBreadCrumbImage() {
      return this.getSelectedClassifiedCategory
        ? this.getCategories.find(
            (el) =>
              UTILS.formatTitle(el.name) ===
              UTILS.formatTitle(this.getSelectedClassifiedCategory),
          ).image
        : null
    },
  },
  methods: {},
}
