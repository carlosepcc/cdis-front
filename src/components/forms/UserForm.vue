<template>
  <q-dialog position="top" persistent>
    <q-card class="hide-scrollbar">
      <q-card-section class="text-h7 text-uppercase text-weight-light">
        {{ userObject.id ? 'Modificar' : 'Nuevo' }} user
        <q-btn color="grey" flat icon="close" @click="$emit('closeForm')" />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form ref="formulario" @submit="onSubmit" @reset="onReset">
          <div>
            <q-input
              autofocus
              :dense="state.dense"
              filled
              v-model="userObject.name"
              label="Nombre"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ]"
            />

            <q-input
              :dense="state.dense"
              label="Apellidos"
              v-model="userObject.lastname"
              filled
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ]"
            />
            <q-input
              :dense="state.dense"
              label="Nombre de usuario"
              v-model="userObject.username"
              filled
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
                (val) => (val && val.length < 32) || 'Por favor, no más de 32 caracteres',
                (val) => (val && /^[a-z]+$/.test(val)) || 'Por favor, sólo caracteres de a-z',
              ]"
            />

            <q-input
              :dense="state.dense"
              label="Contraseña"
              v-model="userObject.contrasenna"
              type="password"
              filled
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ]"
            />

            <q-select
              :dense="state.dense"
              v-model="userObject.roles"
              filled
              :options="['Administrador', 'Asesor de calidad', 'Coordinador de calidad', 'Encargado de proyecto','Revisor']"
              label="Roles"
              lazy-rules
              :rules="[val || 'Por favor, seleccione algo']"
            />

          </div>
          <q-separator class="q-mb-sm q-mt-md" />

          <div class="q-gutter-sm">
            <q-btn-group outline spread clas="full-width q-mt-md">
              <q-btn
                :size="state.dense ? 'sm' : 'md'"
                label="Restablecer"
                type="reset"
                flat
                no-caps
              />
              <q-btn
                :size="state.dense ? 'sm' : 'md'"
                label="Cancelar"
                flat
                no-caps
                @click="$emit('closeForm')"
              />
            </q-btn-group>
            <q-btn
              push
              no-caps
              :size="state.dense ? 'sm' : 'md'"
              class="full-width"
              icon="r_save"
              :label="userObject.id ? 'Modificar' : 'Guardar'"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, inject } from 'vue';
import { guardar } from "src/composables/useAPI";
import state,{usersArr} from "src/composables/useState"

//DOM
const formulario = ref()

//COMPONENT
const emits = defineEmits(['closeForm'])
const url = inject('userUrl')


//STATE
const userObject = inject('userObject')

//SUBMIT
const onSubmit = () => {
  guardar(userObject.value, usersArr, url)
  onReset();
  //! TODO: No resetear cuando guardar da error
}

//RESET FORM
const onReset = () => {
  //Reset to base values maitaining the id value
  userObject.value = { id: userObject.value.id, nombre: `user ${usersArr.value.length + 1}`, fase: 1, disciplina: 1, descripcion: 'Un user importante' }
  //Clear validation error messages.
  formulario.value.resetValidation();
}
</script>
