<template>
  <q-page class="q-pb-xl">
    <RtecnicoForm v-model="showForm" @close-form="closeForm" />

    <q-btn size="sm" dense flat icon="refresh" @click="listarRtecnicos" />
    <ListPage
      heading="Usuarios"
      @open-form="(payload) => openForm(payload)"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
      rowKey="id"
      :rows="rtecnicosArr"
      :columns="rtecnicoFields"
    ></ListPage>
  </q-page>
</template>

<script setup>
import { ref, provide } from "vue";
import RtecnicoForm from "src/components/forms/RtecnicoForm";
import ListPage from 'components/ListPage'
import listar from 'src/composables/useAPI'
import { eliminar } from 'src/composables/useAPI'


/*
Reporte Tecnico
Schema
{
   "id": 0,
   "nombre": "string",
   "descripcion": "string",
   "estado": "string",
   "revisor": {
     "id": 0,
     "nombre": "string",
     "apellidos": "string",
     "username": "string",
     "roles": [
       "Administrador"
     ],
     "pass": "string"
   },
   "attribute": 0,
   "fechaI": "2022-02-25",
   "fechaC": "2022-02-25"
 } */
const rtecnicoFields = ref([
  { name: 'name', required: true, label: 'Nombre', align: 'left', field: 'nombre', sortable: true },
  { name: 'estado', required: true, label: 'Estado', align: 'left', field: 'estado', sortable: true },
  { name: 'revisor', required: true, label: 'Revisor', align: 'left', field: rtecnico => `${rtecnico.revisor.nombre} ${rtecnico.revisor.apellidos}`, sortable: true },
  { name: 'inicio', required: true, label: 'Fecha de inicio', align: 'left', field: 'fechaI', sortable: true },
  { name: 'cumplimiento', required: true, label: 'Fecha de cumplimiento', align: 'left', field: 'fechaC', sortable: true },
  { name: 'descripcion', required: true, label: 'Descripción', align: 'left', field: 'descripcion', sortable: true },

])
const url = '/reportetecnico'
provide('rtecnicoUrl', url)

const rtecnicosArr = ref([])
provide('rtecnicosArr', rtecnicosArr)

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

// openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = { nombre: `Reporte Técnico ${rtecnicosArr.value.length + 1}`, estado: 1, tipo: 1, evaluacion: 1 }) => {
  rtecnicoObject.value = obj
  showForm.value = true
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) => eliminar(selectedRows, rtecnicosArr, url)
</script>
