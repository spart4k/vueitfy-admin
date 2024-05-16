<template>
  <div
    class="dropzone-wrap"
    :class="[
      options.withoutSave ? 'without-api' : '',
      $props.name,
      readonly && 'readonly',
    ]"
    :name="$props.name"
  >
    <v-list-item-title v-if="field?.label">{{ field.label }}</v-list-item-title>
    <vue-dropzone
      class="dropzone"
      ref="dropzone"
      id="dropzone"
      :class="[errorMessages.length ? 'dropzone--error' : '']"
      :options="dropzoneOptions"
      @vdropzone-files-added="sendingFile"
      @vdropzone-success="showSuccess"
      @vdropzone-removed-file="removed"
    />
    <v-messages v-if="errorMessages" color="error" :value="errorMessages" />
    <!-- {{ value }} -->
    <!--<img :src="'https://personal-crm.ru' + proxyVal" alt="" />-->
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
