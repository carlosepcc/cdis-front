<template>
  <q-card class="q-pa-md shadow-1 hide-scrollbar rounded-borders" style="max-width: 400px">
    <q-card-section class="text-h7 text-uppercase text-weight-light">Iniciar sesión</q-card-section>
    <q-separator />
    <q-card-section>
      <q-form @submit="onSubmit" @reset="onReset" ref="formulario" class="q-gutter-md">
        <q-input
          filled
          :dense="state.dense"
          v-model="loginObject.usuario"
          label="usuario"
          lazy-rules
          max-length="32"
          :rules="[val => val && val.length > 0 || 'Por favor, escriba algo']"
        />

        <q-input
          filled
          :dense="state.dense"
          :type="showPassword ? 'password' : 'text'"
          v-model="loginObject.contrasenna"
          label="Contraseña"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Por favor, escriba algo'
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'r_visibility_off' : 'r_visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>

        <!-- <q-checkbox v-model="accept" label="Recordar usuario" />
        -->
        <div>
          <!-- <q-btn
          label="Olvidé mi contraseña"
          no-caps
          color="primary"
          flat
          class="q-ml-sm"
          @input="$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Pues te jodiste. Que te creen otra cuenta.'
          })"
          @click="$q.dialog({
            title: '😂  Usted se jodió',
            message: 'Si el administrador no está almorzando, que le ayude.',
            color: 'info',
            ok: { label: 'Ño', noCaps: true, flat: true },
          })"
          />-->
          <q-btn-group push spread clas="full-width q-mt-md">
            <q-btn :size="state.dense ? 'sm' : 'md'" label="Restablecer" type="reset" no-caps push />
            <q-btn label="Entrar" push no-caps class="full-width" type="submit" color="primary" />
          </q-btn-group>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { login } from "src/composables/useAPI";
import state from "src/composables/useState"

const $q = useQuasar()

const formulario = ref()
const showPassword = ref(false)

const loginObject = ref({ usuario: '', contrasenna: '' })

//SUBMIT
const onSubmit = () => {
  login(loginObject.value)
  onReset();
  //! TODO: No resetear cuando da error
}

//RESET FORM
const onReset = () => {
  //Reset to base values
  loginObject.value = { usuario: '', contrasenna: '' }
  //Clear validation error messages.
  formulario.value.resetValidation();
}



</script>
