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
            v-model="currentArtefacto.name"
            label="Nombre del artefacto"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor, escriba algo',
            ]"
          />

          <q-input
            :dense="dense"
            label="Descripción"
            v-model="currentArtefacto.description"
            filled
            autogrow
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor, escriba algo',
            ]"
          />

          <q-select
            :dense="dense"
            v-model="currentArtefacto.fase"
            default
            filled
            :options="[1, 2, 3]"
            label="Fase"
            lazy-rules
            :rules="[val || 'Por favor, seleccione algo']"
          />

          <q-select
            :dense="dense"
            v-model="currentArtefacto.disciplina"
            filled
            :options="[1, 2, 3, 4]"
            label="Disciplina"
            lazy-rules
            :rules="[val || 'Por favor, seleccione algo']"
          />
          <q-file
            :dense="dense"
            filled
            v-model="currentArtefacto.attachments"
            label="Adjuntos"
            counter
            use-chips
            multiple
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
import { ref } from 'vue';
const $q = useQuasar();

const props = defineProps({
  formtitle: String,
  url: String,
  actions: Array,
});
const emits = defineEmits(['closeForm'])

const formulario = ref(null)
const artefactoArr = ref([])
const currentArtefacto = ref()
currentArtefacto.value.name = `Artefacto ${artefactoArr.value.length + 1}`

function onSubmit() {
  artefactoArr.value.push(currentArtefacto)
  $q.notify('Guardado con éxito')
  onReset()
  return true;
}
function onReset() {
  currentArtefacto = {
    name: `Artefacto ${artefactoArr.value.length + 1}`,
    fase: 1,
    disciplina: 1,
    description: '',
    attachments: [],
  }
  // eslint-disable-next-line
  formulario.value.resetValidation();
  return true
  /* $q.notify('Reestablecidos todos los campos'); */
}
</script>
