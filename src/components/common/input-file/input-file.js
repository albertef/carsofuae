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
        this.fileList = this.fileList.filter((item) => item.size <= 2097152);
        const fileCount = this.fileList.length;
        const imgPreview = document.getElementById("image-multiple");
        imgPreview.innerHTML = "";
        for (var index = 0; index < fileCount; index++) {
          const files = this.fileList[index];
          if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener("load", function () {
              imgPreview.innerHTML +=
                '<img src="' +
                this.result +
                '" class="img" title="' +
                files.name +
                '" />';
            });
          }
          if (this.fileList[index].size <= 2097152) {
            formData.append("files[]", this.fileList[index]);
            this.$emit("value", formData);
          }
        }
      } else {
        const imgPreview = document.getElementById("image");
        imgPreview.innerHTML = "";
        if (e.target.files[0].size <= 2097152) {
          this.fileList = [...this.fileList, e.target.files[0]];
          this.fileList = this.fileList.filter((item) => item.size <= 2097152);
          const formData = new FormData();
          const files = this.fileList[0];
          if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener("load", function () {
              imgPreview.innerHTML +=
                '<img src="' +
                this.result +
                '" class="img" title="' +
                files.name +
                '" />';
            });
          }
          formData.append("file", e.target.files[0]);
          this.$emit("value", formData);
        } else {
          this.clear();
        }
      }
    },
    clear() {
      this.$emit("value", "");
      this.$emit("reset");
      this.fileList = [];
    },
  },
};
