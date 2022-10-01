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

  methods: {
    updateTimes(day, time, selected) {
      const selectedTimes = {
        day: day,
        start: (time === "start" && selected) || null,
        end: (time === "end" && selected) || null,
      };
      const isExist = this.selected.filter((item) => item.day === day);
      if (isExist.length) {
        isExist[0] =
          time === "start"
            ? { ...isExist[0], start: selected }
            : { ...isExist[0], end: selected };
        this.selected = [
          ...this.selected.filter((item) => item.day !== day),
          isExist[0],
        ];
      } else {
        this.selected = [...this.selected, selectedTimes];
      }
      const formatted = this.selected.map((el) => {
        return {
          day: el.day,
          time:
            el.start?.toLowerCase() === "closed" ||
            el.end?.toLowerCase() === "closed"
              ? "Closed"
              : `${el.start} - ${el.end}`,
        };
      });
      console.log(formatted)
      this.$emit("value", formatted);
    },
  },
};
