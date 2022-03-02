<script setup>
// Components
import DrawerItem from 'components/DrawerItem';
import { ref } from 'vue';
import state from 'src/composables/useState'
import { autorizar } from 'src/composables/useAPI'


// DRAWER
const miniState = ref(false);






const drawerItems = [
  { title: "Inicio", icon: "home", alt: "n", to: "/" },

  //REVISOR
  { title: 'Hallazgos', icon: 'H', to: 'hallazgos', forRoles: ['Revisor'] },
  { title: 'Minutas de reunión', icon: 'M', to: 'minutas', forRoles: ['Revisor'] },

  { title: 'Artefactos', icon: 'A', to: 'artefactos', forRoles: ['Encargado_de_proyecto'] },
  { title: 'Reportes Técnicos', icon: 'T', to: 'rtecnicos', forRoles: ['Asesor_de_calidad', 'Coordinador_de_calidad'] },
  { title: 'Usuarios', icon: 'U', to: 'users', forRoles: ['Administrador'] },

  // ALL USERS index 6 - 8 //, forRoles: ['Administrador', 'Asesor_de_calidad', 'Coordinador_de_calidad', 'Encargado_de_proyecto', 'Revisor']
  { title: 'Ajustes', icon: 'settings', to: 'settings', separate: true },
  { title: 'Ayuda', icon: 'help', to: 'help' },
  { title: 'Acerca de', icon: 'info', to: 'about' },
];

</script>

<template>
  <!--MENU LATERAL (DRAWER "gaveta") -->
  <q-drawer
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
            v-if="drawerItem.forRoles == undefined || (state.loggedUser ? state.loggedUser.roles.some(currentRol => drawerItem.forRoles.includes(currentRol)) : false)"
            v-bind="drawerItem"
          />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

