import { axiosInstance } from "@/utility/axios.js";
import {
  setLogin,
  clearLogin,
  setSuperLogin,
  clearSuperLogin,
} from "@/utility/helper";
import { UTILS } from "@/utility/utils.js";
import { META } from "@/meta/common.js";

const state = {
  postList: [],
  garageList: [],
  garageDeals: [],
  garageCategory: "browse",
  garageDetailsEnabled: false,
  selectedGarage: null,
  carData: [],
  motorCycleData: [],
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
  accessoriesList: [],
  selectedSpareType: "",
  selectedSpareCategory: "",
  selectedSpareSubCategory: "",
  selectedSpareItem: "",
  selectedAccessoriesType: "",
  selectedAccessoryCategory: "",
  selectedAccessorySubCategory: "",
  selectedAccessoryItem: "",
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
  superLoginInfo: {},
  registerInfo: {},
  imageUploadInfo: {},
  userDetails: {},
  selectedUserType: "",
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
  newDealInfo: {},
  reviewList: [],
  faqList: [],
  newRentalInfo: {},
  newLeaseInfo: {},
  selectedMotorCycleSubcategory: "",
  selectedSubcategory: "",
  selectedTruckSubcategory: "",
  forgotPasswordInfo: {},
  resetPasswordInfo: {},
  verifyEmailInfo: {},
  nonApprovedPostList: {},
  postApproval: {},
  postDecline: {},
  myAds: {},
  deleteMyAd: {},
  isFilterApplied: false,
  searchData: {},
};

