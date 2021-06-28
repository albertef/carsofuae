import CoolLightBox from 'vue-cool-lightbox';
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css';

export default {
  name: "post-details",
  components: {
    CoolLightBox,
  },
  data() {
    return {
      index: null,
    }
  },
  async mounted() {
		await this.$store.dispatch("getPostList");
	},
  computed: {
    getPostId() {
      return this.$route.params;
    },
    postData() {
			return this.$store?.getters.getSinglePostData(this.getPostId.id);
		}
  }
};
