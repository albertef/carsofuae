import { axiosInstance } from "@/utility/axios.js";

const state = {
  postList: [],
  garageList: [],
  garageCategory: "browse",
  garageDetailsEnabled: false,
  selectedGarage: null,
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
};

const mutations = {
  updatePostList(state, dataset) {
    state.postList = dataset;
  },
  updateGarageList(state, dataset) {
    state.garageList = dataset;
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
};

export default {
  state,
  actions,
  getters,
  mutations,
};
