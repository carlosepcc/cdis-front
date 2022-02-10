<template>
  <q-page padding>
    <ListPage :title="Usuarios" :rows="rtecnicos" :columns="rtecnicoFields"></ListPage>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import ListPage from 'components/ListPage'
import listar from 'src/composables/useAPI'

const rtecnicosArr = ref([])
const rtecnicoFields = ref([
  { name: 'name', required: true, label: 'Nombre', align: 'left', field: 'nombre', sortable: true },
  { name: 'estado', required: true, label: 'Estado', align: 'left', field: 'estado', sortable: true },
  { name: 'tipo', required: true, label: 'tipo', align: 'left', field: 'tipo', sortable: true },
  { name: 'local', required: true, label: 'local', align: 'left', field: 'local', sortable: true },
  { name: 'inicio', required: true, label: 'inicio', align: 'left', field: 'inicio', sortable: true },
  { name: 'cumplimiento', required: true, label: 'cumplimiento', align: 'left', field: 'cumplimiento', sortable: true },
  { name: 'evaluacion', required: true, label: 'evaluacion', align: 'left', field: 'evaluacion', sortable: true },
  { name: 'description', required: true, label: 'Descripcion', align: 'left', field: 'descripcion', sortable: true },
  { name: 'adjunto', required: true, label: 'adjunto', align: 'left', field: 'adjunto', sortable: true },

])

//fill rtecnicosArr
listar(rtecnicosArr, '/reportetecnico')
</script>
