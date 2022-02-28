import { computed, ref } from "vue";

import { Screen } from "quasar";

// Global State
const state = ref({
  dense: Screen.lt.sm,
  grid: Screen.lt.sm,
  loggedUser: null, //JSON.parse(localStorage.getItem("loggedUser")),
});
export const usersArr = ref([]);
export const getUsersByRole = (role = "Revisor") => {
  return usersArr.value.filter((user) => user.roles.includes(role));
};

export const usersToSelect = (users = getUsersByRole()) => {
  let usersSelect = [];
  users.forEach((element) => {});
  (user) =>
    usersSelect.push({
      label: `${user.nombre} ${user.apellidos}`,
      value: user,
    });

  return usersSelect;
};

export const revisoresSelect = computed(usersToSelect());
export const encargadosSelect = computed(
  usersToSelect(getUsersByRole("Encargado_de_proyecto"))
);

export default state;
