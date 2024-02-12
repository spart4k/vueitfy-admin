<template>
  <div ref="editorContainer" class="v-edit">
    <VueEditor
      class="flex-grow-1 overflow-hidden"
      :editor-toolbar="toolbar"
      v-model="$props.data.text"
    />
    <DropZone
      @addFiles="($event) => $emit('addFiles', $event)"
      @removeFile="($event) => $emit('removeFile', $event)"
      :options="{ withoutSave: false }"
    />
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
