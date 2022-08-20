export default {
  name: "InputText",
  props: {
    value: {
      type: String | Object,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    updateValue(e) {
      this.fileList = [];
      if (this.multiple) {
        const formData = new FormData();
        this.fileList = [...this.fileList, ...e.target.files];
        const fileCount = this.fileList.length;
        for (var index = 0; index < fileCount; index++) {
          formData.append("files[]", this.fileList[index]);
        }
        this.$emit("value", formData);
      } else {
        this.fileList = [...this.fileList, e.target.files[0]];
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        this.$emit("value", formData);
      }
    },
    clear() {
      this.$emit("value", "");
      this.$emit("reset");
    },
  },
};
