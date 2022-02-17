<template>
  <q-page padding>
    <ListPage @open-form="(payload) => openForm(payload)"
      @delete-rows="(selectedRows) => deleteTuples(selectedRows)"
      rowKey="id"
      heading="Reportes de Notificación"
      :rows="rnotificacionArr"
      :columns="rnotificacionFields"
    ></ListPage>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import ListPage from 'components/ListPage'
import listar from 'src/composables/useAPI'

const rnotificacionArr = ref([])
const rnotificacionFields = ref([
  { name: 'name', required: true, label: 'Nombre', align: 'left', field: 'nombre', sortable: true },
  { name: 'fase', required: true, label: 'Fase', align: 'left', field: 'fase', sortable: true },
  { name: 'disciplina', required: true, label: 'Disciplina', align: 'left', field: 'disciplina', sortable: true },
  { name: 'local', required: true, label: 'Local', align: 'left', field: 'local', sortable: true },
  { name: 'date', required: true, label: 'Fecha', align: 'left', field: 'fecha', sortable: true },
  { name: 'description', required: true, label: 'Descripción', align: 'left', field: 'description', sortable: true },
])


//fill rtecnicosArr
listar(rnotificacionArr, '/reportenotificacion')
</script>
