import router from '@/router'
import store from '@/store'
import InputText from '@/components/common/input-text/input-text.vue'
import { UTILS } from '@/utility/utils.js'

export default {
  name: 'CarList',
  components: {
    InputText,
  },
  data() {
    return {
      value: '',
      filterInputId: 'carFilter',
    }
  },
  async mounted() {
    await this.$store.dispatch('getCarList')
    store.commit('updateSelectedCarMake', this.queryParams.make || '')
    store.commit('updateSelectedCarModel', this.queryParams.model || '')
    document.getElementById(this.filterInputId)?.focus()
  },
  computed: {
    queryParams() {
      return this.$route.query
    },
    getCarMakes() {
      const filteredData = this.$store.getters.getAllMakes
      return filteredData.filter((make) =>
        String(make).toLowerCase().includes(this.value.toLowerCase()),
      )
    },
    getCarMakeCount() {
      return this.getCarMakes.length
    },
    getCarModelCount() {
      return this.getAllModels.length
    },
    getAllModels() {
      const filteredData = this.$store.getters.getAllModels(
        this.getSelectedCarMake,
      )
      return filteredData.filter((model) =>
        String(model).toLowerCase().includes(this.value.toLowerCase()),
      )
    },
    getSelectedCarMake() {
      return this.$store.state.home.selectedCarMake
    },
    getSelectedCarModel() {
      return this.$store.state.home.selectedCarModel
    },
    getBreadCrumb() {
      return Object.values(this.queryParams)
    },
  },
  methods: {
    getCarModels(make) {
      store.commit('updateSelectedCarMake', make)
      this.value = ''
      document.getElementById(this.filterInputId).focus()
      router.push({
        query: {
          ...this.queryParams,
          make: this.getSelectedCarMake,
        },
      })
    },
    getposts(model) {
      store.commit('updateSelectedCarModel', model)
      router.push({
        query: {
          ...this.queryParams,
          model: this.getSelectedCarModel,
        },
      })
    },
    filterCarData(e) {
      this.value = e
    },
    formatTitle(value) {
      return UTILS.formatTitle(value)
    },
  },
}
