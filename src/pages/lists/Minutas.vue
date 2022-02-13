<template>
  <q-page padding>
    <ListPage heading="Minutas de reunión" :rows="minutasArr" :columns="minutaFields"></ListPage>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import ListPage from 'components/ListPage'
import listar from 'src/composables/useAPI'

const minutasArr = ref([])
const minutaFields = ref([
  { name: 'proyecto', required: true, label: 'Proyecto', align: 'left', field: 'proyecto', sortable: true },
  { name: 'revisor', required: true, label: 'revisor', align: 'left', field: 'revisor', sortable: true },
  { name: 'encargado', required: true, label: 'encargado', align: 'left', field: 'encargado', sortable: true },
  { name: 'description', required: true, label: 'description', align: 'left', field: 'description', sortable: true },

])

// call on component load
listar(minutasArr, '/minuta')
</script>
