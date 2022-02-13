/* eslint-disable vue/no-ref-as-operand */
<template>
  <q-dialog position="top">
    <q-card>
      <q-card-section class="text-h7 text-uppercase text-weight-light">Artefactos</q-card-section>
      <q-separator />
      <q-card-section>
        <q-form ref="formulario" @submit="onSubmit" @reset="onReset">
          <q-input
            autofocus
            :dense="state.dense"
            filled
            v-model="artefactoObject.nombre"
            label="Nombre del artefacto"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor, escriba algo',
            ]"
          />

          <q-input
            :dense="state.dense"
            label="Descripción"
            v-model="artefactoObject.descripcion"
            filled
            autogrow
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor, escriba algo',
            ]"
          />

          <q-select
            :dense="state.dense"
            v-model="artefactoObject.fase"
            default
            filled
            :options="[1, 2, 3]"
            label="Fase"
            lazy-rules
            :rules="[val || 'Por favor, seleccione algo']"
          />

          <q-select
            :dense="state.dense"
            v-model="artefactoObject.disciplina"
            filled
            :options="[1, 2, 3, 4]"
            label="Disciplina"
            lazy-rules
            :rules="[val || 'Por favor, seleccione algo']"
          />
          <q-file
            :dense="state.dense"
            filled
            v-model="artefactoObject.adjunto"
            label="Adjunto"
            counter
            use-chips
            append
            clearable
            accept=".doc, .docx, .odt, .xml, .pdf, .xsl, .xslx, ppt, .pptx, .odp, .ods, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <q-separator class="q-mb-sm q-mt-md" />

          <div class="q-gutter-sm">
            <q-btn
              :dense="state.dense"
              label="Limpar campos"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
            <q-btn push icon="r_save" label="Guardar" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, inject } from 'vue';
import { guardar } from "src/composables/useAPI";
import state from "src/composables/useState"
import { useQuasar } from 'quasar';
const $q = useQuasar();

//COMPONENT
const emits = defineEmits(['closeForm'])
const url = inject('artefactoUrl')
const listarArtefactos = inject('listarArtefactos')
const currentArtefacto = inject('currentArtefacto')

//DOM
const formulario = ref()

//STATE
const artefactosArr = inject('artefactosArr')
const artefactoBase = {
  nombre: `Artefacto ${artefactosArr.value.length + 1}`,
  fase: 1,
  disciplina: 1,
  descripcion: 'Un artefacto importante',
}
const artefactoObject = ref(currentArtefacto.value == null ? artefactoBase : currentArtefacto.value)

console.log('artefactoObject is: ')
console.log(artefactoObject)
//SUBMIT
function onSubmit() {
  guardar(artefactoObject.value, artefactosArr, url)
  listarArtefactos(artefactosArr, url)
  onReset()
  return true;
}
//RESET FORM
function onReset() {
  artefactoObject.value = artefactoBase
  // eslint-disable-next-line
  formulario.value.resetValidation();
  return true
  /* $q.notify('Reestablecidos todos los campos'); */
}
</script>
