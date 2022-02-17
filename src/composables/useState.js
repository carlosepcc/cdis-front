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
    roles: [
      "Usuario",
      "Administrador",
      "Asesor de calidad",
      "Coordinador de calidad",
      "Encargado de proyecto",
      "Revisor",
    ],
  },
});
export const usersArr = ref([
  {username: "revisorcito",roles:['Revisor']},
  {username: "encargadito",roles:['Encargado de proyecto']}
])

export default state;
