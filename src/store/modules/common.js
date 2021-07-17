const state = {
  loader: false,
};

const mutations = {
  updateLoader(state, show) {
    state.loader = show;
  },
};

export default {
  state,
  mutations,
};
