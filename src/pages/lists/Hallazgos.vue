<template>
  <q-page class="q-pb-xl">
    <HallazgoForm
      formtitle="Hallazgo"
      :actions="['Guardar', 'Limpiar campos']"
      v-model="showForm"
      :data="{}"
    />
    <q-btn size="sm" dense flat icon="refresh" @click="listarHallazgos" />
    <ListPage
      @open-form="showForm = true"
      heading="Hallazgos"
      :rows="hallazgosArr"
      :columns="hallazgoFields"
    ></ListPage>
  </q-page>
</template>

<script setup>
import { ref, provide } from "vue";
import ListPage from 'components/ListPage'
import HallazgoForm from 'components/forms/HallazgoForm'
import listar from 'src/composables/useAPI'

const hallazgoFields = ref([
  { name: 'producto', required: true, label: 'Producto afectado', align: 'left', field: 'productoAf', sortable: true },
  { name: 'ubicacion', required: true, label: 'Ubicacion', align: 'left', field: 'ubicacion', sortable: true, },
  { name: 'descripcion', required: true, label: 'Descripción', align: 'left', field: 'descripcion', sortable: true, },
  { name: 'tipo', required: true, label: 'Tipo', align: 'left', field: 'tipo', sortable: true, },
  { name: 'date', required: true, label: 'Fecha', align: 'left', field: 'fecha', sortable: true, },
  { name: 'impacto', required: true, label: 'Impacto', align: 'left', field: 'impacto', sortable: true, },

])

const hallazgosArr = ref([{ id: 1, producto: 'Producto1', descripcion: 'Descripcion' }])
const url = '/hallazgo'
provide('hallazgoUrl', url)


const listarHallazgos = () => listar(hallazgosArr, url)
provide('listarHallazgos', listarHallazgos)

// fill hallazgosArr
listarHallazgos()
</script>
