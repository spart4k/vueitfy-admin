<template>
  <div>
    <div class="mb-2">Приложенные документы:</div>
    <FormDocumentsRow
      :key="document.id"
      v-for="(document, documentIndex) in docsDataFormated"
      :document="document"
      :docNames="listNames"
      :showDropzone="false"
      :showScan="true"
      ref="docRows"
      :allFieldsRequireds="true"
      :acceptDocPanel="document.doc_id === 3 ? true : false"
      :personalId="entity.id"
      @changeDocs="$emit('changeDocs', $event, documentIndex)"
    />
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
