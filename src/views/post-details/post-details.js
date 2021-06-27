export default {
  name: "post-details",
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
