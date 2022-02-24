import { Dialog, Notify, QSpinnerGears } from "quasar";
import isJwtTokenExpired, { decode } from "jwt-check-expiry";

import { api } from "boot/axios";
import state from "./useState";

//Si se le pasa un token, lo guarda. Luego devuelve si hay un token guardado y no ha expirado.
const autorizado = (token) => {
  // Almacenar en localStorage
  if (token) localStorage.setItem("token", token);
  localStorageToken = localStorage.getItem("token")
  return localStorageToken ? isJwtTokenExpired(localStorageToken) : false;
};

const login = (loginObject) => {
  let noti = Notify.create({
    type: "ongoing",
    message: `Iniciando sesión para ${loginObject.username}`,
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

      let payload = decode(token).payload;

      /* Estructura de la respuesta decodificada

      header: {alg: 'HS256'} !Algoritmo de codificación
      payload:
        sub: "admin"         !Username
        roles:[{ authority: "Administrador"}]
        iat: 1645133373      !Fecha de creación
        exp: 1645169373      !Fecha de expiración

      */
        let rolesArr = []
        payload.roles.forEach(item => {rolesArr.push(item.authority)})
        console.log("🚀 ~ file: useAPI.js ~ line 48 ~ .then ~ rolesArr",'color: dodgerblue', rolesArr)

      state.value.loggedUser = {
        username: payload.sub, // In th data subject is the username
        roles: rolesArr,
      };
      console.log("🚀 ~ file: useAPI.js ~ line 52 ~ .then ~ state.value.loggedUser", state.value.loggedUser)

      // Almacenar en localStorage
      localStorage.setItem("token", token);

      // Notificación
      noti({
        type: "positive",
        spinner: null,
        message: `Sesión iniciada`,
        actions: [{ label: "OK", color: "white" }],
      });
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
const listar = (list, url = "/usuario") => {
  let noti = Notify.create({
    type: "ongoing",
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
            message: `Eliminación exitosa de (${idsArr.length}) entrada${
              idsArr.length == 1 ? "." : "s."
            })`,
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
