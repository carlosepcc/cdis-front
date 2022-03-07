<script setup>
// Components
import BaseDrawer from 'components/BaseDrawer';
import BaseBrand from 'src/components/BaseBrand';
import UserInfo from 'src/components/UserInfo';
import { ref } from 'vue';
import state from 'src/composables/useState'
import { autorizar } from 'src/composables/useAPI'


// DRAWER
const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value

console.log("🚀 ~ file: MainLayout.vue ~ line 23 ~ localStorage.getItem('token')", localStorage.getItem('token'))

// Autorizar usuario para persistencia de la sesión
autorizar()

</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar class="brand-bar">
        <div id="brand-frame" class="text-primary">
<!--          BOTON MENU-->
          <q-btn
            dense
            flat
            round
            icon="menu"
            aria-label="Menú"
            title="Menú"
            @click="toggleLeftDrawer"
          />

          <q-toolbar-title>
            <BaseBrand brand="XAUCE" product="CDIS" :generic="'Gestión de Proceso de\nComisión Disciplinaria'" />
          </q-toolbar-title>
        </div>



        <!-- USER -->
        <UserInfo v-if="state.loggedUser" />
        <q-btn
          :dense="state.dense"
          v-else
          flat
          no-caps
          icon="login"
          label="Iniciar Sesión"
          to="/"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <!--MENU LATERAL (DRAWER "gaveta") -->
    <BaseDrawer v-model="leftDrawerOpen" />

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
  font-display: swap;
}
/* @font-face {
  font-family: "Aller";
  src: url("https://db.onlinewebfonts.com/t/3bf7501ddcf8338bc9cdcedad10914cb.ttf")
    format("truetype");
  font-display: swap;
} */
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
  font-size: 18pt;
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
  font-size: 7pt;
  font-weight: 700;
  letter-spacing: 0;
}
</style>
