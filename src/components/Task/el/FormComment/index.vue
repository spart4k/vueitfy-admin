<template>
  <v-textarea
    clearable
    label="Комментарий"
    :value="text"
    @input="(event) => $emit('input', event.target.value)"
  ></v-textarea>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
