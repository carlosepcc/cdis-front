import { Loading, Notify, QSpinnerGears } from "quasar";

import { api } from "boot/axios";

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
    });
};

export default listar;
