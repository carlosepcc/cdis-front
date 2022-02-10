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
      :rows="artefactosArr"
      :columns="artefactoFields"
    />
  </q-page>
</template>

<script setup>
import ListPage from 'src/components/ListPage.vue';
import ArtefactoForm from 'components/ArtefactoForm';
import { ref } from 'vue';
import listar from 'src/composables/useAPI'

const showForm = ref(false);
const artefactoFields = ref([
  { name: 'name', required: true, label: 'Nombre', align: 'left', field: 'nombre', sortable: true, },
  { name: 'description', align: 'left', label: 'Descripción', field: 'descripcion', sortable: true, },
  { name: 'fase', label: 'Fase', field: 'fase', sortable: true },
  { name: 'disciplina', label: 'Disciplina', field: 'disciplina' },
  //{ name: 'adjunto', label: 'Adjunto', field: 'adjunto' },
]);

const artefactosArr = ref([])

const listarArtefactos = () => listar(artefactosArr, '/artefacto')
// execute on component load
listar(artefactosArr, '/artefacto')

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
    console.log('>>>> OK')
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
