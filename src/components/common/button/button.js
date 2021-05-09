export default {
	name: "Button",
	props: {
		type: {
			type: String,
			default: "primary",
		},
		text: {
			type: String,
			default: "",
		},
		width: {
			type: String,
			default: "auto",
		},
		rounded: {
			trype: Boolean,
			default: false,
		}
	},
	computed: {
		buttonStyle: function () {
			return {
				width: this.width,
				borderRadius: this.rounded && '30px',
			};
		},
	},
	methods: {
		clicked(e) {
			this.$emit("click", e);
		},
	},
};
