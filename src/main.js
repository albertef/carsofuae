import Vue from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.min.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import VueCarousel from 'vue-carousel';

import {
  faFilm,
  faSearch,
  faLongArrowAltRight,
  faArrowLeft,
  faTimes,
  faSlidersH,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faFilm);
library.add(faSearch);
library.add(faLongArrowAltRight);
library.add(faArrowLeft);
library.add(faTimes);
library.add(faSlidersH);
library.add(faMedal);

Vue.use(VueCarousel);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
