const state = {
  loader: false,
  alert: {
    show: false,
    type: "",
    message: "",
  },
};

const mutations = {
  updateLoader(state, show) {
    state.loader = show;
  },
  updateAlert(state, alert) {
    state.alert.show = alert.show;
    state.alert.type = alert.type;
    state.alert.message = alert.message;
    setTimeout(() => {
      state.alert.show = false;
      state.alert.type = "";
      state.alert.message = "";
    }, 3000);
  },
};

export default {
  state,
  mutations,
};
