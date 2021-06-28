import Button from "@/components/common/button/button.vue";
import { Carousel, Slide } from 'vue-carousel';
import { UTILS } from "@/utility/utils.js";
import router from "@/router";

const LOAD_COUNT = 9;

export default {
	name: "PostList",
	components: {
		Button,
		Carousel,
		Slide,
	},
	data() {
		return {
			postCount: LOAD_COUNT,
		}
	},
	mounted() {
		this.$store.dispatch("getPostList");
	},
	computed: {
		featuredPostData() {
			return this.fullPostData.filter(item => item.featured === true);
		},
		isPostlength() {
			return this.fullPostData.length > this.postCount;
		},
		postData() {
			return this.fullPostData?.slice(0, this.postCount);
		},
		fullPostData() {
			return this.$store.state.home.postList;
		}
	},
	methods: {
		loadMore() {
			this.postCount = this.fullPostData.length > this.postCount ? this.postCount + LOAD_COUNT : this.fullPostData.length;
		},
		formatDistance(num, digits) {
			return UTILS.formatDistance(num, digits);
		},
		viewPostDetails(id) {
			router.push({
				name: "PostDetails",
				params: {id: id},
			});
		}
	}
};
