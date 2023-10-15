<template>
  <div
    class="dropzone-wrap"
    :class="[options.withoutSave ? 'without-api' : '']"
  >
    <vue-dropzone
      ref="dropzone"
      id="dropzone"
      :options="dropzoneOptions"
      @vdropzone-files-added="sendingFile"
      @vdropzone-success="showSuccess"
      @vdropzone-removed-file="removed"
    />
    {{ value }}
    <!--<img :src="'https://personal-crm.ru' + proxyVal" alt="" />-->
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
