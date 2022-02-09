import { Screen } from "quasar";
import { ref } from "vue";

// Global State
const state = ref({
  dense: Screen.lt.sm,
  grid: Screen.lt.sm,
  loggedUser: {
    id: 1,
    username: "",
    name: "",
    lastname: "",
    roles: ["Usuario"],
  },
});

export default state;
