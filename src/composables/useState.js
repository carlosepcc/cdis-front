import { Screen } from "quasar";
import { ref } from "vue";

// Global State
const state = ref({
  dense: Screen.lt.sm,
  grid: Screen.lt.sm,
  loggedUser: null, //JSON.parse(localStorage.getItem("loggedUser")),
  loggedUserTest: {
    id: 1,
    username: "amturing",
    name: "Alan",
    lastname: "Mathinson Turing",
    roles: [
      "Administrador",
      "Asesor_de_calidad",
      "Coordinador_de_calidad",
      "Encargado_de_proyecto",
      "Revisor",
    ],
  },
});
export const usersArr = ref([
  {
    username: "alanmt",
    pass: "823k4c324c2n3473223",
    roles: ["Revisor"],
    nombre: "Alan",
    apellidos: "Mathinson Turing",
    id: 321,
  },
  {
    username: "jrrtolkien",
    pass: "823k4c324c2n3473223",
    roles: ["Encargado de proyecto"],
    nombre: "John Raphael",
    apellidos: "Reuel Tolkien",
    id: 322,
  },
]);
export const getUsersByRole = (role = "Revisor") =>
  usersArr.value.filter((user) => user.roles.includes(role));

export const usersToSelect = (users = getUsersByRole) => {
  let usersSelect = [];
  users.forEach((user) =>
    usersSelect.value.push({
      label: `${user.nombre} ${user.apellidos}`,
      value: user,
    })
  );

  return usersSelect;
};
export default state;
