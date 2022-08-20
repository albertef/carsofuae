import Vue from "vue";
import Router from "@/router";
import App from "./App.vue";
import Store from "@/store";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.min.js";
import VueCarousel from "vue-carousel";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import dayjs from "dayjs";
import "@/meta/icons.js";
import Loader from "@/components/common/loader/loader.vue";
import Alert from "@/components/common/alert/alert.vue";
import VCalendar from "v-calendar";

Vue.use(VueCarousel);
Vue.use(dayjs);
Vue.use(VCalendar);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("Loader", Loader);
Vue.component("Alert", Alert);

Vue.config.productionTip = false;

new Vue({
  store: Store,
  render: (h) => h(App),
  router: Router,
}).$mount("#carsofuae-app");
