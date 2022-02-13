import { Dialog, Loading, Notify, QSpinnerGears } from "quasar";

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
const eliminar = (objArr = [], list, url = "/usuario") => {
  console.log("Eliminar");
  Dialog.create({
    title: "Confirme eliminación",
    message: "La eliminación será permanente.",
    cancel: true,
    persistent: true,
    color: "negative",
    ok: { label: "Eliminar", noCaps: true, flat: true },
    cancel: { color: "primary", noCaps: true, flat: true },
  })
    .onOk(() => {
      console.log(">>>> OK");

      Loading.show({
        message: `Eliminando ${objArr[0].id}. ${url}`,
        spinner: QSpinnerGears,
      });

      //CREATE A ids array from the objects array
      let idsArr = [];
      objArr.forEach((obj) => idsArr.push(obj.id));
      console.log(idsArr);
      //REQUEST TO SERVER
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
          return idsArr;
        });
    })
    .onCancel(() => {
      console.log(">>>> Cancel");
      return "Canceled by user";
    });
};

export default listar;
export { guardar, eliminar };
