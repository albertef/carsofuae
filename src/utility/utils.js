import dayjs from "dayjs";

export const UTILS = {
  formatDistance(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find((item) => {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  },
  formatTitle(value) {
    return value?.replace(/[\. ,:-]+/g, "-").toLowerCase();
  },
  formatDate(date) {
    return dayjs(date).format("DD-MMM-YYYY");
  },
  calculateStarValue(value) {
    let starValue = 0;
    for (const index of value) {
      starValue += index.star;
    }
    return starValue / value.length;
  },
};
