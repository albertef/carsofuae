module.exports = {
  lintOnSave: false,
  filenameHashing: false,
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        prependData: `
					  @import "./src/common/common.scss";
			`,
      },
    },
  },
};
