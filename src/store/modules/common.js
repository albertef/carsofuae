function initialState() {
  return {
    spinner: false,
    alert: {
      show: false,
      type: "success",
      text: ""
    },
    confirmPopup: {
      show: false,
      pageType: "",
      orderStatus: { status: "", icon: [] },
      orderIDs: []
    },
    orderDetailPopup: {
      show: false
    },
    soundAlertToggle: false,
    soundAlertPopup: false,
    canAutoplay: false
  }
};

const mutations = {
  updateLoader(state, show) {
    state.spinner = show;
  },
  updateAlert(state, alertObj) {
    state.alert = alertObj;
  },
  updateConfirmPopup(state, dataset) {
    state.confirmPopup = {
      ...state.confirmPopup,
      ...dataset
    };
  },
  updateOrderDetailPopup(state, dataset) {
    state.orderDetailPopup = {
      ...state.orderDetailPopup,
      ...dataset
    };
  },
  updateSoundAlertToggle(state, show) {
    state.soundAlertToggle = show;
  },
  updateSoundAlertPopup(state, show) {
    state.soundAlertPopup = show;
  },
  updateCanAutoplay(state, show) {
    state.canAutoplay = show;
  },
  reset(state) {
    const _initialState = initialState();
    Object.keys(_initialState).forEach(key => {
      state[key] = _initialState[key]
    });
  }
};

export default {
  state: initialState(),
  mutations,
};
