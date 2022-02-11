/* eslint-disable vue/no-ref-as-operand */
<template>
  <q-dialog position="top">
    <q-card>
      <q-card-section class="text-h7 text-uppercase text-weight-light">{{ formtitle }}</q-card-section>
      <q-separator />
      <q-card-section>
        <q-form ref="formulario" @submit="onSubmit" @reset="onReset">
          <q-input
            autofocus
            :dense="dense"
            filled
            v-model="hallazgoObject.productoAf"
            label="Producto Afectado"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor, escriba algo',
            ]"
          />
          <q-input
            :dense="dense"
            v-model="hallazgoObject.ubicacion"
            label="Ubicación"
            filled
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor, escriba algo',
            ]"
          />
          <q-input
            :dense="dense"
            label="Descripción"
            v-model="hallazgoObject.descripcion"
            filled
            autogrow
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor, escriba algo',
            ]"
          />

          <q-select
            :dense="dense"
            v-model="hallazgoObject.tipo"
            filled
            :options="[1, 2, 3, 4]"
            label="Tipo"
            lazy-rules
            :rules="[val || 'Por favor, seleccione algo']"
          />
          <q-input
            :dense="dense"
            label="Fecha"
            type="date"
            v-model="hallazgoObject.fecha"
            filled
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor, escriba algo',
            ]"
          />
          <q-select
            :dense="dense"
            v-model="hallazgoObject.impacto"
            filled
            :options="[1, 2, 3]"
            label="Impacto"
            lazy-rules
            :rules="[val || 'Por favor, seleccione algo']"
          />
          <q-separator class="q-mb-sm q-mt-md" />

          <div class="q-gutter-sm">
            <q-btn
              :dense="dense"
              :label="actions[1]"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
            <q-btn push icon="r_save" :label="actions[0]" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { ref, inject } from 'vue';
const $q = useQuasar();
import { guardar } from "src/composables/useAPI";

//COMPONENT
const props = defineProps({
  formtitle: String,
  url: String,
  actions: Array,
});
const emits = defineEmits(['closeForm'])
const url = inject('hallazgoUrl')
const listarHallazgos = inject('listarHallazgos')

//DOM
const formulario = ref()

//STATE
const hallazgosArr = inject('hallazgosArr')
const hallazgoBase = {
  productoAf: "Producto 1",
  ubicacions: "Ubicacion 1",
  descripcion: 'Un hallazgo importante',
  tipo: 1,
  fecha: "2022-02-11T17:15:52.960Z",
  impacto: 1
}
const hallazgoObject = ref(hallazgoBase)

//SUBMIT
function onSubmit() {
  guardar(hallazgoObject.value, hallazgosArr, url)
  listarHallazgos(hallazgosArr, url)
  onReset()
  return true;
}
//RESET FORM
function onReset() {
  hallazgoObject.value = hallazgoBase
  // eslint-disable-next-line
  formulario.value.resetValidation();
  return true
  /* $q.notify('Reestablecidos todos los campos'); */
}
</script>
