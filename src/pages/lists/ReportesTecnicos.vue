<template>
  <q-page class="q-pb-xl">
    <RtecnicoForm v-model="showForm" @close-form="closeForm" />
    <ListPage heading="Usuarios" @open-form="(payload) => openForm(payload)"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
      rowKey="id" :rows="rtecnicosArr" :columns="rtecnicoFields"></ListPage>
  </q-page>
</template>

<script setup>
import { ref,provide } from "vue";
import RtecnicoForm from "src/components/forms/RtecnicoForm";
import ListPage from 'components/ListPage'
import listar from 'src/composables/useAPI'
import { eliminar } from 'src/composables/useAPI'

const rtecnicosArr = ref([])
const rtecnicoFields = ref([
  { name: 'name', required: true, label: 'Nombre', align: 'left', field: 'nombre', sortable: true },
  { name: 'estado', required: true, label: 'Estado', align: 'left', field: 'estado', sortable: true },
  { name: 'tipo', required: true, label: 'tipo', align: 'left', field: 'tipo', sortable: true },
  { name: 'local', required: true, label: 'local', align: 'left', field: 'local', sortable: true },
  { name: 'inicio', required: true, label: 'inicio', align: 'left', field: 'inicio', sortable: true },
  { name: 'cumplimiento', required: true, label: 'cumplimiento', align: 'left', field: 'cumplimiento', sortable: true },
  { name: 'evaluacion', required: true, label: 'evaluacion', align: 'left', field: 'evaluacion', sortable: true },
  { name: 'descripcion', required: true, label: 'Descripcion', align: 'left', field: 'descripcion', sortable: true },
  { name: 'adjunto', required: true, label: 'adjunto', align: 'left', field: 'file', sortable: true },

])
const url = '/reportetecnico'
provide('rtecnicoUrl', url)

//listar
const listarRtecnicos = () => listar(rtecnicosArr, url)
provide('listarRtecnicos', listarRtecnicos)
// execute on component load
listarRtecnicos()


//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false
}

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const rtecnicoObject = ref()
provide('rtecnicoObject', rtecnicoObject)

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = { nombre: `Reporte Técnico ${rtecnicosArr.value.length + 1}`, estado: 1, tipo: 1,evaluacion:1,

}) => {
  rtecnicoObject.value = obj
  showForm.value = true
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) => eliminar(selectedRows, rtecnicosArr, url)
</script>
