<template>
  <q-page padding>
    <ListPage :title="Usuarios" :rows="rtecnicos" :columns="rtecnicoFields"></ListPage>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import ListPage from 'components/ListPage'
const rtecnicosArr = ref([])
const rtecnicoFields = ref([])
</script>
