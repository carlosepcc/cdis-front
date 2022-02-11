import { Loading, Notify, QSpinnerGears } from "quasar";

import { api } from "boot/axios";

// LISTAR (Actualizar Arreglos en el cliente con datos del servidor)
const listar = (list, url = "/usuario") => {
  Loading.show({
    message: `Accediendo al listado ${url}`,
    spinner: QSpinnerGears,
  });

  api
    .get(url)
    .then((response) => {
      // handle success
      list.value = response.data;
      Loading.hide();
      Notify.create("Carga exitosa");
    })
    .catch((error) => {
      // handle error
      console.log(error);
      Loading.hide();
      Notify.create({
        color: "negative",
        position: "top",
        message: `Carga fallida. ${error.message}. Revise su conexión a internet`,
        icon: "report_problem",
      });
    })
    .then(() => {
      // always
      Loading.hide();
    });
};

// Pedir registro de nuevo objeto en la base de datos
const guardar = (object, list, url = "/usuario") => {
  Loading.show({
    message: `Guardando. ${url}`,
    spinner: QSpinnerGears,
  });

  api
    .post(url, object)
    .then(response => {
      // handle success
      list.value.push(response.data);
      Loading.hide();
      Notify.create("Guardado exitoso");
    })
    .catch(error => {
      // handle error
      console.log(error);
      Loading.hide();
      Notify.create({
        color: "negative",
        position: "top",
        message: `Guardado fallido. ${error.message}. Revise su conexión a internet`,
        icon: "report_problem",
      });
    })
    .then(() => {
      // always
      Loading.hide();
    });
};

export default listar;
export { guardar };
