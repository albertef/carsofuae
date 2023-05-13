import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home/home.vue";
import Login from "@/views/login/login.vue";
import SuperLogin from "@/views/super-login/super-login.vue";
import Register from "@/views/register/register.vue";
import PostDetails from "@/views/post-details/post-details.vue";
import Garages from "@/views/garages/garages.vue";
import Classifieds from "@/views/classifieds/classifieds.vue";
import Rental from "@/views/rental/rental.vue";
import ComingSoon from "@/views/coming-soon/coming-soon.vue";
import RentalDetails from "@/views/rental-details/rental-details.vue";
import LeaseACar from "@/views/lease-a-car/lease-a-car.vue";
import LeaseACarDetails from "@/views/lease-a-car-details/lease-a-car-details.vue";
import SpareParts from "@/views/spare-parts/spare-parts.vue";
import SparePartsDetails from "@/views/spare-parts-details/spare-parts-details.vue";
import StoreProfile from "@/views/store-profile/store-profile.vue";
import UserProfile from "@/views/user-profile/user-profile.vue";
import NewPost from "@/views/new-post/new-post.vue";
import AddNewSparePartsPost from "@/views/new-spare-parts-post/new-spare-parts-post.vue";
import AddNewGarage from "@/views/new-garage/new-garage.vue";
import AddNewRental from "@/views/new-rental/new-rental.vue";
import AddNewLease from "@/views/new-lease/new-lease.vue";
import ForgotPassword from "@/views/forgot-password/forgot-password.vue";
import ResetPassword from "@/views/reset-password/reset-password.vue";
import VerifyEmail from "@/views/verify-email/verify-email.vue";
import SuperDashboard from "@/views/super-dashboard/super-dashboard.vue";
import MyAds from "@/views/my-ads/my-ads.vue";
import UserProfileEdit from "@/views/user-profile-edit/user-profile-edit.vue";

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
      path: "/login",
      name: "Login",
      component: Login,
      meta: { title: "Login" },
    },
    {
      path: "/couae-super-admin",
      name: "SuperLogin",
      component: SuperLogin,
      meta: { title: "Super Login" },
    },
    {
      path: "/super-dashboard",
      name: "SuperDashboard",
      component: SuperDashboard,
      meta: { title: "Super Dashboard" },
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: { title: "Register" },
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword,
      meta: { title: "Forgot Password" },
    },
    {
      path: "/reset-password",
      name: "ResetPassword",
      component: ResetPassword,
      meta: { title: "Reset Password" },
    },
    {
      path: "/verify-email",
      name: "VerifyEmail",
      component: VerifyEmail,
      meta: { title: "Verify Email" },
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
      path: "/add-new-post",
      name: "AddNewPost",
      component: NewPost,
      meta: { title: "AddNewPost" },
    },
    {
      path: "/new-spare-parts-post",
      name: "AddNewSparePartsPost",
      component: AddNewSparePartsPost,
      meta: { title: "AddNewPost" },
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
      path: "/store-profile",
      name: "StoreProfile",
      component: StoreProfile,
      meta: { title: "Store Profile" },
    },
    {
      path: "/lease-a-car",
      name: "LeaseACar",
      component: LeaseACar,
      meta: { title: "Lease A Car" },
    },
    {
      path: "/lease-a-car-details",
      name: "LeaseACarDetails",
      component: LeaseACarDetails,
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
      path: "/add-new-garage",
      name: "AddNewGarage",
      component: AddNewGarage,
      meta: { title: "AddNewGarage" },
    },
    {
      path: "/add-new-rental",
      name: "AddNewRental",
      component: AddNewRental,
      meta: { title: "AddNewRental" },
    },
    {
      path: "/add-new-lease",
      name: "AddNewLease",
      component: AddNewLease,
      meta: { title: "AddNewLease" },
    },

    {
      path: "/spare-parts",
      name: "SpareParts",
      component: SpareParts,
      meta: { title: "Spare Parts" },
    },
    {
      path: "/spare-parts-details/",
      name: "SparePartsDetails",
      component: SparePartsDetails,
      params: true,
      meta: { title: "Spare Parts Details" },
    },
    {
      path: "/search",
      name: "Search",
      component: ComingSoon,
      meta: { title: "Search" },
    },
    {
      path: "/profile",
      name: "UserProfile",
      component: UserProfile,
      meta: { title: "UserProfile" },
    },
    {
      path: "/user-profile-edit",
      name: "UserProfileEdit",
      component: UserProfileEdit,
      meta: { title: "User Profile Edit" },
    },
    {
      path: "/my-ads",
      name: "MyAds",
      component: MyAds,
      meta: { title: "My Ads" },
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
