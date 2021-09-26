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
  SelectedRental: null,
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
  getAllCarMakes(state) {
    return [...new Set(state.carData.map((make) => make.make))].sort();
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
    state.SelectedRental = value;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
