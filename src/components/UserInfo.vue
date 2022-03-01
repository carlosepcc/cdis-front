<script setup>
import state from "src/composables/useState"
import { useQuasar } from "quasar";
import { useRouter } from "vue-router"
const $router = useRouter()
const $q = useQuasar()
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
    <q-item-section side>
      <q-item-label class="text-purple-1 text-weight-light">
        <span class>
          {{ state.loggedUser.nombre }}
          <span class="gt-xs">{{ state.loggedUser.apellidos }}</span>
        </span>
      </q-item-label>
      <q-item-label class="text-purple-2 text-bold" caption>
        {{
          state.loggedUser.roles[0].replace(/_/g, ' ')
        }}
      </q-item-label>
    </q-item-section>
    <q-item-section>
      <q-avatar size="xl" color="white" text-color="primary" class="text-weight-bolder">
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
          style="backdrop-filter:blur(5px);background:#a095 !important"
          :title="state.loggedUser.roles[0]"
          floating
          rounded
          color="transparent"
          class="text-weight-bold text-purple-2"
        >{{ state.loggedUser.roles[0].replace(/[a-z]/g, '').replace(/_/g, ' ') }}</q-badge>
      </q-avatar>
    </q-item-section>
    <q-menu>
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-weight-light text-uppercase q-mb-md">Ajustes</div>
          <q-toggle v-model="state.dense" label="Interfaz densa" />
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
