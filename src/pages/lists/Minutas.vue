<template>
  <q-page padding>
    <MinutaForm v-model="showForm" @close-form="closeForm" />

    <q-btn size="sm" dense flat icon="refresh" @click="listarMinutas" />
    <ListPage
      @open-form="(payload) => openForm(payload)"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
      rowKey="id"
      heading="Minutas de reunión"
      :rows="minutasArr"
      :columns="minutaFields"
    ></ListPage>
  </q-page>
</template>

<script setup>
import { ref, provide } from "vue";
import ListPage from 'components/ListPage'
import listar from 'src/composables/useAPI'
import MinutaForm from "src/components/forms/MinutaForm";
import { usersArr } from 'src/composables/useState'

const minutaFields = ref([
  { name: 'proyecto', required: true, label: 'Proyecto', align: 'left', field: 'proyecto', sortable: true },
  { name: 'revisor', required: true, label: 'revisor', align: 'left', field: revisor => `${revisor.nombre} ${revisor.apellidos}`, sortable: true },
  { name: 'encargado', required: true, label: 'encargado', align: 'left', field: encargado => encargado.nombre, sortable: true },
  { name: 'description', required: true, label: 'description', align: 'left', field: 'description', sortable: true },
])

const minutasArr = ref([{ id: 1, nombre: 'minuta en codigo', descripcion: 'Este es un minuta de prueba para usarlo mientras no tengo acceso a los datos por seguridad' }])
provide('minutasArr', minutasArr)
const url = '/minuta'
provide('minutaUrl', url)

//listar
const listarMinutas = () => listar(minutasArr, url)
provide('listarMinutas', listarMinutas)
// execute on component load
listarMinutas()



//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false
}

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const minutaObject = ref()
provide('minutaObject', minutaObject)

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = { revisor: usersArr.value.filter(user => user.roles.includes('Revisor'))[0], encargado: usersArr.value.filter(user => user.roles.includes('Encargado'))[0] }) => {
  minutaObject.value = obj
  showForm.value = true
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) => eliminar(selectedRows, minutasArr, url)

</script>
