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

// Pedir registro de nuevo objeto o la modificación de uno existente en la base de datos
const guardar = (object, refArr, url = "/usuario") => {
  Loading.show({
    message: `Guardando. ${url}`,
    spinner: QSpinnerGears,
  });

  api({
    method: (object.id = null ? "post" : "put"),
    url: url,
    data: object,
  })
    .then((response) => {
      // handle success
      Loading.hide();
      Notify.create("Guardado exitoso");
      listar(refArr, url);
    })
    .catch((error) => {
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

// Pedir la eliminación de objetos en la base de datos
const eliminar = (idsArr = [], list, url = "/usuario") => {
  Loading.show({
    message: `Eliminando ${idsArr}. ${url}`,
    spinner: QSpinnerGears,
  });

  api
    .delete(url, idsArr)
    .then((response) => {
      // handle success
      listar(list, url);
      Notify.create("Eliminación exitosa");
    })
    .catch((error) => {
      // handle error
      console.log(error);
      Notify.create({
        color: "negative",
        position: "top",
        message: `Eliminación fallida. ${error.message}. Revise su conexión a internet`,
        icon: "report_problem",
      });
    })
    .then(() => {
      // always
      Loading.hide();
    });
};

export default listar;
export { guardar, eliminar };
