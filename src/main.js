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
import { CONSTANTS } from "@/utility/constants.js";
import VueSocialSharing from "vue-social-sharing";

Vue.use(VueCarousel);
Vue.use(dayjs);
Vue.use(VCalendar);
Vue.use(VueSocialSharing);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("Loader", Loader);
Vue.component("Alert", Alert);

Vue.config.productionTip = false;
Vue.prototype.$baseURL = CONSTANTS.APP_BASE_URL;

new Vue({
  store: Store,
  render: (h) => h(App),
  router: Router,
}).$mount("#carsofuae-app");
