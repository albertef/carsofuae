import { axiosInstance } from "@/utility/axios.js";

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
};

const actions = {
  async getPostList({ commit }) {
    let dataset = {},
      url = "/mocks/posts.json";
    dataset = await axiosInstance.get(url);
    commit("updatePostList", dataset);
    return dataset;
  },
  async getGarageList({ commit }) {
    let dataset = {},
      url = "/mocks/garages.json";
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
      url = "/mocks/rental.json";
    dataset = await axiosInstance.get(url);
    commit("updateRentalList", dataset);
    return dataset;
  },
  async getLeaseList({ commit }) {
    let dataset = {},
      url = "/mocks/lease.json";
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
      return state.garageList.find((garage) => {
        return garage.id === Number(id);
      });
    };
  },
  getSingleRentalData(state) {
    return function (id) {
      return state.rentalData.find((rental) => {
        return rental.id === Number(id);
      });
    };
  },
  getSingleLeaseData(state) {
    return function (id) {
      return state.leaseData.find((rental) => {
        return rental.id === Number(id);
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
  updatePostList(state, dataset) {
    state.postList = dataset;
  },
  updateGarageList(state, dataset) {
    state.garageList = dataset;
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
