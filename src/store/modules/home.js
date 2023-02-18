import { axiosInstance } from '@/utility/axios.js'
import { setLogin, clearLogin } from '@/utility/helper'
import { UTILS } from '@/utility/utils.js'

const state = {
  postList: [],
  garageList: [],
  garageCategory: 'browse',
  garageDetailsEnabled: false,
  selectedGarage: null,
  carData: [],
  motorCycleData: [],
  selectedCarMake: "",
  selectedCarModel: "",
  selectedClassifiedCategory: "used-cars",
  selectedRentalCategory: "",
  postView: false,
  rentalData: [],
  selectedRental: null,
  selectedLeaseCategory: '',
  leaseData: [],
  selectedLease: null,
  spareList: [],
  //update by jesmi
  accessoriesList: [],
  selectedSpareType: '',
  selectedSpareCategory: '',
  selectedSpareSubCategory: '',
  selectedSpareItem: '',
  selectedAccessoriesType: '',
  selectedAccessoryCategory: '',
  selectedAccessorySubCategory: '',
  selectedAccessoryItem: '',
  spareItemList: [],
  postedByList: [],
  loginInfo: {
    isLoggedIn: false,
    username: '',
    message: '',
    jwtToken: '',
    id: null,
    userType: '',
  },
  registerInfo: {},
  imageUploadInfo: {},
  userDetails: {},
  selectedUserType: '',
  newPostInfo: {},
  newSpareCarInfo: {},
  newSpareBikesInfo: {},
  newSpareApparelInfo: {},
  newSpareHobbyistInfo: {},
  newSpareHeavyInfo: {},
  newBoatInfo: {},
  newAccessoriesInfo: {},
  newMotorCyclesInfo: {},
  newNumberPlatesInfo: {},
  newTruckInfo: {},
  newGarageInfo: {},
  newReviewInfo: {},
  newFAQInfo: {},
  reviewList: [],
  faqList: [],
  newRentalInfo: {},
  newLeaseInfo: {},
  selectedMotorCycleSubcategory: '',
  selectedSubcategory: '',
  selectedTruckSubcategory: '',
}

