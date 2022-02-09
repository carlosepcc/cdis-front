<template>
  <q-page class="q-pb-xl">
    <ArtefactoForm
      formtitle="Artefacto"
      :actions="['Guardar', 'Limpiar campos']"
      v-model="showForm"
      :data="{}"
    />
    <ListPage
      @open-form="showForm = true"
      @delete-rows="deleteTuples"
      title="Artefactos"
      rowKey="id"
      :rows="artefactos"
      :columns="artefactoFields"
    />
  </q-page>
</template>

<script setup>
import ListPage from 'src/components/ListPage.vue';
import ArtefactoForm from 'components/ArtefactoForm';
import { ref, provide } from 'vue';
import listar from 'src/composables/useAPI'

const showForm = ref(false);
const artefactoFields = ref([
  { name: 'name', required: true, label: 'Nombre', align: 'left', field: 'name', sortable: true, },
  { name: 'description', align: 'left', label: 'Descripción', field: 'description', sortable: true, },
  { name: 'fase', label: 'Fase', field: 'fase', sortable: true },
  { name: 'disciplina', label: 'Disciplina', field: 'disciplina' },
  { name: 'adjuntos', label: 'Adjuntos', field: 'adjuntos' },
]);

const artefactosArr = ref([])
provide('artefactosArr', artefactosArr)

const url = '/artefactos'

const listarArtefactos = () => listar(artefactosArr, url)
provide('listarArtefactos', listarArtefactos)
// execute on component load
listarArtefactos()

function deleteTuples(selectedRows = []) {

  $q.dialog({
    title: 'Confirme eliminación',
    message: 'La eliminación será permanente.',
    cancel: true,
    persistent: true,
    color: 'negative',
    ok: { label: 'Eliminar', noCaps: true, flat: true },
    cancel: { color: 'primary', noCaps: true, flat: true }
  }).onOk(() => {
    console.log('>>> OK')
    selectedRows.filter(function (item) {
      artefactos.value.splice(artefactos.value.indexOf(item), 1);
      return item;
    });
  }).onCancel(() => {
    console.log('>>>> Cancel')
    return 'Canceled by user'
  })

}
</script>
