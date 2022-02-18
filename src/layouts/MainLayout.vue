<script setup>
// Components
import DrawerItem from 'components/DrawerItem';

import { ref, provide } from 'vue';
import { useQuasar } from 'quasar'
import state from 'src/composables/useState'
const $q = useQuasar();
console.log(state)

// VARIABLES
const globalGrid = ref($q.screen.lt.sm)
provide('globalGrid', globalGrid);

const globalDense = ref($q.screen.lt.sm)
provide('globalDense', globalDense);

const showUsermenu = ref(true);
// DRAWER
const miniState = ref(false);
const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value


const logout = () => {
  $q.dialog({
    title: 'Confirme cerrar sesión',
    message: 'Deberá iniciar sesión la próxima vez que desee utilizar la aplicación.',
    cancel: true,
    persistent: true,
    color: 'negative',
    ok: { label: 'Cerrar sesión', noCaps: true, flat: true },
    cancel: { color: 'primary', noCaps: true, flat: true }
  }).onOk(() => {
    console.log('>>>> Cerrar sesión')
    return 'User wants to logout'
  }).onCancel(() => {
    console.log('>>>> Cancel')
    return 'Canceled by user'
  })
}

const drawerItems = [
  { title: "Inicio", icon: "home", alt: "n", to: "/", forRoles: ['Administrador', 'Asesor de calidad', 'Coordinador de calidad', 'Encargado de proyecto','Revisor'] },

  //REVISOR
  { title: 'Dictámenes Técnicos', icon: 'D', to: 'dictamenes', forRoles: ['Revisor'], separate: true },
  { title: 'Hallazgos', icon: 'H', to: 'hallazgos', forRoles: ['Revisor'] },
  { title: 'Minutas de reunión', icon: 'M', to: 'minutas', forRoles: ['Revisor'] },
  { title: 'Reportes de notificación', icon: 'N', to: 'rnotificacion', forRoles: ['Revisor'] },

  { title: 'Artefactos', icon: 'A', to: 'artefactos', forRoles: ['Encargado de proyecto'] },
  { title: 'Reportes Técnicos', icon: 'T', to: 'rtecnicos', forRoles: ['Asesor de calidad', 'Coordinador de calidad'] },
  { title: 'Usuarios', icon: 'U', to: 'users', forRoles: ['Administrador'] },

  // ALL USERS
  { title: 'Ajustes', icon: 'settings', to: 'settings', separate: true, forRoles:['Administrador', 'Asesor de calidad', 'Coordinador de calidad', 'Encargado de proyecto','Revisor'] },
  { title: 'Ayuda', icon: 'help', to: 'help', forRoles: ['Administrador', 'Asesor de calidad', 'Coordinador de calidad', 'Encargado de proyecto','Revisor'] },
  { title: 'Acerca de', icon: 'info', to: 'about', forRoles: ['Administrador', 'Asesor de calidad', 'Coordinador de calidad', 'Encargado de proyecto','Revisor'] },
];
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar class="brand-bar">
        <div id="brand-frame" class="text-primary">
          <q-btn
            v-if="state.loggedUser" dense flat round icon="menu" @click="toggleLeftDrawer" />

          <q-toolbar-title>
            <div class="row">
              <div class="column gt-xs">
                <q-avatar size="48px">
                  <img src="xedro/xedro-imagotipo-delujo.png" />
                </q-avatar>
              </div>
              <div class="column">
                <div class="brand text-xedro">XEDRO</div>
                <div class="row-inline items-center">
                  <span class="text-indigo-10 text-bold siglas">GESAT</span>
                  <span class="stands gt-sm generico stands">
                    Gestión de Actividades
                    <br />Técnicas
                  </span>
                </div>
              </div>
            </div>
          </q-toolbar-title>
        </div>

        <!-- USER -->
        <q-item
          v-if="state.loggedUser"
          clickable
          v-ripple
          class="text-white q-py-none absolute-right"
          :title="state.loggedUser.username + '. ' + state.loggedUser.name + '. ' + state.loggedUser.roles"
        >
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Ajustes</div>
                <q-toggle v-model="state.dense" label="Interfaz densa" />
                <q-toggle v-model="state.grid" label="Vista por tarjetas" />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-btn
                  color="primary"
                  label="Cerrar sesión"
                  class="full-width"
                  no-caps
                  flat
                  v-close-popup
                  @click="logout"
                />
              </div>
            </div>
          </q-menu>
          <q-item-section side>
            <q-item-label class="text-purple-1 text-weight-light">
              <span class>
                {{ state.loggedUser.name ? state.loggedUser.name : state.loggedUser.username}}
                <span class="gt-xs">{{ state.loggedUser.lastname }}</span>
              </span>
            </q-item-label>
            <q-item-label class="text-purple-2 text-bold" caption>
              {{
                state.loggedUser.roles[0]
              }}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-avatar size="xl" color="white" text-color="primary" class="text-weight-bolder">
              <img
                v-if="state.loggedUser.img"
                :src="state.loggedUser.img"
                :alt="state.loggedUser.username.charAt(0)"
              />
              <span v-else>{{state.loggedUser.username.charAt(0)}}</span>
              <!-- <ruby v-else>
                {{ state.loggedUser.lastname.replace(/[a-z]/g, '') }}
                <rt>{{ state.loggedUser.name.replace(/[a-z]/g, '') }}</rt>
              </ruby> -->
              <q-badge
                :title="state.loggedUser.roles[0]"
                floating
                rounded
                color="primary"
                class="text-weight-bold text-purple-2"
              >{{ state.loggedUser.roles[0].replace(/[a-z]/g, '') }}</q-badge>
            </q-avatar>
          </q-item-section>
        </q-item>
      </q-toolbar>
    </q-header>

    <!--MENU LATERAL (DRAWER "gaveta") -->
    <q-drawer

            v-if="state.loggedUser"
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :breakpoint="500"
      bordered
      side="left"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="drawerItem in drawerItems" :key="drawerItem.title">
            <DrawerItem
              v-show="state.loggedUser != null ? state.loggedUser.roles.some(currentRol => drawerItem.forRoles.includes(currentRol)) : true"
              v-bind="drawerItem"
            />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- CONTENEDOR DE PAGINAS -->
    <q-page-container>
      <router-view v-slot="{ Component, route }">
        <transition>
          <keep-alive>
            <component :is="Component" :key="route.name" />
          </keep-alive>
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
@font-face {
  font-family: "Electrofied";
  src: url("https://db.onlinewebfonts.com/t/f45d0d0e10eb5171b1ad9ee95d1314f9.ttf")
    format("truetype");
}
@font-face {
  font-family: "Aller";
  src: url("https://db.onlinewebfonts.com/t/3bf7501ddcf8338bc9cdcedad10914cb.ttf")
    format("truetype");
}
.brand-bar {
  margin-bottom: 2px;
  width: 100%;
  padding-left: 0;
  padding-inline-start: 0;
}
.xedro-bar {
  /* box-shadow: 0 2px 0 0 var(--xedro); just if it's needed outside a colored bar*/
  background: linear-gradient(140deg, var(--xedro) 30%, #fff 80%);
}
.xedro-bar .brand {
  color: var(--xedro);
}

#brand-frame {
  resize: horizontal;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
  height: fit-content;
  width: 35%;
  min-width: fit-content;
  max-width: 24rem;
  border-bottom-right-radius: 90px 100px;
  background: linear-gradient(#fff 50%, #dedede);
  padding: 8px;
  padding-right: 32px;
  -webkit-box-shadow: 2px 0 12px -2px #0005;
  box-shadow: 2px 0 12px -2px #0005;
}
.brandi {
  height: 51px;
  width: 51px;
  /* padding-right: 51px; */
}
.i-xedro {
  background: url(https://www.uci.cu/sites/all/themes/uci/images/sprite.png)
    no-repeat 0-1769px;
}
.siglas {
  font-family: Electrofied, sans-serif;
  font-weight: 1000;
  font-size: 20pt;
  color: var(--downcolor);
  background: rgb(
    37,
    33,
    89
  ); /*! VALORES DE COLOR TOMADOS DEL MANUAL DE NORMAS GRÁFICAS DE XEDRO. NO MODIFICAR*/
  background: linear-gradient(
    180deg,
    rgba(37, 33, 89, 1) 0%,
    rgba(51, 59, 146, 1) 50%,
    rgba(21, 13, 66, 1) 50%,
    rgba(53, 62, 115, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.stands,
.generico {
  font-family: sans-serif; /*font face Aller has an issue with the "s" lowercase character that makes it look uppercase*/
  display: inline-block;
  max-width: 200px;
  height: 100%;
  color: #726584;
  margin-left: 3.4px;
  font-size: 8pt;
  line-height: 8pt;
}
.brand {
  /* color: var(--xedro); only if needed outside quasar */
  text-transform: uppercase;
  display: block;
  margin-bottom: -12px;
  margin-left: 2px;
  font-size: 8pt;
  font-weight: 700;
  letter-spacing: 0;
}
</style>
