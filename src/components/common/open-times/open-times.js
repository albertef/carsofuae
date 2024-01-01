import Select from "@/components/common/select/select.vue";
export default {
  components: {
    Select,
  },
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: "",
    },
    selectedValue: {
      type: Array | String,
    },
  },
  data() {
    return {
      times: [
        "12.00 AM",
        "01.00 AM",
        "02.00 AM",
        "03.00 AM",
        "04.00 AM",
        "05.00 AM",
        "06.00 AM",
        "07.00 AM",
        "08.00 AM",
        "09.00 AM",
        "10.00 AM",
        "11.00 AM",
        "12.00 PM",
        "01.00 PM",
        "02.00 PM",
        "03.00 PM",
        "04.00 PM",
        "05.00 PM",
        "06.00 PM",
        "07.00 PM",
        "08.00 PM",
        "09.00 PM",
        "10.00 PM",
        "11.00 PM",
        "Closed",
      ],
      selected: [],
    };
  },

  async mounted() {},

  watch: {
    selectedValue: {
      handler(newVal) {
        this.selected =
          newVal &&
          newVal.length &&
          newVal.map((item) => {
            const timeArr =
              item.time === "Closed"
                ? ["Closed", "Closed"]
                : item.time?.split(" - ");
            item.start = timeArr?.length ? timeArr[0] : item.start;
            item.end = timeArr?.length ? timeArr[1] : item.end;
            item.time = item.time;
            //delete item.time;
            return item;
          });
      },
      immediate: true,
    },
  },

  methods: {
    updateTimes(day, time, selected) {
      const selectedTimes = {
        day: day,
        start: (time === "start" && selected) || null,
        end: (time === "end" && selected) || null,
      };
      const isExist = this.selected?.filter((item) => item.day === day);
      if (isExist.length) {
        isExist[0] =
          time === "start"
            ? { ...isExist[0], start: selected }
            : { ...isExist[0], end: selected };
        this.selected = [
          ...this.selected?.filter((item) => item.day !== day),
          isExist[0],
        ];
      } else {
        this.selected = [...this.selected, selectedTimes];
      }
      const formatted = this.selected?.map((el) => {
        return {
          day: el.day,
          time:
            el.start?.toLowerCase() === "closed" ||
            el.end?.toLowerCase() === "closed"
              ? "Closed"
              : `${el.start} - ${el.end}`,
        };
      });
      this.$emit("value", formatted);
    },

    selectedTime(day, time) {
      const dayObject =
        this.selected &&
        this.selected.length &&
        this.selected?.find((item) => item.day === day.toLowerCase());

      if (dayObject) {
        return dayObject[time];
      }
    },
  },
};
