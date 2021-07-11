import { axiosInstance } from "@/utility/axios.js";

const state = {
  postList: [],
  garageList: [],
  garageCategory: "browse",
};

const actions = {
  async getPostList({ commit }) {
    let dataset = {},
      url = "/mocks/posts.json";
    // if (process.env.NODE_ENV === "development") {
    //   url = "/mocks/posts.json";
    // } else {
    //   url = "http://localhost/get_posts";
    // }
    dataset = await axiosInstance.get(url);
    if (dataset.status !== false) {
      commit("updatePostList", dataset.data);
    }
    return dataset;
  },
  async getGarageList({ commit }) {
    let dataset = {},
      url = "/mocks/garages.json";
    dataset = await axiosInstance.get(url);
    if (dataset.status !== false) {
      commit("updateGarageList", dataset.data);
    }
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
};

export default {
  state,
  actions,
  getters,
  mutations,
};
