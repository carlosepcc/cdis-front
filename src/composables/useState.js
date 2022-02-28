import { Screen } from "quasar";
import { ref } from "vue";

// Global State
const state = ref({
  dense: Screen.lt.sm,
  grid: Screen.lt.sm,
  loggedUser: null,
});

// Usuarios registrados
export const usersArr = ref([]);

export const usersByRole = ref({
  Revisor: [],
  Encargado_de_proyecto: [],
});
export default state;
