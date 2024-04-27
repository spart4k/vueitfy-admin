<template>
  <div>
    <div class="mb-2 font-weight-bold">Приложенные документы:</div>
    <FormDocumentsRow
      :key="document.id"
      v-for="(document, documentIndex) in docsDataFormated"
      :document="document"
      :docNames="listNames"
      :showDropzone="showDropzone"
      :showFields="showFields"
      :showScan="showScan"
      ref="docRows"
      :allFieldsRequireds="true"
      :acceptDocPanel="
        document.doc_id === 3 && task.task_type_id === 1 ? true : false
      "
      :personalId="entity.id"
      :correct="correct"
      :confirm="confirm"
      :docsData="docsData"
      :fromTask="true"
      :withoutSave="withoutSave"
      @changeDocs="$emit('changeDocs', $event, documentIndex)"
    />
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