const actions = {
  async userLogin({ commit }, params) {
    let dataset = {},
      url = '/carsofuae-server/users/login.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateLoginInfo', dataset)
    return dataset
  },
  async individualUserRegister({ commit }, params) {
    let dataset = {},
      url = '/carsofuae-server/users/individual_register.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateRegisterInfo', dataset)
    return dataset
  },
  async companyUserRegister({ commit }, params) {
    let dataset = {},
      url = '/carsofuae-server/users/company_register.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateRegisterInfo', dataset)
    return dataset
  },
  async imageUpload({ commit }, params) {
    let dataset = {},
      url = '/carsofuae-server/file-upload/image-upload.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateImageUploadInfo', dataset)
    return dataset
  },
  async userDetails({ commit }, params) {
    let dataset = {},
      url = '/carsofuae-server/users/user_details.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateUserDetails', dataset)
    return dataset
  },
  async newClassifiedPost({ commit }, params) {
    let dataset = {},
      url = '/carsofuae-server/data/new_classified_post.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewPostInfo', dataset)
    return dataset
  },
  async newMotorCyclesPost({ commit }, params) {
    let dataset = {},
      url = '/carsofuae-server/data/new_motorcycles_post.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewMotorCyclesInfo', dataset)
    return dataset
  },
  async newNumberPlatesPost({ commit }, params) {
    let dataset = {},
      url = '/carsofuae-server/data/new_numberplates_post.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewNumberPlatesInfo', dataset)
    return dataset
  },
  async newTruckPost({ commit }, params) {
    let dataset = {},
      url = '/carsofuae-server/data/new_truck_post.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewTruckInfo', dataset)
    return dataset
  },
  async newBoatsPost({ commit }, params) {
    let dataset = {},
      url = '/carsofuae-server/data/new_boats_post.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewBoatInfo', dataset)
    return dataset
  },
  async newAccessoriesPost({ commit }, params) {
    debugger;
    let dataset = {},
      url = '/carsofuae-server/data/new_accessories_post.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewAccessoriesInfo', dataset)
    return dataset
  },
  async addNewRental({ commit }, params) {
    let dataset = {},
      url = '/carsofuae-server/data/new_rental.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewRentalInfo', dataset)
    return dataset
  },
  async addNewLease({ commit }, params) {
    let dataset = {},
      url = '/carsofuae-server/data/new_lease.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewLeaseInfo', dataset)
    return dataset
  },
  async addNewGarage({ commit }, params) {
    let dataset = {},
      url = '/carsofuae-server/data/new_garage.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewGarageInfo', dataset)
    return dataset
  },
  async addNewReview({ commit }, params) {
    let dataset = {},
      url = '/carsofuae-server/data/new_review.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewReviewInfo', dataset)
    return dataset
  },
  async getReviewList({ commit }, params) {
    let dataset = {},
      url = `/carsofuae-server/data/get_reviews.php?pageType=${params.pageType}&pageId=${params.pageId}`
    dataset = await axiosInstance.get(url)
    commit('updateReviewsList', dataset)
    return dataset
  },
  async addNewFAQ({ commit }, params) {
    let dataset = {},
      url = '/carsofuae-server/data/new_faq.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewFAQInfo', dataset)
    return dataset
  },
  async getFAQList({ commit }, params) {
    let dataset = {},
      url = `/carsofuae-server/data/get_faq.php?pageType=${params.pageType}&pageId=${params.pageId}`
    dataset = await axiosInstance.get(url)
    commit('updateFAQList', dataset)
    return dataset
  },
  async getPostList({ commit }, params) {
    let dataset = {},
      url = `/carsofuae-server/data/get_posts.php?category=${UTILS.formatTitle(
        params.category,
      )}`
    // url = "/mocks/posts.json";
    dataset = await axiosInstance.get(url)
    commit('updatePostList', dataset.post)
    return dataset
  },
  async getGarageList({ commit }) {
    let dataset = {},
      url = `/carsofuae-server/data/get_garages.php`
    //url = `/mocks/garages.json`;
    dataset = await axiosInstance.get(url)
    commit('updateGarageList', dataset)
    return dataset
  },
  async getCarList({ commit }, refresh = false) {
    if (state.carData?.length && !refresh) return
    let dataset = {},
      url = `/carsofuae-server/data/get_car_list.php`
    //url = "/mocks/car.json";
    dataset = await axiosInstance.get(url)
    commit('updateCarList', dataset?.cars)
    return dataset
  },
  //update by jesmi
  async getMotorCycleList({ commit }, refresh = false) {
    if (state.motorCycleData?.length && !refresh) return
    let dataset = {},
      url = `/carsofuae-server/data/get_motorcycle_list.php`
    //url = "/mocks/motorcycle.json";
    dataset = await axiosInstance.get(url)
    commit('updateMotorCycleList', dataset?.motorcycles)
    return dataset
  },
  async getRentalList({ commit }) {
    let dataset = {},
      url = `/carsofuae-server/data/get_rental.php`
    // url = `/mocks/rental.json`;
    dataset = await axiosInstance.get(url)
    commit('updateRentalList', dataset)
    return dataset
  },
  async getLeaseList({ commit }) {
    let dataset = {},
      url = `/carsofuae-server/data/get_lease.php`
    //url = "/mocks/lease.json";
    dataset = await axiosInstance.get(url)
    commit('updateLeaseList', dataset)
    return dataset
  },
  async getSpareList({ commit }) {
    let dataset = {},
      url = '/mocks/spare-parts.json'
    dataset = await axiosInstance.get(url)
    commit('updateSpareList', dataset)
    return dataset
  },
  // update by jesmi
  async getAccessoriesList({ commit }) {
    let dataset = {},
      url = '/mocks/accessories-parts.json'
    dataset = await axiosInstance.get(url)
    commit('updateAccessoriesList', dataset)
    return dataset
  },
  async getSpareItemList({ commit }) {
    let dataset = {},
      url = '/mocks/spare-post-items.json'
    dataset = await axiosInstance.get(url)
    commit('updateSpareItemList', dataset)
    return dataset
  },
  async newSpareCarPost({ commit }, params) {
    debugger
    let dataset = {},
      url = '/carsofuae-server/data/new_spare_car_post.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewSpareCarInfo', dataset)
    return dataset
  },
  async newSpareBikesPost({ commit }, params) {
    debugger
    let dataset = {},
      url = '/carsofuae-server/data/new_spare_bikes_post.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewSpareBikesInfo', dataset)
    return dataset
  },
  async newSpareApparelPost({ commit }, params) {
    debugger
    let dataset = {},
      url = '/carsofuae-server/data/new_spare_apparel_post.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewSpareApparelInfo', dataset)
    return dataset
  },
  async newSpareHobbyistPost({ commit }, params) {
    debugger
    let dataset = {},
      url = '/carsofuae-server/data/new_spare_hobbyist_post.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewSpareHobbyistInfo', dataset)
    return dataset
  },
  async newSpareHeavyPost({ commit }, params) {
    debugger
    let dataset = {},
      url = '/carsofuae-server/data/new_spare_heavy_post.php'
    dataset = await axiosInstance.post(url, params)
    commit('updateNewSpareHeavyInfo', dataset)
    return dataset
  },
  async getPostedByList({ commit }) {
    let dataset = {},
      url = '/mocks/posted-by.json'
    dataset = await axiosInstance.get(url)
    commit('updatePostedByList', dataset)
    return dataset
  },
}

