import { Screen } from "quasar";
import { ref } from "vue";

// Global State
const state = ref({
  dense: Screen.lt.sm,
  grid: Screen.lt.sm,
  loggedUser: null,//JSON.parse(localStorage.getItem("loggedUser")),
  loggedUserTest: {
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
  {username: "alanmt",pass:'823k4c324c2n3473223', roles:['Revisor'],nombre:'Alan',apellidos:'Mathinson Turing',id:321},
  {username: "jrrtolkien",pass:'823k4c324c2n3473223', roles:['Encargado de proyecto'],nombre:'John Raphael',apellidos:'Reuel Tolkien',id:322 }
])

export default state;
