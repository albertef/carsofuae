import { axiosInstance } from "@/utility/axios.js";

const state = {
  postList: [],
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
};

const getters = {

};

const mutations = {
  updatePostList(state, dataset) {
    state.postList = dataset;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
