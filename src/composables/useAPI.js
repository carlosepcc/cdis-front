import { Dialog, Loading, Notify, QSpinnerGears } from "quasar";

import { api } from "boot/axios";

// LISTAR (Actualizar Arreglos en el cliente con datos del servidor)
const listar = (list, url = "/usuario") => {
  let noti = Notify.create({
    type: "ongoing",
    position: "bottom",
    message: `Accediendo al listado ${url}`,
    spinner: QSpinnerGears,
    actions: [{ label: "Ocultar", color: "white" }],
  });

  api
    .get(url)
    .then((response) => {
      // handle success
      list.value = response.data;
      noti({
        type: "positive",
        spinner: null,
        message: `Carga exitosa.`,
        timeout: 1000,
        actions: [{ label: "OK", color: "white" }],
      });
    })
    .catch((error) => {
      // handle error
      console.log(error);
      noti({
        type: "negative",
        spinner: null,
        message: `Carga fallida. ${error.message}.`,
        icon: "report_problem",
        actions: [{ label: "OK", color: "white" }],
      });
    })
};

// Pedir registro de nuevo objeto o la modificación de uno existente en la base de datos
const guardar = (object, refArr, url = "/usuario") => {

  let noti = Notify.create({
    type: "ongoing",
    position: "bottom",
    message: `Guardando. ${url}`,
    spinner: QSpinnerGears,
    actions: [{ label: "Ocultar", color: "white" }],
  });
  api({
    method: object.id ? "put" : "post",
    url: url,
    data: object,
  })
    .then((response) => {
      // handle success
      noti({
        type: "positive",
        spinner: null,
        message: "Guardado exitoso.",
        timeout: 1000,
        actions: [{ label: "OK", color: "white" }],
      });
      listar(refArr, url);
    })
    .catch((error) => {
      // handle error
      console.log(error);
      noti({
        type: "negative",
        spinner: null,
        message: `Guardado fallido. ${error.message}.`,
        icon: "report_problem",
        actions: [{ label: "OK", color: "white" }],
      });
    })
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

      let noti = Notify.create({
        type: "ongoing",
        position: "bottom",
        message: `Eliminando ${objArr[0].id}. ${url}`,
        spinner: QSpinnerGears,
        actions: [{ label: "Ocultar", color: "white" }],
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
          noti({
            type: "positive",
            spinner: null,
            message: `Eliminación exitosa de (${idsArr.length}) entrada${idsArr.length==1 ? '.' : 's.'})`,
            timeout: 1000,
            actions: [{ label: "OK", color: "white" }],
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
          noti({
            type: "negative",
            spinner: null,
            message: `Eliminación fallida. ${error.message}`,
            icon: "report_problem",
            actions: [{ label: "OK", color: "white" }],
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
