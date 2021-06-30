import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home/home.vue";
import PostDetails from "@/views/post-details/post-details.vue";
import ComingSoon from "@/views/coming-soon/coming-soon.vue";

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
      component: ComingSoon,
      meta: { title: "Classifieds" },
    },
    {
      path: "/rental",
      name: "Rental",
      component: ComingSoon,
      meta: { title: "Rental" },
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
      component: ComingSoon,
      meta: { title: "Garages" },
    },
    {
      path: "/spare-parts",
      name: "SpareParts",
      component: ComingSoon,
      meta: { title: "Spare Parts" },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

const DEFAULT_TITLE = "Cars of UAE";
router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = `${to.meta.title} | ${DEFAULT_TITLE}` || DEFAULT_TITLE;
  });
});

export default router;
