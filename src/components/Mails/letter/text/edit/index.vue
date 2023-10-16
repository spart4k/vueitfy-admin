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
    <!-- <v-file-input
      v-model="$props.data.files"
      outlined
      label="Загрузить файлы"
      chips
      multiple
      class="flex-grow-0"
    >
      <template v-slot:selection="data">
        <v-chip outlined>
          <div class="v-edit-item-input_name">
            {{ data.text }}
          </div>
          <v-icon
            class="ml-2"
            color="disabled"
            small
            @click.stop="$emit('deleteItem', data.index)"
          >
            $IconClose
          </v-icon>
        </v-chip>
      </template>
    </v-file-input> -->
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
