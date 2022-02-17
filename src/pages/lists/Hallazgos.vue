<template>
  <q-page class="q-pb-xl">
    <HallazgoForm v-model="showForm" @close-form="showForm = false" />
    <q-btn size="sm" dense flat icon="refresh" @click="listarHallazgos" />
    <ListPage
      @open-form="showForm = true"
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

const listarHallazgos = () => listar(hallazgosArr, url)
provide('listarHallazgos', listarHallazgos)
// execute on component load
listarHallazgos()

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const hallazgoBase = { nombre: `hallazgo ${hallazgosArr.value.length + 1}`, producto: 1, disciplina: 1, descripcion: 'Un hallazgo importante', }
provide('hallazgoBase', hallazgoBase)

const hallazgoObject = ref(hallazgoBase)
provide('hallazgoObject', hallazgoObject)

const showForm = ref(false);

const openForm = (obj = hallazgoBase) => {
  hallazgoObject.value = obj
  showForm.value = true
}

// ELIMINAR
const deleteTuples = (selectedRows = []) => eliminar(selectedRows, hallazgosArr, url)

</script>