const getters = {
  getSinglePostData(state) {
    return function (id) {
      return state.postList?.find((post) => {
        return Number(post.id) === Number(id)
      })
    }
  },
  getSingleGarageData(state) {
    return function (id) {
      return state.garageList?.garages?.find(
        (garage) => Number(garage.id) === Number(id),
      )
    }
  },
  getSingleRentalData(state) {
    return function (id) {
      return state.rentalData?.rental?.find((rental) => {
        return rental.id == Number(id)
      })
    }
  },
  getSingleLeaseData(state) {
    return function (id) {
      return state.leaseData?.lease?.find((lease) => {
        return lease.id == Number(id)
      })
    }
  },
  getSingleSpareData(state) {
    return function (id) {
      return state.spareItemList.find((post) => {
        return post.id === Number(id)
      })
    }
  },
  getAllMakes(state) {
    let data = null
    if (state.selectedClassifiedCategory === 'used-cars') {
      data = state.carData
    } else if (state.selectedClassifiedCategory === 'motorcycles') {
      data = state.motorCycleData
    }
    return [...new Set(data?.map((make) => make.make))].sort()
  },
  getAllModels(state) {
    return function (make) {
      let data = null
      if (state.selectedClassifiedCategory === 'used-cars') {
        data = state.carData
      } else if (state.selectedClassifiedCategory === 'motorcycles') {
        data = state.motorCycleData
      }
      return [
        ...new Set(
          data?.filter((item) => item.make === make)?.map((el) => el.model),
        ),
      ].sort()
    }
  },
  getTrimList(state) {
    return function (make, model) {
      let data = null
      if (state.selectedClassifiedCategory === 'used-cars') {
        data = state.carData
      } else if (state.selectedClassifiedCategory === 'motorcycles') {
        data = state.motorCycleData
      }
      return [
        ...new Set(
          data
            ?.filter((item) => item.make === make && item.model === model)
            ?.map((el) => el.trim)
            ?.filter(Boolean),
        ),
      ].sort()
    }
  },
  getSpareCategories(state) {
    debugger
    console.log(state.selectedSpareType)
    return [...new Set(rawSpareCategoryList(state)?.map((cat) => cat.category))]
      .sort()
      .filter(Boolean)
  },
  getSpareSubCategories(state) {
    debugger
    const sub = rawSpareCategoryList(state)
      ?.filter((item) => item.category === state.selectedSpareCategory)
      ?.map((el) => el.sub)
    return [...new Set(sub)].sort().filter(Boolean)
  },
  getSpareItemList(state) {
    debugger
    const item = rawSpareCategoryList(state)
      ?.filter((item) => item.category === state.selectedSpareCategory)
      ?.filter((elem) => elem.sub === state.selectedSpareSubCategory)
      ?.map((el) => el.item)
    return [...new Set(item)].sort().filter(Boolean)
  },
  getAccessoriesCategories(state) {
    debugger
    console.log(state.selectedAccessoriesType)
    return [...new Set(rawAccessoriesCategoryList(state)?.map((cat) => cat.category))]
      .sort()
      .filter(Boolean)
  },
  getAccessoriesSubCategories(state) {
    debugger
    const sub = rawAccessoriesCategoryList(state)
      ?.filter((item) => item.category === state.selectedAccessoryCategory)
      ?.map((el) => el.sub)
    return [...new Set(sub)].sort().filter(Boolean)
  },
  getAccessoriesItemList(state) {
    debugger
    const item = rawAccessoriesCategoryList(state)
      ?.filter((item) => item.category === state.selectedAccessoryCategory)
      ?.filter((elem) => elem.sub === state.selectedAccessorySubCategory)
      ?.map((el) => el.item)
    return [...new Set(item)].sort().filter(Boolean)
  },

  // getAccessoriesCategories(state) {
  //   debugger;
  //   console.log(state.selectedAccessoriesType)
  //   return [...new Set(rawAccessoriesCategoryList(state)?.map((cat) => cat.category))]
  //     .sort()
  //     .filter(Boolean);
  // },
}

