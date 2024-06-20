<template>
  <!-- <Layout> -->
  <DxGantt :task-list-width="500" :height="700" scale-type="weeks">
    <DxTasks :data-source="tasks" />
    <DxDependencies :data-source="dependencies" />
    <DxResources :data-source="resources" />
    <DxResourceAssignments :data-source="resourceAssignments" />

    <DxToolbar>
      <DxItem name="undo" />
      <DxItem name="redo" />
      <DxItem name="separator" />
      <DxItem name="collapseAll" />
      <DxItem name="expandAll" />
      <DxItem name="separator" />
      <DxItem name="addTask" />
      <DxItem name="deleteTask" />
      <DxItem name="separator" />
      <DxItem name="zoomIn" />
      <DxItem name="zoomOut" />
    </DxToolbar>

    <DxEditing :enabled="true" />
    <DxValidation :auto-update-parent-tasks="true" />

    <DxColumn :width="300" data-field="title" caption="Subject" />
    <DxColumn data-field="start" caption="Start Date" />
    <DxColumn data-field="end" caption="End Date" />
  </DxGantt>
  <!-- </Layout> -->
</template>

<script>
// import Vue from 'vue'
import {
  DxGantt,
  DxTasks,
  DxDependencies,
  DxResources,
  DxResourceAssignments,
  DxColumn,
  DxEditing,
  DxValidation,
  DxToolbar,
  DxItem,
} from 'devextreme-vue/gantt'

export default {
  name: 'Gantta-View',
  components: {},
  data() {
    return {}
  },
  methods: {},
}
</script>
