<template>
  <v-textarea
    rows="2"
    clearable
    label="Комментарий"
    v-model="proxyValue"
    :error-messages="errors"
  ></v-textarea>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
