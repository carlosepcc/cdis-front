<template>
  <q-page class="q-pb-xl">
    <ArtefactoForm
      formtitle="Artefacto"
      :actions="['Guardar', 'Limpiar campos']"
      v-model="showForm"
      :data="{}"
    />
    <q-btn size="sm" dense flat icon="refresh" @click="listarArtefactos" />
    <q-btn size="sm" dense flat icon="save" @click="guardarRandom" />

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
import ArtefactoForm from 'components/forms/ArtefactoForm';
import { provide, ref } from 'vue';
import listar from 'src/composables/useAPI'
import { guardar } from 'src/composables/useAPI'

const showForm = ref(false);
const artefactoFields = ref([
  { name: 'id', required: true, label: 'ID (temp)', align: 'left', field: 'id', sortable: true, },

  { name: 'nombre', required: true, label: 'Nombre', align: 'left', field: 'nombre', sortable: true, },
  { name: 'descripcion', align: 'left', label: 'Descripción', field: 'descripcion', sortable: true, },
  { name: 'fase', label: 'Fase', field: 'fase', sortable: true },
  { name: 'disciplina', label: 'Disciplina', field: 'disciplina' },
  //{ name: 'attachment', label: 'Adjunto', field: 'adjunto' },
]);

const artefactosArr = ref([])
provide('artefactosArr', artefactosArr)
const url = '/artefacto'
provide('artefactoUrl', url)

const listarArtefactos = () => listar(artefactosArr, url)
provide('listarArtefactos', listarArtefactos)
// execute on component load
listarArtefactos()

const guardarRandom = () => guardar({ id: 44, nombre: 'Artefacto modificado por quinta vez' }, artefactosArr, url)

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
