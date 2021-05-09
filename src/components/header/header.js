import Button from "@/components/common/button/button.vue";
export default {
	name: "Header",
	components: {
		Button,
	},
	methods: {
		clicked(e) {
			console.log("clicked");
		},
	},
};
