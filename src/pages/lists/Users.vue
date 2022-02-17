<template>
  <q-page padding>
    <UserForm v-model="showForm" @close-form="closeForm" />
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
  { name: 'username', required: true, label: 'Nombre de usuario', align: 'left', field: 'username', sortable: true, },
  { name: 'roles', required: true, label: 'Roles', align: 'center', field: 'roles', sortable: true, }])



// fill usersArr
listar(usersArr, '/usuario')

/*
function removeRow(id = 1, rows) {
console.log('function remove triggered')
  var index = rows.findIndex(function(currentValue){
     return currentValue.id === id;
})
if (index != -1){
  rows.splice(index,1)
  console.log('spliced')
}else{

  console.log('index not found')
}

}*/
</script>
