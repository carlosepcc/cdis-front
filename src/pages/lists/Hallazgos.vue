<template>
  <q-page class="q-pb-xl">
    <HallazgoForm v-model="showForm" @close-form="closeForm" />
    <q-btn size="sm" dense flat icon="refresh" @click="listarHallazgos" />
    <ListPage
      @open-form="openForm"
      heading="Hallazgos"
      :rows="hallazgosArr"
      :columns="hallazgoFields"
    ></ListPage>
  </q-page>
</template>

<script setup>
import { ref, provide } from "vue";
import ListPage from 'components/ListPage'
import HallazgoForm from 'components/forms/HallazgoForm'
import listar from 'src/composables/useAPI'

const hallazgoFields = ref([
  { name: 'producto', required: true, label: 'Producto afectado', align: 'left', field: 'productoAf', sortable: true },
  { name: 'ubicacion', required: true, label: 'Ubicacion', align: 'left', field: 'ubicacion', sortable: true, },
  { name: 'descripcion', required: true, label: 'Descripción', align: 'left', field: 'descripcion', sortable: true, },
  { name: 'tipo', required: true, label: 'Tipo', align: 'left', field: 'tipo', sortable: true, },
  { name: 'date', required: true, label: 'Fecha', align: 'left', field: 'fecha', sortable: true, },
  { name: 'impacto', required: true, label: 'Impacto', align: 'left', field: 'impacto', sortable: true, },

])

const hallazgosArr = ref([{ id: 1, nombre: 'hallazgo en codigo', descripcion: 'Este es un hallazgo de prueba para usarlo mientras no tengo acceso a los datos por seguridad' }])
provide('hallazgosArr', hallazgosArr)
const url = '/hallazgo'
provide('hallazgoUrl', url)

//listar
const listarHallazgos = () => listar(hallazgosArr, url)
provide('listarHallazgos', listarHallazgos)
// execute on component load
listarHallazgos()


//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false
}

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const hallazgoObject = ref({})
provide('hallazgoObject', hallazgoObject)

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = { producto: `Producto ${hallazgosArr.value.length + 1}`, impacto: 'medio', descripcion: 'Un hallazgo importante' }) => {
  hallazgoObject.value = obj
  showForm.value = true
  console.log('openForm')
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) => eliminar(selectedRows, hallazgosArr, url)

</script>
