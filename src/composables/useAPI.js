import { Dialog, Notify, QSpinnerGears } from "quasar";
import isJwtTokenExpired, { decode } from "jwt-check-expiry";
import state, { usersArr } from "./useState";

import { api } from "boot/axios";

//Si se le pasa un token, lo guarda. Luego devuelve si hay un token guardado y no ha expirado.
const autorizado = (token) => {
  // Almacenar en localStorage
  if (token) localStorage.setItem("token", token);
  localStorageToken = localStorage.getItem("token");
  return localStorageToken ? isJwtTokenExpired(localStorageToken) : false;
};

const login = (loginObject) => {
  let noti = Notify.create({
    type: "ongoing",
    message: `Iniciando sesión para ${loginObject.usuario}`,
    spinner: QSpinnerGears,
    actions: [{ label: "Ocultar", color: "white" }],
  });

  api({
    url: "/login",
    method: "POST",
    data: loginObject,
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      let token = response.data;

      // Establecer token como autorización por defecto para peticiones con axios
      api.defaults.headers.common["Authorization"] = token;

      /* Estructura de la respuesta decodificada
      {
  "sub": "carlose",
  "exp": 1646010970,
  "user": {
    "id": Number,
    "username": "carlose",
    "nombre": "Carlos"
    "apellidos": "Enrique",
    "roles": ["Revisor"],
  },
  "iat": 1645974970
}
      */

      state.value.loggedUser = decode(token).payload.user;
      console.log(
        "🚀 ~ file: useAPI.js ~ line 52 ~ .then ~ state.value.loggedUser",
        state.value.loggedUser
      );

      // Almacenar en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("loggedUser", state.value.loggedUser);

      // Notificación
      noti({
        type: "positive",
        spinner: null,
        message: `Sesión iniciada`,
        actions: [{ label: "OK", color: "white" }],
      });

      listar();
    })
    .catch((error) => {
      console.log(error, "Error en el login");
      noti({
        type: "negative",
        spinner: null,
        message: `Falló el inicio de sesión. ${error.message}.`,
        icon: "report_problem",
        actions: [{ label: "OK", color: "white" }],
      });
    });
};

// LISTAR (Actualizar Arreglos en el cliente con datos del servidor)
const listar = (list = usersArr, url = "/usuario") => {
  let noti = Notify.create({
    type: "ongoing",
    message: `Accediendo al listado ${url}`,
    spinner: QSpinnerGears,
    actions: [{ label: "Ocultar", color: "white" }],
  });

  api
    .get(url)
    .then((response) => {
      noti({ timeout: 100 });
      // handle success
      list.value = response.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
      noti({
        type: "negative",
        spinner: null,
        message: `Carga fallida de ${url}. ${error.message}.`,
        icon: "report_problem",
        actions: [{ label: "OK", color: "white" }],
      });
    });
};

// Pedir registro de nuevo objeto o la modificación de uno existente en la base de datos
const guardar = (object, refArr, url = "/usuario") => {
  console.log(`Guardando ${object},${refArr.value}`);
  let noti = Notify.create({
    type: "ongoing",
    message: `Guardando. ${url}`,
    spinner: QSpinnerGears,
    actions: [{ label: "Ocultar", color: "white" }],
  });

  console.log("🚀 ~ file: useAPI.js ~ line 126 ~ guardar ~ object", object);
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
        message: "Acción realizada con éxito.",
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
        message: `Guardado fallido de ${url}. ${error.message}.`,
        icon: "report_problem",
        actions: [{ label: "OK", color: "white" }],
      });
    });
};

// Pedir la eliminación de objetos en la base de datos
const eliminar = (objArr = [], list, url = "/usuario") => {
  console.log("Eliminar");
  Dialog.create({
    title: "Confirme la eliminación",
    message: "La eliminación será permanente.",
    cancel: true,
    persistent: true,
    color: "negative",
    ok: { label: "Eliminar", noCaps: true, flat: true },
    cancel: { color: "primary", noCaps: true, flat: true },
  })
    .onOk(() => {
      let noti = Notify.create({
        type: "ongoing",
        position: "bottom",
        message: `Eliminando ${objArr.length} entrada${
          objArr.length == 1 ? "." : "s."
        } ${url}`,
        spinner: QSpinnerGears,
        actions: [{ label: "Ocultar", color: "white" }],
      });

      //CREATE an idsArray from the objects array
      let idsArr = [];
      objArr.forEach((obj) => idsArr.push(obj.id));
      console.log("🚀 ~ file: useAPI.js ~ line 178 ~ .onOk ~ idsArr", idsArr);
      //REQUEST TO SERVER
      api({
        method: "delete",
        url: url,
        data: idsArr,
      })
        .then((response) => {
          // handle success
          listar(list, url);
          noti({
            type: "positive",
            spinner: null,
            // message: `Eliminación exitosa de (${idsArr.length}) entrada${idsArr.length == 1 ? "." : "s."  })`,
            message: "Acción realizada con éxito.",
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
            message: `Eliminación fallida de ${url}. ${error.message}`,
            icon: "report_problem",
            actions: [{ label: "OK", color: "white" }],
          });
        })
        .then(() => {
          // always
          return idsArr;
        });
    })
    .onCancel(() => {
      return "Canceled by user";
    });
};

export default listar;
export { guardar, eliminar, login, autorizado };
