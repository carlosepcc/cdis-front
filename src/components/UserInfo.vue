<script setup>
import state from "src/composables/useState"
import { useQuasar } from "quasar";
import { useRouter } from "vue-router"
import {ref, watch} from "vue";
const $router = useRouter()
const $q = useQuasar()
const darkMode = ref($q.dark.mode)
watch(darkMode, val => $q.dark.set(val))
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
    localStorage.removeItem('token')
    console.log("🚀 localStorage.removeItem('token')", localStorage.getItem('token'))
    state.value.loggedUser = null
    console.log("🚀 state.value.loggedUser = null", state.value.loggedUser)
    $router.replace('/')
    return 'User wants to logout'
  }).onCancel(() => {
    console.log('>>>> Cancel')
    return 'Canceled by user'
  })
}
</script>
<template>
  <q-item
    v-if="state.loggedUser"
    clickable
    v-ripple
    class="text-white q-py-none absolute-right"
    :title="state.loggedUser.username + '. ' + state.loggedUser.nombre + '. ' + state.loggedUser.roles"
  >
<!--    INFORMACIÓN DEL USUARIO-->
    <q-item-section>

      <q-item-label class="text-yellow-1 text-bold">
        <span class>
          {{ state.loggedUser.nombre }}
          <span class="gt-xs">{{ state.loggedUser.apellidos }}</span>
        </span>
      </q-item-label>
      <q-item-label class="text-orange-1 text-bold" caption>
        {{
          state.loggedUser.roles[0].replace(/_/g, ' ')
        }}
      </q-item-label>
    </q-item-section >
      <!--    AVATAR-->
      <q-item-section side>
      <q-avatar size="xl" :color="$q.dark.isActive ? 'amber-8' : 'amber-1'" :text-color="$q.dark.isActive ? 'q-yellow-1' : 'primary'" class="text-weight-bolder text-uppercase">
        <img
          v-if="state.loggedUser.img"
          :src="state.loggedUser.img"
          :alt="state.loggedUser.nombre.charAt(0)"
        />
        <span
          v-else
        >{{ state.loggedUser.nombre.charAt(0) }}{{ state.loggedUser.apellidos.charAt(0) }}</span>
        <!-- <ruby v-else>
                {{ state.loggedUser.apellidos.replace(/[a-z]/g, '') }}
                <rt>{{ state.loggedUser.nombre.replace(/[a-z]/g, '') }}</rt>
        </ruby>-->
        <q-badge
          style="backdrop-filter:blur(5px);background:#c826 !important"
          :title="state.loggedUser.roles[0]"
          floating
          rounded
          color="transparent"
          class="text-weight-bold text-yellow-1"
        >{{ state.loggedUser.roles[0].replace(/[a-z]/g, '').replace(/ROLE_/g, '')[0] }}</q-badge>
      </q-avatar>
    </q-item-section>

    <q-menu>
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-weight-light text-uppercase q-mb-md">Ajustes</div>
          <q-toggle v-model="state.dense" label="Interfaz densa" />
          <br>
          Modo
          <q-btn-toggle
            v-model="darkMode"
            push
            no-caps
            toggle-color="primary"
            :options="[
          {value: 'auto', slot: 'auto'},
          {value: false, slot: 'light'},
          {value: true, slot: 'dark'}
        ]"
          >
            <template v-slot:light>
              <div class="row items-center no-wrap">
                <div class="text-center">
                  Claro
                </div>
                <q-icon right name="r_light_mode" />
              </div>
            </template>

            <template v-slot:auto>
              <div class="row items-center no-wrap" >
                <div class="text-center">
                  Sistema
                </div>
                <q-icon right name="r_brightness_medium" />
              </div>
            </template>

            <template v-slot:dark >
              <div class="row items-center no-wrap">
                <div class="text-center">
                  Oscuro
                </div>
                <q-icon right name="r_dark_mode" />
              </div>
            </template>
          </q-btn-toggle>
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-btn
            :dense="state.dense"
            icon="r_logout"
            color="negative"
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
  </q-item>
</template>
