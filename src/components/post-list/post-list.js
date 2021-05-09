import postData from '@/mocks/posts.json';

export default {
	name: "PostList",
	computed: {
		featuredPostData() {
			return postData.filter(item => item.featured === true);
		},
		postData() {
			return postData;
		}
	}
};
