import { axiosInstance } from "@/utility/axios.js";
import { setLogin, clearLogin } from "@/utility/helper";

const state = {
  postList: [],
  garageList: [],
  garageCategory: "browse",
  garageDetailsEnabled: false,
  selectedGarage: null,
  carData: [],
  selectedCarMake: "",
  selectedCarModel: "",
  selectedClassifiedCategory: "",
  selectedRentalCategory: "",
  postView: false,
  rentalData: [],
  selectedRental: null,
  selectedLeaseCategory: "",
  leaseData: [],
  selectedLease: null,
  spareList: [],
  selectedSpareType: "",
  selectedSpareCategory: "",
  selectedSpareSubCategory: "",
  selectedSpareItem: "",
  spareItemList: [],
  postedByList: [],
  loginInfo: {
    isLoggedIn: false,
    username: "",
    message: "",
    jwtToken: "",
    id: null,
    userType: "",
  },
  registerInfo: {},
  imageUploadInfo: {},
  userDetails: {},
  selectedUserType: "",
  newPostInfo: {},
  newGarageInfo: {},
  newReviewInfo: {},
  newFAQInfo: {},
  reviewList: [],
  faqList: [],
  newRentalInfo: {},
  newLeaseInfo: {},
};

const actions = {
  async userLogin({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/users/login.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateLoginInfo", dataset);
    return dataset;
  },
  async individualUserRegister({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/users/individual_register.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateRegisterInfo", dataset);
    return dataset;
  },
  async companyUserRegister({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/users/company_register.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateRegisterInfo", dataset);
    return dataset;
  },
  async imageUpload({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/file-upload/image-upload.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateImageUploadInfo", dataset);
    return dataset;
  },
  async userDetails({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/users/user_details.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateUserDetails", dataset);
    return dataset;
  },
  async newClassifiedPost({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_classified_post.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewPostInfo", dataset);
    return dataset;
  },
  async addNewRental({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_rental.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewRentalInfo", dataset);
    return dataset;
  },
  async addNewLease({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_lease.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewLeaseInfo", dataset);
    return dataset;
  },
  async addNewGarage({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_garage.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewGarageInfo", dataset);
    return dataset;
  },
  async addNewReview({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_review.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewReviewInfo", dataset);
    return dataset;
  },
  async getReviewList({ commit }, params) {
    let dataset = {},
      url = `/carsofuae-server/data/get_reviews.php?pageType=${params.pageType}&pageId=${params.pageId}`;
    dataset = await axiosInstance.get(url);
    commit("updateReviewsList", dataset);
    return dataset;
  },
  async addNewFAQ({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_faq.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewFAQInfo", dataset);
    return dataset;
  },
  async getFAQList({ commit }, params) {
    let dataset = {},
      url = `/carsofuae-server/data/get_faq.php?pageType=${params.pageType}&pageId=${params.pageId}`;
    dataset = await axiosInstance.get(url);
    commit("updateFAQList", dataset);
    return dataset;
  },
  async getPostList({ commit }) {
    let dataset = {},
      url = "/mocks/posts.json";
    dataset = await axiosInstance.get(url);
    commit("updatePostList", dataset);
    return dataset;
  },
  async getGarageList({ commit }) {
    let dataset = {},
      url = `/carsofuae-server/data/get_garages.php`;
    //url = `/mocks/garages.json`;
    dataset = await axiosInstance.get(url);
    commit("updateGarageList", dataset);
    return dataset;
  },
  async getCarList({ commit }) {
    let dataset = {},
      url = "/mocks/car.json";
    dataset = await axiosInstance.get(url);
    commit("updateCarList", dataset);
    return dataset;
  },
  async getRentalList({ commit }) {
    let dataset = {},
      url = `/carsofuae-server/data/get_rental.php`;
    // url = `/mocks/rental.json`;
    dataset = await axiosInstance.get(url);
    commit("updateRentalList", dataset);
    return dataset;
  },
  async getLeaseList({ commit }) {
    let dataset = {},
    url = `/carsofuae-server/data/get_lease.php`;
      //url = "/mocks/lease.json";
    dataset = await axiosInstance.get(url);
    commit("updateLeaseList", dataset);
    return dataset;
  },
  async getSpareList({ commit }) {
    let dataset = {},
      url = "/mocks/spare-parts.json";
    dataset = await axiosInstance.get(url);
    commit("updateSpareList", dataset);
    return dataset;
  },
  async getSpareItemList({ commit }) {
    let dataset = {},
      url = "/mocks/spare-post-items.json";
    dataset = await axiosInstance.get(url);
    commit("updateSpareItemList", dataset);
    return dataset;
  },
  async getPostedByList({ commit }) {
    let dataset = {},
      url = "/mocks/posted-by.json";
    dataset = await axiosInstance.get(url);
    commit("updatePostedByList", dataset);
    return dataset;
  },
};

const getters = {
  getSinglePostData(state) {
    return function (id) {
      return state.postList.find((post) => {
        return post.id === Number(id);
      });
    };
  },
  getSingleGarageData(state) {
    return function (id) {
      return state.garageList?.garages?.find(
        (garage) => Number(garage.id) === Number(id)
      );
    };
  },
  getSingleRentalData(state) {
    return function (id) {
      return state.rentalData?.rental?.find((rental) => {
        return rental.id == Number(id);
      });
    };
  },
  getSingleLeaseData(state) {
    return function (id) {
      return state.leaseData?.lease?.find((lease) => {
        return lease.id == Number(id);
      });
    };
  },
  getSingleSpareData(state) {
    return function (id) {
      return state.spareItemList.find((post) => {
        return post.id === Number(id);
      });
    };
  },
  getAllCarMakes(state) {
    return [...new Set(state.carData?.map((make) => make.make))].sort();
  },
  getAllCarModels(state) {
    return function (make) {
      return [
        ...new Set(
          state.carData
            ?.filter((item) => item.make === make)
            ?.map((el) => el.model)
        ),
      ].sort();
    };
  },
  getTrimList(state) {
    return function (make, model) {
      return [
        ...new Set(
          state.carData
            ?.filter((item) => item.make === make && item.model === model)
            ?.map((el) => el.trim)
            ?.filter(Boolean)
        ),
      ].sort();
    };
  },
  getSpareCategories(state) {
    return [...new Set(rawSpareCategoryList(state)?.map((cat) => cat.category))]
      .sort()
      .filter(Boolean);
  },
  getSpareSubCategories(state) {
    const sub = rawSpareCategoryList(state)
      ?.filter((item) => item.category === state.selectedSpareCategory)
      ?.map((el) => el.sub);
    return [...new Set(sub)].sort().filter(Boolean);
  },
  getSpareItemList(state) {
    const item = rawSpareCategoryList(state)
      ?.filter((item) => item.category === state.selectedSpareCategory)
      ?.filter((elem) => elem.sub === state.selectedSpareSubCategory)
      ?.map((el) => el.item);
    return [...new Set(item)].sort().filter(Boolean);
  },
};

const mutations = {
  updateLoginInfo(state, dataset) {
    if (dataset) {
      state.loginInfo = {
        isLoggedIn: dataset.status,
        username: dataset.username || "",
        message: dataset.message || "",
        jwtToken: dataset.jwt || "",
        id: dataset.id || null,
        userType: dataset.userType || "",
      };
      setLogin(JSON.stringify(state.loginInfo));
    } else {
      state.loginInfo = {
        isLoggedIn: false,
        username: "",
        message: "",
        jwtToken: "",
        id: null,
        userType: "",
      };
      clearLogin();
    }
  },
  updateImageUploadInfo(state, dataset) {
    state.imageUploadInfo = dataset;
  },
  updateRegisterInfo(state, dataset) {
    state.registerInfo = dataset;
  },
  updateUserDetails(state, dataset) {
    state.userDetails = dataset;
  },
  updateNewPostInfo(state, dataset) {
    state.newPostInfo = dataset;
  },
  updateNewRentalInfo(state, dataset) {
    state.newRentalInfo = dataset;
  },
  updateNewLeaseInfo(state, dataset) {
    state.newLeaseInfo = dataset;
  },
  updateNewGarageInfo(state, dataset) {
    state.newGarageInfo = dataset;
  },
  updateNewReviewInfo(state, dataset) {
    state.newReviewInfo = dataset;
  },
  updateNewFAQInfo(state, dataset) {
    state.newFAQInfo = dataset;
  },
  updatePostList(state, dataset) {
    state.postList = dataset;
  },
  updateGarageList(state, dataset) {
    state.garageList = dataset;
  },
  updateReviewsList(state, dataset) {
    state.reviewList = dataset;
  },
  updateFAQList(state, dataset) {
    state.faqList = dataset;
  },
  updateCarList(state, dataset) {
    state.carData = dataset;
  },
  updateSelectedCarMake(state, make) {
    state.selectedCarMake = make;
  },
  updateSelectedCarModel(state, model) {
    state.selectedCarModel = model;
  },
  updateGarageCategory(state, value) {
    state.garageCategory = value;
  },
  updateGarageDetailsEnabled(state, value) {
    state.garageDetailsEnabled = value;
  },
  updateSelectedGarage(state, value) {
    state.selectedGarage = value;
  },
  updateSelectedClassifiedCategory(state, value) {
    state.selectedClassifiedCategory = value;
  },
  updatePostView(state, value) {
    state.postView = value;
  },
  updateSelectedRentalCategory(state, value) {
    state.selectedRentalCategory = value;
  },
  updateRentalList(state, dataset) {
    state.rentalData = dataset;
  },
  updateSelectedRental(state, value) {
    state.selectedRental = value;
  },
  updateSelectedLeaseCategory(state, value) {
    state.selectedLeaseCategory = value;
  },
  updateLeaseList(state, dataset) {
    state.leaseData = dataset;
  },
  updateSelectedLease(state, value) {
    state.selectedLease = value;
  },
  updateSpareList(state, dataset) {
    state.spareList = dataset;
  },
  updateSelectedSpareType(state, value) {
    state.selectedSpareType = value;
  },
  updateSelectedSpareCategory(state, value) {
    state.selectedSpareCategory = value;
  },
  updateSelectedSpareSubCategory(state, value) {
    state.selectedSpareSubCategory = value;
  },
  updateSelectedSpareItem(state, value) {
    state.selectedSpareItem = value;
  },
  updateSpareItemList(state, dataset) {
    state.spareItemList = dataset;
  },
  updatePostedByList(state, dataset) {
    state.postedByList = dataset;
  },
  updateSelectedUserType(state, value) {
    state.selectedUserType = value;
  },
};

const rawSpareCategoryList = (state) => {
  return state.spareList?.map((item) => item[state.selectedSpareType])[0];
};

export default {
  state,
  actions,
  getters,
  mutations,
};
