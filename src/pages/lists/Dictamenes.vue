<template>
  <q-page padding>
    <ListPage title="Dictámenes técnicos" :rows="dictamenes" :columns="dictamenFields" />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import ListPage from 'components/ListPage'
import listar from 'src/composables/useAPI'

const dictamenFields = ref([
  { name: 'proyecto', required: true, label: 'Proyecto', align: 'left', field: 'proyecto', sortable: true },
  { name: 'encargado', required: true, label: 'Encargado', align: 'left', field: 'encargado', sortable: true },
  { name: 'descripcion', required: true, label: 'Descripción', align: 'left', field: 'descripcion', sortable: true },
  { name: 'noconformidades', required: true, label: 'No conformidades', align: 'left', field: 'noconformidades', sortable: true },
  { name: 'oportunidades', required: true, label: 'Oportunidades de mejora', align: 'left', field: 'oportunidades', sortable: true },
  { name: 'estado', required: true, label: 'Estado', align: 'left', field: 'estado', sortable: true },

])
const dictamenesArr = ref([])
listar(dictamenesArr, '/dictamen')
</script>
