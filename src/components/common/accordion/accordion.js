export default {
  data() {
    return {
      Accordion: {
        count: 0,
        active: null,
      },
    };
  },
  provide() {
    return { Accordion: this.Accordion };
  },
  computed: {
    accordionClasses: function () {
      return {
        "is-closed": !this.isOpen,
        "is-primary": this.isOpen,
        "is-dark": !this.isOpen,
      };
    },
  },
  methods: {
    toggleAccordion: function () {
      this.isOpen = !this.isOpen;
    },
  },
};
