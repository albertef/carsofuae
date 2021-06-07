import Vue from "vue";
import Vuex from "vuex";

import common from "./modules/common";
import home from "./modules/home";

Vue.use(Vuex);

const Store = new Vuex.Store({
  modules: {
    common,
    home,
  },
});

export default Store;
