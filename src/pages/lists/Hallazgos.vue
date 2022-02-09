<template>
  <q-page padding>
    <ListPage title="Hallazgos" :rows="hallazgosArr" :columns="hallazgoFields"></ListPage>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import ListPage from 'components/ListPage'
import listar from 'src/composables/useAPI'


const hallazgosArr = ref([])
const hallazgoFields = ref([
  { name: 'producto', required: true, label: 'Producto afectado', align: 'left', field: 'productoAf', sortable: true },
  { name: 'ubicacion', required: true, label: 'Ubicacion', align: 'left', field: 'ubicacion', sortable: true, },
  { name: 'descripcion', required: true, label: 'Descripción', align: 'left', field: 'descripcion', sortable: true, },
  { name: 'tipo', required: true, label: 'Tipo', align: 'left', field: 'tipo', sortable: true, },

  { name: 'date', required: true, label: 'Fecha', align: 'left', field: 'fecha', sortable: true, },
  { name: 'impacto', required: true, label: 'Impacto', align: 'left', field: 'impacto', sortable: true, },

])

const url = '/hallazgo'
// call on component load
listar(hallazgosArr, url)
</script>
