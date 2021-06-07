import Button from "@/components/common/button/button.vue";
import { Carousel, Slide } from 'vue-carousel';

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
			const lookup = [
				{ value: 1, symbol: "" },
				{ value: 1e3, symbol: "K" },
				{ value: 1e6, symbol: "M" },
				{ value: 1e9, symbol: "G" },
				{ value: 1e12, symbol: "T" },
				{ value: 1e15, symbol: "P" },
				{ value: 1e18, symbol: "E" }
			];
			const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
			var item = lookup.slice().reverse().find((item) => {
				return num >= item.value;
			});
			return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
		}
	}
};
