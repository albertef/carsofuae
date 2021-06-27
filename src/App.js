import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";

export default {
  name: "app",
  components: {
    Header,
    Footer,
  },
  mounted() {
    document.body.classList.add('hide-overflow');
  }
}
