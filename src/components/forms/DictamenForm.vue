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
            v-model="dictamenObject.nombre"
            label="Nombre del dictamen"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor, escriba algo',
            ]"
          />

          <q-input
            :dense="dense"
            label="Descripción"
            v-model="dictamenObject.descripcion"
            filled
            autogrow
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor, escriba algo',
            ]"
          />

          <q-select
            :dense="dense"
            v-model="dictamenObject.fase"
            default
            filled
            :options="[1, 2, 3]"
            label="Fase"
            lazy-rules
            :rules="[val || 'Por favor, seleccione algo']"
          />

          <q-select
            :dense="dense"
            v-model="dictamenObject.disciplina"
            filled
            :options="[1, 2, 3, 4]"
            label="Disciplina"
            lazy-rules
            :rules="[val || 'Por favor, seleccione algo']"
          />
          <q-file
            :dense="dense"
            filled
            v-model="dictamenObject.adjunto"
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
const url = inject('dictamenUrl')
const listarDictamenes = inject('listarDictamenes')

//DOM
const formulario = ref()

//STATE
const dictamenesArr = inject('dictamenesArr')
const dictamenBase = {
  nombre: `dictamen ${dictamenesArr.value.length + 1}`,
  fase: 1,
  disciplina: 1,
  descripcion: 'Un dictamen importante',
}
const dictamenObject = ref(dictamenBase)

//SUBMIT
function onSubmit() {
  guardar(dictamenObject.value, dictamenesArr, url)
  listarDictamenes(dictamenesArr, url)
  onReset()
  return true;
}
//RESET FORM
function onReset() {
  dictamenObject.value = dictamenBase
  // eslint-disable-next-line
  formulario.value.resetValidation();
  return true
  /* $q.notify('Reestablecidos todos los campos'); */
}
</script>
