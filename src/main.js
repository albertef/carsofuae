import Vue from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.min.js";
import VueCarousel from 'vue-carousel';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/meta/icons.js";

Vue.use(VueCarousel);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