const actions = {
  async userLogin({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/users/login.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateLoginInfo", dataset);
    return dataset;
  },
  async superUserLogin({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/users/super_login.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateSuperLoginInfo", dataset);
    return dataset;
  },
  async forgotPassword({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/users/forgot_password.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateForgotPasswordInfo", dataset);
    return dataset;
  },
  async resetPassword({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/users/reset_password.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateResetPasswordInfo", dataset);
    return dataset;
  },
  async verifyEmail({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/users/verify_email.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateVerifyEmailInfo", dataset);
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
  async individualUserUpdate({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/users/individual_update.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateRegisterInfo", dataset);
    return dataset;
  },
  async companyUserUpdate({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/users/company_update.php";
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
  async getMyAds({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/get_my_ads.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateMyAds", dataset.posts);
    return dataset;
  },
  async deleteMyAd({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/delete_my_ad.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateDeleteMyAd", dataset);
    return dataset;
  },
  async newClassifiedPost({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_classified_post.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewPostInfo", dataset);
    return dataset;
  },
  async newMotorCyclesPost({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_motorcycles_post.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewMotorCyclesInfo", dataset);
    return dataset;
  },
  async newNumberPlatesPost({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_numberplates_post.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewNumberPlatesInfo", dataset);
    return dataset;
  },
  async newTruckPost({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_truck_post.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewTruckInfo", dataset);
    return dataset;
  },
  async newBoatsPost({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_boats_post.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewBoatInfo", dataset);
    return dataset;
  },
  async newAccessoriesPost({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_accessories_post.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewAccessoriesInfo", dataset);
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
  async addNewDeal({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_garage_deal.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewDealInfo", dataset);
    return dataset;
  },
  async getFAQList({ commit }, params) {
    let dataset = {},
      url = `/carsofuae-server/data/get_faq.php?pageType=${params.pageType}&pageId=${params.pageId}`;
    dataset = await axiosInstance.get(url);
    commit("updateFAQList", dataset);
    return dataset;
  },
  async getPostList({ commit }, params) {
    let dataset = {},
      url = `/carsofuae-server/data/get_posts.php?category=${UTILS.formatTitle(
        params.category
      )}`;
    dataset = await axiosInstance.get(url);
    commit("updatePostList", dataset.post);
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
  async getDealsList({ commit }) {
    let dataset = {},
      url = `/carsofuae-server/data/get_garage_deals.php`;
    dataset = await axiosInstance.get(url);
    commit("updateGarageDeals", dataset);
    return dataset;
  },
  async getCarList({ commit }, refresh = false) {
    if (state.carData?.length && !refresh) return;
    let dataset = {},
      url = `/carsofuae-server/data/get_car_list.php`;
    //url = "/mocks/car.json";
    dataset = await axiosInstance.get(url);
    commit("updateCarList", dataset?.cars);
    return dataset;
  },
  //update by jesmi
  async getMotorCycleList({ commit }, refresh = false) {
    if (state.motorCycleData?.length && !refresh) return;
    let dataset = {},
      url = `/carsofuae-server/data/get_motorcycle_list.php`;
    //url = "/mocks/motorcycle.json";
    dataset = await axiosInstance.get(url);
    commit("updateMotorCycleList", dataset?.motorcycles);
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
  // update by jesmi
  async getAccessoriesList({ commit }) {
    let dataset = {},
      url = "/mocks/accessories-parts.json";
    dataset = await axiosInstance.get(url);
    commit("updateAccessoriesList", dataset);
    return dataset;
  },
  async getSpareItemList({ commit }, params) {
    let dataset = {},
      url = `/carsofuae-server/data/get_spare_posts.php?type=${UTILS.formatTitle(
        params.type
      )}`;
    dataset = await axiosInstance.get(url);
    commit("updateSpareItemList", dataset.post);
    return dataset;
  },
  async newSpareCarPost({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_spare_car_post.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewSpareCarInfo", dataset);
    return dataset;
  },
  async newSpareBikesPost({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_spare_bikes_post.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewSpareBikesInfo", dataset);
    return dataset;
  },
  async newSpareApparelPost({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_spare_apparel_post.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewSpareApparelInfo", dataset);
    return dataset;
  },
  async newSpareHobbyistPost({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_spare_hobbyist_post.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewSpareHobbyistInfo", dataset);
    return dataset;
  },
  async newSpareHeavyPost({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/new_spare_heavy_post.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNewSpareHeavyInfo", dataset);
    return dataset;
  },
  async getPostedByList({ commit }) {
    let dataset = {},
      url = "/mocks/posted-by.json";
    dataset = await axiosInstance.get(url);
    commit("updatePostedByList", dataset);
    return dataset;
  },
  async getNonApprovedPosts({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/get_non_approved_posts.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateNonApprovedPostList", dataset.posts);
    return dataset;
  },
  async approvePost({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/approve_post.php";
    dataset = await axiosInstance.post(url, params);
    commit("updatePostApproval", dataset);
    return dataset;
  },
  async declinePost({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/decline_post.php";
    dataset = await axiosInstance.post(url, params);
    commit("updatePostDecline", dataset);
    return dataset;
  },
  async search({ commit }, params) {
    let dataset = {},
      url = "/carsofuae-server/data/get_search_data.php";
    dataset = await axiosInstance.post(url, params);
    commit("updateSearchData", dataset?.data);
    return dataset;
  },
};

const getters = {
  getSinglePostData(state) {
    return function (id) {
      return state.postList?.find((post) => {
        return Number(post.id) === Number(id);
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
        return Number(post.id) === Number(id);
      });
    };
  },
  getAllMakes(state) {
    let data = null;
    if (
      state.selectedClassifiedCategory === "used-cars" ||
      state.selectedSpareType === "cars"
    ) {
      data = state.carData;
    } else if (
      state.selectedClassifiedCategory === "motorcycles" ||
      state.selectedSpareType === "bikes"
    ) {
      data = state.motorCycleData;
    } else {
      data = state.carData;
    }
    return [...new Set(data?.map((make) => make.make))].sort();
  },
  getAllModels(state) {
    return function (make) {
      let data = null;
      if (
        state.selectedClassifiedCategory === "used-cars" ||
        state.selectedSpareType === "cars"
      ) {
        data = state.carData;
      } else if (
        state.selectedClassifiedCategory === "motorcycles" ||
        state.selectedSpareType === "bikes"
      ) {
        data = state.motorCycleData;
      } else {
        data = state.carData;
      }
      return [
        ...new Set(
          data?.filter((item) => item.make === make)?.map((el) => el.model)
        ),
      ].sort();
    };
  },
  getTrimList(state) {
    return function (make, model) {
      let data = null;
      if (
        state.selectedClassifiedCategory === "used-cars" ||
        state.selectedSpareType === "cars"
      ) {
        data = state.carData;
      } else if (
        state.selectedClassifiedCategory === "motorcycles" ||
        state.selectedSpareType === "bikes"
      ) {
        data = state.motorCycleData;
      } else {
        data = state.carData;
      }
      return [
        ...new Set(
          data
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
  getAccessoriesCategories(state) {
    return [
      ...new Set(rawAccessoriesCategoryList(state)?.map((cat) => cat.category)),
    ]
      .sort()
      .filter(Boolean);
  },
  getAccessoriesSubCategories(state) {
    const sub = rawAccessoriesCategoryList(state)
      ?.filter((item) => item.category === state.selectedAccessoryCategory)
      ?.map((el) => el.sub);
    return [...new Set(sub)].sort().filter(Boolean);
  },
  getAccessoriesItemList(state) {
    const item = rawAccessoriesCategoryList(state)
      ?.filter((item) => item.category === state.selectedAccessoryCategory)
      ?.filter((elem) => elem.sub === state.selectedAccessorySubCategory)
      ?.map((el) => el.item);
    return [...new Set(item)].sort().filter(Boolean);
  },
  getSearchData(state) {
    return function (category) {
      const data =
        state.searchData && Object.keys(state.searchData).length
          ? state.searchData?.map((item, index) => {
              const type =
                category == "classifieds"
                  ? META.classifiedsCategories[index].id
                  : category == "spare-parts"
                  ? META.spareCategoryFormat[index].id
                  : category == "rental"
                  ? "rental"
                  : category == "lease-a-car"
                  ? "lease"
                  : category == "garages"
                  ? "garages"
                  : "";
              return JSON.parse(`{ "${type}": ${JSON.stringify(item)} }`);
            })
          : [];
      return data;
    };
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
  updateSuperLoginInfo(state, dataset) {
    if (dataset) {
      state.superLoginInfo = dataset;
      setSuperLogin(JSON.stringify(state.superLoginInfo));
    } else {
      state.superLoginInfo = null;
      clearSuperLogin();
    }
  },
  updateForgotPasswordInfo(state, dataset) {
    state.forgotPasswordInfo = dataset;
  },
  updateResetPasswordInfo(state, dataset) {
    state.resetPasswordInfo = dataset;
  },
  updateVerifyEmailInfo(state, dataset) {
    state.verifyEmailInfo = dataset;
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
  updateNewSpareCarInfo(state, dataset) {
    state.newSpareCarInfo = dataset;
  },
  updateNewSpareBikesInfo(state, dataset) {
    state.newSpareBikesInfo = dataset;
  },
  updateNewSpareApparelInfo(state, dataset) {
    state.newSpareApparelInfo = dataset;
  },
  updateNewSpareHobbyistInfo(state, dataset) {
    state.newSpareHobbyistInfo = dataset;
  },
  updateNewSpareHeavyInfo(state, dataset) {
    state.newSpareHeavyInfo = dataset;
  },
  updateNewMotorCyclesInfo(state, dataset) {
    state.newMotorCyclesInfo = dataset;
  },
  updateNewNumberPlatesInfo(state, dataset) {
    state.newNumberPlatesInfo = dataset;
  },
  updateNewTruckInfo(state, dataset) {
    state.newTruckInfo = dataset;
  },
  updateNewBoatInfo(state, dataset) {
    state.newBoatInfo = dataset;
  },
  updateNewAccessoriesInfo(state, dataset) {
    state.newAccessoriesInfo = dataset;
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
  updateNewDealInfo(state, dataset) {
    state.newDealInfo = dataset;
  },
  updatePostList(state, dataset) {
    state.postList = dataset;
  },
  updateGarageList(state, dataset) {
    state.garageList = dataset;
  },
  updateGarageDeals(state, dataset) {
    state.garageDeals = dataset;
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
  updateMotorCycleList(state, dataset) {
    state.motorCycleData = dataset;
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
    state.selectedClassifiedCategory = UTILS.formatTitle(value);
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
  //update by jesmi
  updateAccessoriesList(state, dataset) {
    state.accessoriesList = dataset;
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
  //update
  updateSelectedAccessoriesType(state, value) {
    state.selectedAccessoriesType = value;
  },
  updateSelectedAccessoriesCategory(state, value) {
    state.selectedAccessoryCategory = value;
  },
  updateSelectedAccessoriesSubCategory(state, value) {
    state.selectedAccessorySubCategory = value;
  },
  updateSelectedAccessoriesItem(state, value) {
    state.selectedAccessoryItem = value;
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
  updateSelectedMotorCycleSubcategory(state, value) {
    state.selectedMotorCycleSubcategory = value;
  },
  updateSelectedSubcategory(state, value) {
    state.selectedSubcategory = value;
  },
  updateNonApprovedPostList(state, dataset) {
    state.nonApprovedPostList = dataset;
  },
  updatePostApproval(state, dataset) {
    state.postApproval = dataset;
  },
  updatePostDecline(state, dataset) {
    state.postDecline = dataset;
  },
  updateMyAds(state, dataset) {
    state.myAds = dataset;
  },
  updateDeleteMyAd(state, dataset) {
    state.deleteMyAd = dataset;
  },
  updateIsFilterApplied(state, value) {
    state.isFilterApplied = value;
  },
  updateSearchData(state, dataset) {
    state.searchData = dataset;
  },
};

const rawSpareCategoryList = (state) => {
  return state.spareList?.map(
    (item) => item[state.selectedSpareType.toLowerCase()]
  )[0];
};
//update by jesmi
const rawAccessoriesCategoryList = (state) => {
  return state.accessoriesList?.map(
    (item) => item[state.selectedAccessoriesType.toLowerCase()]
  )[0];
};

export default {
  state,
  actions,
  getters,
  mutations,
};
