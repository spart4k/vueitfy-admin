<template>
  <div class="dropzone-wrap">
    <vue-dropzone
      ref="dropzone"
      id="dropzone"
      :options="dropzoneOptions"
      @vdropzone-file-added="sendingFile"
    />
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
