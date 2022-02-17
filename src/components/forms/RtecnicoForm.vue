<template>
  <q-dialog position="top" persistent>
    <q-card class="hide-scrollbar">
      <q-card-section class="text-h7 text-uppercase text-weight-light">
        {{ rtecnicoObject.id ? 'Modificar' : 'Nuevo' }} Reporte Técnico
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
              v-model="rtecnicoObject.nombre"
              label="Nombre del Reporte Técnico"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ]"
            />

            <q-input
              :dense="state.dense"
              label="Descripción"
              v-model="rtecnicoObject.descripcion"
              filled
              autogrow
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor, escriba algo',
              ]"
            />

            <q-select
              :dense="state.dense"
              v-model="rtecnicoObject.fase"
              default
              filled
              :options="[1, 2, 3]"
              label="Fase"
              lazy-rules
              :rules="[val || 'Por favor, seleccione algo']"
            />

            <q-select
              :dense="state.dense"
              v-model="rtecnicoObject.disciplina"
              filled
              :options="[1, 2, 3, 4]"
              label="Disciplina"
              lazy-rules
              :rules="[val || 'Por favor, seleccione algo']"
            />
            <q-file
              :dense="state.dense"
              filled
              v-model="rtecnicoObject.adjunto"
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
              :label="rtecnicoObject.id ? 'Modificar' : 'Guardar'"
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
import state from "src/composables/useState"

//DOM
const formulario = ref()

//COMPONENT
const emits = defineEmits(['closeForm'])
const url = inject('rtecnicoUrl')


//STATE
const rtecnicosArr = inject('rtecnicosArr')
const rtecnicoObject = inject('rtecnicoObject')

//SUBMIT
const onSubmit = () => {
  guardar(rtecnicoObject.value, rtecnicosArr, url)
  onReset();
  //! TODO: No resetear cuando guardar da error
}

//RESET FORM
const onReset = () => {
  //Reset to base values maitaining the id value
  rtecnicoObject.value = { id: rtecnicoObject.value.id, nombre: `rtecnico ${rtecnicosArr.value.length + 1}`, fase: 1, disciplina: 1, descripcion: 'Un rtecnico importante' }
  //Clear validation error messages.
  formulario.value.resetValidation();
}
</script>