const mutations = {
  updateLoginInfo(state, dataset) {
    if (dataset) {
      state.loginInfo = {
        isLoggedIn: dataset.status,
        username: dataset.username || '',
        message: dataset.message || '',
        jwtToken: dataset.jwt || '',
        id: dataset.id || null,
        userType: dataset.userType || '',
      }
      setLogin(JSON.stringify(state.loginInfo))
    } else {
      state.loginInfo = {
        isLoggedIn: false,
        username: '',
        message: '',
        jwtToken: '',
        id: null,
        userType: '',
      }
      clearLogin()
    }
  },
  updateImageUploadInfo(state, dataset) {
    state.imageUploadInfo = dataset
  },
  updateRegisterInfo(state, dataset) {
    state.registerInfo = dataset
  },
  updateUserDetails(state, dataset) {
    state.userDetails = dataset
  },
  updateNewPostInfo(state, dataset) {
    state.newPostInfo = dataset
  },
  updateNewSpareCarInfo(state, dataset) {
    state.newSpareCarInfo = dataset
  },
  updateNewSpareBikesInfo(state, dataset) {
    state.newSpareBikesInfo = dataset
  },
  updateNewSpareApparelInfo(state, dataset) {
    state.newSpareApparelInfo = dataset
  },
  updateNewSpareHobbyistInfo(state, dataset) {
    state.newSpareHobbyistInfo = dataset
  },
  updateNewSpareHeavyInfo(state, dataset) {
    state.newSpareHeavyInfo = dataset
  },
  updateNewMotorCyclesInfo(state, dataset) {
    state.newMotorCyclesInfo = dataset
  },
  updateNewNumberPlatesInfo(state, dataset) {
    state.newNumberPlatesInfo = dataset
  },
  updateNewTruckInfo(state, dataset) {
    state.newTruckInfo = dataset
  },
  updateNewBoatInfo(state, dataset) {
    state.newBoatInfo = dataset
  },
  updateNewAccessoriesInfo(state, dataset) {
    state.newAccessoriesInfo = dataset
  },
  updateNewRentalInfo(state, dataset) {
    state.newRentalInfo = dataset
  },
  updateNewLeaseInfo(state, dataset) {
    state.newLeaseInfo = dataset
  },
  updateNewGarageInfo(state, dataset) {
    state.newGarageInfo = dataset
  },
  updateNewReviewInfo(state, dataset) {
    state.newReviewInfo = dataset
  },
  updateNewFAQInfo(state, dataset) {
    state.newFAQInfo = dataset
  },
  updatePostList(state, dataset) {
    state.postList = dataset
  },
  updateGarageList(state, dataset) {
    state.garageList = dataset
  },
  updateReviewsList(state, dataset) {
    state.reviewList = dataset
  },
  updateFAQList(state, dataset) {
    state.faqList = dataset
  },
  updateCarList(state, dataset) {
    state.carData = dataset
  },
  updateMotorCycleList(state, dataset) {
    state.motorCycleData = dataset
  },
  updateSelectedCarMake(state, make) {
    state.selectedCarMake = make
  },
  updateSelectedCarModel(state, model) {
    state.selectedCarModel = model
  },
  updateGarageCategory(state, value) {
    state.garageCategory = value
  },
  updateGarageDetailsEnabled(state, value) {
    state.garageDetailsEnabled = value
  },
  updateSelectedGarage(state, value) {
    state.selectedGarage = value
  },
  updateSelectedClassifiedCategory(state, value) {
    state.selectedClassifiedCategory = UTILS.formatTitle(value)
  },
  updatePostView(state, value) {
    state.postView = value
  },
  updateSelectedRentalCategory(state, value) {
    state.selectedRentalCategory = value
  },
  updateRentalList(state, dataset) {
    state.rentalData = dataset
  },
  updateSelectedRental(state, value) {
    state.selectedRental = value
  },
  updateSelectedLeaseCategory(state, value) {
    state.selectedLeaseCategory = value
  },
  updateLeaseList(state, dataset) {
    state.leaseData = dataset
  },
  updateSelectedLease(state, value) {
    state.selectedLease = value
  },
  updateSpareList(state, dataset) {
    state.spareList = dataset
  },
  //update by jesmi
  updateAccessoriesList(state, dataset) {
    state.accessoriesList = dataset
  },
  updateSelectedSpareType(state, value) {
    state.selectedSpareType = value
  },
  updateSelectedSpareCategory(state, value) {
    state.selectedSpareCategory = value
  },
  updateSelectedSpareSubCategory(state, value) {
    state.selectedSpareSubCategory = value
  },
  updateSelectedSpareItem(state, value) {
    state.selectedSpareItem = value
  },
  //update
  updateSelectedAccessoriesType(state, value) {
    state.selectedAccessoriesType = value
  },
  updateSelectedAccessoriesCategory(state, value) {
    state.selectedAccessoryCategory = value
  },
  updateSelectedAccessoriesSubCategory(state, value) {
    state.selectedAccessorySubCategory = value
  },
  updateSelectedAccessoriesItem(state, value) {
    state.selectedAccessoryItem = value
  },
  updateSpareItemList(state, dataset) {
    state.spareItemList = dataset
  },
  updatePostedByList(state, dataset) {
    state.postedByList = dataset
  },
  updateSelectedUserType(state, value) {
    state.selectedUserType = value
  },
  updateSelectedMotorCycleSubcategory(state, value) {
    state.selectedMotorCycleSubcategory = value
  },
  updateSelectedSubcategory(state, value) {
    state.selectedSubcategory = value
  },
}

const rawSpareCategoryList = (state) => {
  return state.spareList?.map(
    (item) => item[state.selectedSpareType.toLowerCase()],
  )[0]
}
//update by jesmi
const rawAccessoriesCategoryList = (state) => {
  debugger;
  console.log(state.accessoriesList?.map(
    (item) => item[state.selectedAccessoriesType.toLowerCase()],
  ));
  return state.accessoriesList?.map(
    (item) => item[state.selectedAccessoriesType.toLowerCase()],
  )[0]
}

export default {
  state,
  actions,
  getters,
  mutations,
}
