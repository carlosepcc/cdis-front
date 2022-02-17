/* eslint-disable vue/no-ref-as-operand */
<template>
  <q-dialog position="top">
    <q-card>
      <q-card-section
        class="text-h7 text-uppercase text-weight-light"
      >{{ artefactoObject.id !== null ? 'Modificar' : 'Nuevo' }} Artefacto</q-card-section>
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
            <q-btn-group outline spread clas="full-width q-mt-md">
              <q-btn
                :size="state.dense ? 'sm' : 'md'"
                label="Restablecer"
                type="reset"
                flat
                color="negative"
              />
              <q-btn
                :size="state.dense ? 'sm' : 'md'"
                label="Cancelar"
                flat
                @click="$emit('closeForm')"
              />
            </q-btn-group>
            <q-btn
              push
              :size="state.dense ? 'sm' : 'md'"
              class="full-width"
              icon="r_save"
              label="Guardar"
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
const url = inject('artefactoUrl')


//STATE
const artefactosArr = inject('artefactosArr')
const artefactoObject = inject('artefactoObject')
const artefactoBase = inject('artefactoBase')
//SUBMIT
const onSubmit = () => {
  console.log('onSubmit')
  guardar(artefactoObject.value, artefactosArr, url)

  return onReset();
}

//RESET FORM
const onReset = () => {

  //Reset fields
  let modifyingObjectId = artefactoObject.value.id
  artefactoObject.value = artefactoBase
  artefactoObject.value.id = modifyingObjectId

  formulario.value.resetValidation();
  return true
  /* $q.notify('Reestablecidos todos los campos'); */
}
</script>
