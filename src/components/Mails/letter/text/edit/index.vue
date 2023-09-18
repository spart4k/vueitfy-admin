<template>
  <div class="v-edit">
    <VueEditor v-model="content" />
    <!-- <v-file-input label="Загрузить файлы" outlined></v-file-input> -->
    <v-btn height="60" color="disabled" outlined block>
      <v-icon large class="mr-2">$IconDownload</v-icon>
      Загрузить файлы
    </v-btn>
  </div>
</template>
<script src="./setup.ts"></script>
<style lang="scss" scoped src="./style.scss"></style>
