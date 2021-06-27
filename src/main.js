import Vue from "vue";
import Router from "@/router";
import App from "./App.vue";
import Store from "@/store";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.min.js";
import VueCarousel from 'vue-carousel';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/meta/icons.js";

Vue.use(VueCarousel);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  store: Store,
  render: h => h(App),
  router: Router,
}).$mount("#carsofuae-app");
