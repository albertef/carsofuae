import { META } from "@/meta/common.js";
export default {
	name: "Services",
	computed: {
		services() {
			return META.serviceList;
		}
	},
};
