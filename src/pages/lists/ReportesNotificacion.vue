<template>
  <q-page padding>
    <ListPage title="Reportes de Notificación" :rows="rnotificacion" :columns="rnotificacionFields"></ListPage>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import ListPage from 'components/ListPage'

const rnotificacionArr = ref([])
const rnotificacionFields = ref([])
</script>
