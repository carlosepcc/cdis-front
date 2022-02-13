<template>
  <q-page class="q-pb-xl">
    <ArtefactoForm heading="Artefacto" v-model="showForm" :data="currentArtefacto" />
    <q-btn size="sm" dense flat icon="refresh" @click="listarArtefactos" />
    <q-btn size="sm" dense flat icon="save" @click="guardarRandom" />

    <ListPage
      @open-form="(obj) => openForm(obj)"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
      heading="Artefactos"
      rowKey="id"
      :rows="artefactosArr"
      :columns="artefactoFields"
    />
  </q-page>
</template>

<script setup>
import ListPage from 'src/components/ListPage.vue';
import ArtefactoForm from 'components/forms/ArtefactoForm';
import { provide, ref } from 'vue';
import listar from 'src/composables/useAPI'
import { guardar, eliminar } from 'src/composables/useAPI'

const artefactoFields = ref([
  { name: 'id', required: true, label: 'ID (temp)', align: 'left', field: 'id', sortable: true, },

  { name: 'nombre', required: true, label: 'Nombre', align: 'left', field: 'nombre', sortable: true, },
  { name: 'descripcion', align: 'left', label: 'Descripción', field: 'descripcion', sortable: true, },
  { name: 'fase', label: 'Fase', field: 'fase', sortable: true },
  { name: 'disciplina', label: 'Disciplina', field: 'disciplina' },
  //{ name: 'attachment', label: 'Adjunto', field: 'adjunto' },
]);

const artefactosArr = ref([])
provide('artefactosArr', artefactosArr)
const url = '/artefacto'
provide('artefactoUrl', url)

const listarArtefactos = () => listar(artefactosArr, url)
provide('listarArtefactos', listarArtefactos)
// execute on component load
listarArtefactos()

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
var currentArtefacto = ref(null)
provide('currentArtefacto', currentArtefacto)

const showForm = ref(false);
const openForm = (obj = null) => {
  currentArtefacto.value = obj
  console.log(currentArtefacto)
  showForm.value = true
  console.log(showForm.value)
}

const guardarRandom = () => guardar({ id: 44, nombre: 'Artefacto modificado por quinta vez' }, artefactosArr, url)

const deleteTuples = (selectedRows = []) => eliminar(selectedRows, artefactosArr, url)




</script>
