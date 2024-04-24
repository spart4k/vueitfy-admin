<template>
  <v-card-title class="d-flex justify-center text-h6">
    <span class="font-weight-bold text-h6"> {{ data.surname }}</span
    >&nbsp;
    <span class="font-weight-bold text-h6">{{ data.name_n }} </span>&nbsp;
    <span class="font-weight-bold text-h6">
      {{ data.patronymic }}
    </span>
    &nbsp;({{ data.dataRojd }} г.р)
  </v-card-title>
</template>
<script src="./setup.js"></script>

<style lang="scss" scoped></style>
