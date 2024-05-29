<template>
  <div>
    <div class="mb-2 font-weight-bold">{{ title }}</div>
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
      :personalId="entity?.id"
      :correct="correct"
      :confirm="confirm"
      :rejecting="rejecting"
      :docsData="docsData"
      :fromTask="fromTask"
      :withoutSave="withoutSave"
      :delFile="delFile"
      @changeDocs="$emit('changeDocs', $event, documentIndex)"
      :taskInfo="taskInfo"
      :bankCompleted="bankCompleted"
      :removeRejecting="removeRejecting"
    />
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
