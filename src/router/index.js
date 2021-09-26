import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home/home.vue";
import PostDetails from "@/views/post-details/post-details.vue";
import Garages from "@/views/garages/garages.vue";
import Classifieds from "@/views/classifieds/classifieds.vue";
import Rental from "@/views/rental/rental.vue";
import ComingSoon from "@/views/coming-soon/coming-soon.vue";
import RentalDetails from "@/views/rental-details/rental-details.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: { title: "Home" },
    },
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/post-details/",
      name: "PostDetails",
      component: PostDetails,
      params: true,
      meta: { title: "Post Details" },
    },
    {
      path: "/classifieds",
      name: "Classifieds",
      component: Classifieds,
      meta: { title: "Classifieds" },
    },
    {
      path: "/rental",
      name: "Rental",
      component: Rental,
      meta: { title: "Rental" },
    },
    {
      path: "/rental-details/",
      name: "RentalDetails",
      component: RentalDetails,
      params: true,
      meta: { title: "Rental Details" },
    },
    {
      path: "/lease-a-car",
      name: "LeaseACar",
      component: ComingSoon,
      meta: { title: "Lease A Car" },
    },
    {
      path: "/garages",
      name: "Garages",
      params: true,
      component: Garages,
      meta: { title: "Garages" },
    },
    {
      path: "/spare-parts",
      name: "SpareParts",
      component: ComingSoon,
      meta: { title: "Spare Parts" },
    },
    {
      path: "/search",
      name: "Search",
      component: ComingSoon,
      meta: { title: "Search" },
    },
    {
      path: "/profile",
      name: "Profile",
      component: ComingSoon,
      meta: { title: "Profile" },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    const mainEl = document.getElementById("main");
    mainEl.scrollTo(0, 0);
    return { el: mainEl, x: 0, y: 0 };
  },
});

const DEFAULT_TITLE = "Cars of UAE";
router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = `${to.meta.title} | ${DEFAULT_TITLE}` || DEFAULT_TITLE;
  });
});

export default router;
