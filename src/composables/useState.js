import { Screen } from "quasar";
import { ref } from "vue";

// Global State
const state = ref({
  dense: Screen.lt.sm,
  grid: Screen.lt.sm,
  loggedUser: {
    id: 1,
    username: "amturing",
    name: "Alan",
    lastname: "Mathinson Turing",
    roles: ["Usuario","Coordinador de Calidad"],
  },
});

export default state;
