<template>
  <q-page padding>
    <UserForm v-model="showForm" @close-form="closeForm" />

    <q-btn size="sm" dense flat icon="refresh" @click="listarUsers" />
    <ListPage @open-form="(payload) => openForm(payload)"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
      rowKey="id" heading="Usuarios" :rows="usersArr" :columns="userFields"></ListPage>
  </q-page>
</template>

<script setup>
import ListPage from 'components/ListPage'
import { ref, provide } from "vue";
import listar from 'src/composables/useAPI'
import { usersArr } from 'src/composables/useState'
import UserForm from 'components/forms/UserForm'

const userFields = ref([
  { name: 'nombre', required: true, label: 'Nombre', align: 'left', field: 'nombre', sortable: true, },
  { name: 'apellidos', required: true, label: 'Apellidos', align: 'left', field: 'apellidos', sortable: true, },
  { name: 'username', required: true, label: 'Nombre de usuario', align: 'left', field: 'username', sortable: true, },
  { name: 'roles', required: true, label: 'Roles', align: 'center', field: 'roles', sortable: true, }])




const url = '/user'
provide('userUrl', url)

//listar
const listarUsers = () => listar(usersArr, url)
provide('listarUsers', listarUsers)
// execute on component load
listarUsers()


//form dialog model
const showForm = ref(false);

//closeForm triggered on: Cancel
const closeForm = () => {
  showForm.value = false
}

// MODIFICAR (Abrir formulario con datos del objeto a modificar)
const userObject = ref()
provide('userObject', userObject)

//openForm triggered on: Nueva entrada, Modificar
const openForm = (obj = { nombre: `user ${usersArr.value.length + 1}`, fase: 1, disciplina: 1, descripcion: 'Un user importante' }) => {
  userObject.value = obj
  showForm.value = true
}

// delete tuples by array of objects
const deleteTuples = (selectedRows = []) => eliminar(selectedRows, usersArr, url)

</script>
