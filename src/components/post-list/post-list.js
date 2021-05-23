import postData from '@/mocks/posts.json';
import Button from "@/components/common/button/button.vue";

export default {
	name: "PostList",
	components: {
		Button,
	},
	computed: {
		featuredPostData() {
			return postData.filter(item => item.featured === true);
		},
		postData() {
			return postData;
		},
	},
	methods: {
		loadMore() {
			console.log('Load more posts!!');
		}
	}
};
