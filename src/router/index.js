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
    },
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/post-details/:id",
      name: "PostDetails",
      component: PostDetails,
      params: true
    },
    {
      path: "/classifieds",
      name: "Classifieds",
      component: ComingSoon,
    },
    {
      path: "/rental",
      name: "Rental",
      component: ComingSoon,
    },
    {
      path: "/lease-a-car",
      name: "LeaseACar",
      component: ComingSoon,
    },
    {
      path: "/garages",
      name: "Garages",
      component: ComingSoon,
    },
    {
      path: "/spare-parts",
      name: "SpareParts",
      component: ComingSoon,
    },
  ]
});

export default router;
