import { shallowReactive } from "vue";

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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fileList: [],
      fileTypes: [
        "image/apng",
        "image/bmp",
        "image/gif",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/webp",
        "image/x-icon",
        "application/pdf",
      ],
      imageTypes: [
        "image/apng",
        "image/bmp",
        "image/gif",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/webp",
        "image/x-icon",
      ],
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
        const imgPreview = document.getElementById("image-multiple-" + this.id);
        imgPreview.innerHTML = "";
        for (var index = 0; index < fileCount; index++) {
          const files = this.fileList[index];
          if (!this.isValidFile(files)) {
            alert("Selected file format is not supported. Please try again.");
            return;
          }
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
        const imgPreview = document.getElementById("image-" + this.id);
        imgPreview.innerHTML = "";
        const formData = new FormData();
        if (!this.isValidFile(e.target.files[0])) {
          alert("Selected file format is not supported. Please try again.");
          return;
        }
        if (this.isImageFile(e.target.files[0])) {
          if (e.target.files[0].size <= 2097152) {
            this.fileList = [...this.fileList, e.target.files[0]];
            this.fileList = this.fileList.filter(
              (item) => item.size <= 2097152
            );

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
        } else {
          if (e.target.files[0].size <= 2097152) {
            formData.append("file", e.target.files[0]);
            this.$emit("value", formData);
          } else {
            alert("Selected file size exceeds 2MB. Please try again.");
            this.clear();
          }
        }
      }
    },

    isImageFile(file) {
      return this.imageTypes.includes(file.type);
    },

    isValidFile(file) {
      return this.fileTypes.includes(file.type);
    },

    clear() {
      this.$emit("value", "");
      this.$emit("reset");
      this.fileList = [];
    },
  },
};
