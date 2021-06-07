import Button from "@/components/common/button/button.vue";
import { META } from "@/meta/common.js";

export default {
	name: "Header",
	components: {
		Button,
	},
	computed: {
		services() {
			return META.serviceList;
		}
	},
	methods: {
		clicked(e) {
			console.log("clicked");
		},
	},
};
